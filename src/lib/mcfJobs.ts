// Fetches live job postings from the MyCareersFuture (MCF) public API for
// Dynamic Human Capital, then normalises the response into the shape the
// Jobs page actually renders. Server-only — uses Next.js' fetch cache with
// a 1-hour revalidation TTL so the page refreshes automatically.
//
// Note: this project ships with `output: 'export'` in next.config.js, which
// means the `next: { revalidate }` directive runs at build time only — true
// hourly refresh on a static deploy requires a scheduled rebuild (e.g. a
// GitHub Action cron) or removing the `output: 'export'` line so Next can
// serve ISR at runtime.

const MCF_API_URL =
  "https://api.mycareersfuture.gov.sg/v2/jobs" +
  "?search=dynamic+human+capital" +
  "&limit=6" +
  "&sortBy=new_posting_date";

// Defensive: even though the keyword search currently returns only DHC
// listings, we filter results by UEN so a future name collision can't leak
// other employers' jobs onto the page.
const DHC_UEN = "201228584R";

export const MCF_SEARCH_URL =
  "https://www.mycareersfuture.gov.sg/search?search=dynamic+human+capital&sortBy=new_posting_date";

const mcfJobUrl = (uuid: string) =>
  `https://www.mycareersfuture.gov.sg/job/${uuid}`;

// We only type the fields we actually read. The real MCF response has
// dozens of additional fields that don't affect the UI.
type McfApiJob = {
  uuid: string;
  title: string;
  description?: string;
  categories?: { category: string }[];
  employmentTypes?: { employmentType: string }[];
  salary?: {
    minimum?: number;
    maximum?: number;
    type?: { salaryType?: string };
  };
  address?: {
    isOverseas?: boolean;
    overseasCountry?: string | null;
    districts?: { location?: string; region?: string }[];
  };
  postedCompany?: { uen?: string; name?: string };
  metadata?: { newPostingDate?: string | null; jobPostId?: string | null };
};

type McfApiResponse = {
  results?: McfApiJob[];
  total?: number;
};

export type NormalizedJob = {
  uuid: string;
  title: string;
  industry: string;
  location: string;
  salary: string;
  employmentType: string;
  postedDate: string | null;
  url: string;
  // Pre-sanitised HTML — safe to render with dangerouslySetInnerHTML.
  // Empty string when MCF didn't provide a description.
  description: string;
};

export type McfFetchResult = {
  jobs: NormalizedJob[];
  fetchedAt: Date;
  error?: string;
};

function formatSalary(salary: McfApiJob["salary"]): string {
  if (!salary) return "Salary on application";
  const { minimum, maximum, type } = salary;
  if (!minimum && !maximum) return "Salary on application";

  const period =
    type?.salaryType === "Monthly"
      ? "/ month"
      : type?.salaryType === "Annual"
        ? "/ year"
        : type?.salaryType === "Hourly"
          ? "/ hour"
          : type?.salaryType === "Daily"
            ? "/ day"
            : "";

  const min = minimum?.toLocaleString("en-SG");
  const max = maximum?.toLocaleString("en-SG");
  if (min && max && minimum !== maximum) {
    return `S$${min} – S$${max} ${period}`.trim();
  }
  return `S$${min ?? max} ${period}`.trim();
}

// Minimal HTML sanitiser for the MCF description field. MCF is a Singapore
// government API publishing employer-authored copy — generally trustworthy
// but we still strip anything that could execute or load remote content.
// Safe tags pass through unchanged; .prose-mcf in globals.css styles them.
function sanitizeHtml(raw: string): string {
  if (!raw) return "";
  return (
    raw
      // Drop scripts, styles, frames, forms and their inner content
      .replace(
        /<(script|style|iframe|object|embed|form|input|link|meta)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
        "",
      )
      // Drop the same as self-closing / void tags
      .replace(
        /<(script|style|iframe|object|embed|form|input|link|meta)\b[^>]*\/?>/gi,
        "",
      )
      // Remove every inline event handler (onclick=, onerror=, …)
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      // Disarm javascript:/data: URLs on href/src
      .replace(
        /(href|src)\s*=\s*(["'])\s*(?:javascript|data|vbscript):[^"']*\2/gi,
        '$1="#"',
      )
  );
}

function formatLocation(addr: McfApiJob["address"]): string {
  if (!addr) return "Singapore";
  if (addr.isOverseas && addr.overseasCountry) return addr.overseasCountry;
  const d = addr.districts?.[0];
  if (!d?.location) return "Singapore";
  // "Islandwide" reads as recruiter jargon; collapse to the country name.
  if (d.location === "Islandwide") return "Singapore";
  return d.location;
}

function normalize(j: McfApiJob): NormalizedJob {
  return {
    uuid: j.uuid,
    title: j.title,
    industry: j.categories?.[0]?.category ?? "General",
    location: formatLocation(j.address),
    salary: formatSalary(j.salary),
    employmentType: j.employmentTypes?.[0]?.employmentType ?? "Full-time",
    postedDate: j.metadata?.newPostingDate ?? null,
    url: mcfJobUrl(j.uuid),
    description: sanitizeHtml(j.description ?? ""),
  };
}

export async function fetchMcfJobs(): Promise<McfFetchResult> {
  const fetchedAt = new Date();
  try {
    const res = await fetch(MCF_API_URL, {
      // Revalidate the cached response every hour. On a static export
      // build this is honoured at build time only; with a runtime
      // deployment Next.js background-refreshes after the TTL.
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return {
        jobs: [],
        fetchedAt,
        error: `MCF API returned HTTP ${res.status}`,
      };
    }

    const data = (await res.json()) as McfApiResponse;
    const jobs = (data.results ?? [])
      .filter((j) => j.postedCompany?.uen === DHC_UEN)
      .slice(0, 6)
      .map(normalize);

    return { jobs, fetchedAt };
  } catch (err) {
    return {
      jobs: [],
      fetchedAt,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
