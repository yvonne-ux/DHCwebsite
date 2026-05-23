"use client";

// Client-side wrapper around the live MCF job rows that adds an
// accordion: clicking a row expands it inline to show the full job
// description and action links. Only one row is open at a time.

import { useState } from "react";
import type { NormalizedJob } from "@/lib/mcfJobs";

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

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8l4 4 4-4" />
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

/* ---------------------------- helpers -------------------------- */

function isPostedThisWeek(postedDate: string | null): boolean {
  if (!postedDate) return false;
  const posted = new Date(postedDate).getTime();
  if (Number.isNaN(posted)) return false;
  const days = (Date.now() - posted) / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= 7;
}

/* --------------------------- accordion ------------------------- */

function JobAccordionItem({
  job,
  isOpen,
  onToggle,
}: {
  job: NormalizedJob;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `job-${job.uuid}-panel`;
  const headerId = `job-${job.uuid}-header`;
  const mailto = `mailto:career@dhc.com.sg?subject=${encodeURIComponent(
    `Application: ${job.title}`,
  )}`;

  // We intentionally use a div with role="button" rather than a real <button>
  // so we can nest <h3> + flex layouts without triggering HTML validation
  // warnings (a <button> may only contain phrasing content).
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <article className="overflow-hidden rounded-xl border border-[#E6E9F2] bg-white shadow-[0_2px_12px_rgba(2,8,23,0.03)] transition-all duration-200 hover:border-[#0071ba]/40 hover:shadow-[0_8px_24px_rgba(2,8,23,0.08)]">
      {/* Summary row — clickable */}
      <div
        id={headerId}
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="cursor-pointer px-5 py-4 transition-colors hover:bg-[#F7F8FC] focus:bg-[#F7F8FC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071ba]/40"
      >
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

          {/* Chevron — collapsed: points down; expanded: rotates 180° */}
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
              isOpen
                ? "rotate-180 bg-[#0071ba]/10 text-[#0071ba]"
                : "rotate-0 text-[#94a3b8]"
            }`}
            aria-hidden="true"
          >
            <ChevronIcon />
          </span>
        </div>
      </div>

      {/* Expandable panel — animates via grid-template-rows 0fr -> 1fr */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#E6E9F2] bg-[#FBFCFE] px-5 py-5 md:px-6 md:py-6">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#0071ba]">
              Job description
            </h4>

            {job.description ? (
              <div
                className="prose-mcf mt-3 max-h-[400px] overflow-y-auto pr-1 text-sm leading-relaxed text-[#5b6478] md:max-h-[500px]"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-[#5b6478]">
                Click &lsquo;View Full Job&rsquo; to see the complete job
                description on MyCareersFuture.
              </p>
            )}

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={mailto}
                tabIndex={isOpen ? 0 : -1}
                className="group/btn inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#0071ba] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-lg hover:shadow-[#0071ba]/25"
              >
                Apply Now
                <span className="transition-transform group-hover/btn:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isOpen ? 0 : -1}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#E6E9F2] bg-white px-6 py-3 text-sm font-bold text-[#020817] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0071ba] hover:text-[#0071ba]"
              >
                View Full Job on MyCareersFuture
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ----------------------------- main ---------------------------- */

export default function JobAccordion({ jobs }: { jobs: NormalizedJob[] }) {
  const [activeUuid, setActiveUuid] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <JobAccordionItem
          key={job.uuid}
          job={job}
          isOpen={activeUuid === job.uuid}
          onToggle={() =>
            setActiveUuid((prev) => (prev === job.uuid ? null : job.uuid))
          }
        />
      ))}
    </div>
  );
}
