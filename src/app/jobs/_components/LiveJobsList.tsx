// Server component — receives the result of fetchMcfJobs() and renders
// the live MCF feed: section heading, last-updated timestamp, job rows,
// graceful fallback, and a "Powered by MyCareersFuture" footer.

import type { McfFetchResult, NormalizedJob } from "@/lib/mcfJobs";
import { MCF_SEARCH_URL } from "@/lib/mcfJobs";

/* ----------------------------- icons --------------------------- */

function PinIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11.5 5.5c0 3-4.5 7-4.5 7s-4.5-4-4.5-7a4.5 4.5 0 0 1 9 0z" />
      <circle cx="7" cy="5.5" r="1.6" />
    </svg>
  );
}

/* ----------------------------- badges -------------------------- */

function TypeBadge({ type }: { type: string }) {
  const lower = type.toLowerCase();
  const styles = lower.includes("permanent")
    ? "border-[#0071ba]/30 bg-[#0071ba]/10 text-[#0071ba]"
    : lower.includes("contract")
      ? "border-amber-300 bg-amber-50 text-amber-800"
      : lower.includes("temp") || lower.includes("part")
        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
        : "border-slate-300 bg-slate-50 text-slate-700";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${styles}`}
    >
      {type}
    </span>
  );
}

function IndustryBadge({ industry }: { industry: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#F0F4F8] px-2.5 py-0.5 text-xs font-semibold text-[#475569]">
      {industry}
    </span>
  );
}

/* ----------------------------- row ----------------------------- */

function isPostedThisWeek(postedDate: string | null): boolean {
  if (!postedDate) return false;
  const posted = new Date(postedDate).getTime();
  if (Number.isNaN(posted)) return false;
  const days = (Date.now() - posted) / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= 7;
}

function JobRow({ job }: { job: NormalizedJob }) {
  return (
    <article className="rounded-xl border border-[#E6E9F2] bg-white px-5 py-4 shadow-[0_2px_12px_rgba(2,8,23,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0071ba]/40 hover:shadow-[0_8px_24px_rgba(2,8,23,0.08)]">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {/* Title block */}
        <div className="min-w-0 flex-1 basis-full md:basis-auto">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-sans text-base font-semibold leading-snug text-[#020817]">
              {job.title}
            </h3>
            {isPostedThisWeek(job.postedDate) && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                New
              </span>
            )}
            <TypeBadge type={job.employmentType} />
          </div>
        </div>

        {/* Industry (desktop) */}
        <div className="hidden md:block">
          <IndustryBadge industry={job.industry} />
        </div>

        {/* Location (desktop) */}
        <div className="hidden items-center gap-1.5 text-sm text-[#5b6478] md:flex md:w-32">
          <span className="text-[#0071ba]">
            <PinIcon />
          </span>
          {job.location}
        </div>

        {/* Salary (desktop) */}
        <div className="hidden text-sm font-semibold text-[#020817] md:block md:w-52 md:text-right">
          {job.salary}
        </div>

        {/* Mobile meta strip */}
        <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#5b6478] md:hidden">
          <IndustryBadge industry={job.industry} />
          <span className="flex items-center gap-1 text-[#0071ba]">
            <PinIcon />
          </span>
          <span>{job.location}</span>
          <span className="text-[#cbd5e1]">·</span>
          <span className="font-semibold text-[#020817]">{job.salary}</span>
        </div>

        {/* Apply on MCF */}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-lg bg-[#0071ba] px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-lg hover:shadow-[#0071ba]/25"
        >
          Apply on MCF
          <span className="transition-transform group-hover/btn:translate-x-1">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

/* -------------------------- timestamp -------------------------- */

function formatTimestamp(d: Date): string {
  // Render in Singapore time so visitors see a number they recognise
  // regardless of where the server / build agent runs.
  return new Intl.DateTimeFormat("en-SG", {
    timeZone: "Asia/Singapore",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

/* ---------------------------- main ---------------------------- */

export default function LiveJobsList({ result }: { result: McfFetchResult }) {
  const { jobs, fetchedAt, error } = result;
  const hasJobs = jobs.length > 0;

  return (
    <div>
      {/* Section heading + timestamp */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-sans text-2xl font-bold text-[#020817] md:text-3xl">
            Featured Roles This Week
          </h2>
          <p className="mt-1 text-sm text-[#5b6478]">
            {hasJobs
              ? `Live from MyCareersFuture · ${jobs.length} open role${jobs.length === 1 ? "" : "s"}`
              : "Live from MyCareersFuture"}
          </p>
        </div>
        <span
          className="text-xs text-[#94a3b8]"
          title={fetchedAt.toISOString()}
        >
          Last updated: {formatTimestamp(fetchedAt)} SGT
        </span>
      </div>

      {/* Job rows or fallback */}
      {hasJobs ? (
        <div className="space-y-3">
          {jobs.map((job) => (
            <JobRow key={job.uuid} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#E6E9F2] bg-white p-10 text-center shadow-[0_4px_24px_rgba(2,8,23,0.04)]">
          <p className="text-[#5b6478]">
            {error
              ? "Live feed is temporarily unavailable. "
              : "No live roles to show right now. "}
            <a
              href={MCF_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0071ba] hover:underline"
            >
              Visit MyCareersFuture
            </a>{" "}
            to see all our latest roles.
          </p>
        </div>
      )}

      {/* Powered by */}
      <p className="mt-5 text-center text-xs text-[#94a3b8]">
        Powered by{" "}
        <a
          href="https://www.mycareersfuture.gov.sg"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#5b6478] transition-colors hover:text-[#0071ba] hover:underline"
        >
          MyCareersFuture
        </a>
        {" · "}
        Refreshes every hour
      </p>
    </div>
  );
}
