// Server component — receives the result of fetchMcfJobs() and renders
// the live MCF feed: section heading, last-updated timestamp, the
// accordion of job rows (delegated to the client JobAccordion), graceful
// fallback if the feed is empty/errored, and a powered-by footer.

import type { McfFetchResult } from "@/lib/mcfJobs";
import { MCF_SEARCH_URL } from "@/lib/mcfJobs";
import JobAccordion from "./JobAccordion";

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
              ? `Live from MyCareersFuture · ${jobs.length} open role${jobs.length === 1 ? "" : "s"} · click a row to view details`
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

      {/* Job rows (accordion) or fallback */}
      {hasJobs ? (
        <JobAccordion jobs={jobs} />
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
