"use client";

import { useMemo, useState } from "react";

type Job = {
  title: string;
  company: string;
  location: string;
  industry: string;
  salary: string;
  type: "Permanent" | "Contract" | "Temp";
  isNew?: boolean;
};

const JOBS: Job[] = [
  {
    title: "Senior Accountant",
    company: "Listed FMCG Group",
    location: "Singapore",
    industry: "Finance",
    salary: "S$5,500 – S$6,500 / mo",
    type: "Permanent",
    isNew: true,
  },
  {
    title: "HR Business Partner",
    company: "Regional Tech Firm",
    location: "Singapore",
    industry: "HR",
    salary: "S$7,000 – S$9,000 / mo",
    type: "Permanent",
    isNew: true,
  },
  {
    title: "Software Engineer (Backend)",
    company: "Fintech Scale-up",
    location: "Singapore",
    industry: "Technology",
    salary: "S$8,000 – S$10,500 / mo",
    type: "Permanent",
  },
  {
    title: "Operations Manager",
    company: "Leading Logistics Company",
    location: "Singapore",
    industry: "Operations",
    salary: "S$9,000 – S$11,000 / mo",
    type: "Permanent",
    isNew: true,
  },
  {
    title: "Procurement Specialist",
    company: "Multinational Manufacturer",
    location: "Malaysia",
    industry: "Operations",
    salary: "RM 6,500 – RM 8,000 / mo",
    type: "Contract",
  },
  {
    title: "Warehouse Supervisor",
    company: "Confidential",
    location: "Singapore",
    industry: "Operations",
    salary: "S$3,800 – S$4,500 / mo",
    type: "Permanent",
  },
  {
    title: "Marketing Manager",
    company: "Healthcare Group",
    location: "Thailand",
    industry: "Sales",
    salary: "THB 90,000 – 110,000 / mo",
    type: "Permanent",
    isNew: true,
  },
  {
    title: "Customer Success Lead",
    company: "B2B SaaS Company",
    location: "Singapore",
    industry: "Sales",
    salary: "S$6,000 – S$8,000 / mo",
    type: "Permanent",
  },
  {
    title: "Finance Analyst",
    company: "Insurance Group",
    location: "Singapore",
    industry: "Finance",
    salary: "S$5,500 – S$6,500 / mo",
    type: "Contract",
  },
  {
    title: "Project Engineer",
    company: "Construction Firm",
    location: "Indonesia",
    industry: "Engineering",
    salary: "IDR 18M – 24M / mo",
    type: "Permanent",
  },
  {
    title: "Registered Nurse",
    company: "Private Hospital",
    location: "Singapore",
    industry: "Healthcare",
    salary: "S$4,200 – S$5,200 / mo",
    type: "Temp",
  },
  {
    title: "Data Analyst",
    company: "Retail Chain",
    location: "Vietnam",
    industry: "Technology",
    salary: "VND 35M – 50M / mo",
    type: "Permanent",
  },
];

const LOCATIONS = [
  "All Locations",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Indonesia",
  "Vietnam",
  "India",
];

const INDUSTRIES = [
  "All Industries",
  "Finance",
  "Technology",
  "Healthcare",
  "Engineering",
  "HR",
  "Sales",
  "Operations",
];

const FEATURED_COUNT = 6;
const PORTAL_URL =
  "https://www.mycareersfuture.gov.sg/search?search=dynamic+human+capital&sortBy=new_posting_date";

/* ---------------------------- icons ---------------------------- */

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

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5" />
      <path d="M14 14l-3-3" />
    </svg>
  );
}

/* ------------------------- row + badges ------------------------ */

function TypeBadge({ type }: { type: Job["type"] }) {
  const styles =
    type === "Permanent"
      ? "border-[#0071ba]/30 bg-[#0071ba]/10 text-[#0071ba]"
      : type === "Contract"
        ? "border-amber-300 bg-amber-50 text-amber-800"
        : "border-emerald-300 bg-emerald-50 text-emerald-800";
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

function JobRow({ job }: { job: Job }) {
  const mailto = `mailto:career@dhc.com.sg?subject=${encodeURIComponent(
    `Application: ${job.title}`
  )}`;
  return (
    <article className="rounded-xl border border-[#E6E9F2] bg-white px-5 py-4 shadow-[0_2px_12px_rgba(2,8,23,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0071ba]/40 hover:shadow-[0_8px_24px_rgba(2,8,23,0.08)]">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {/* Title block */}
        <div className="min-w-0 flex-1 basis-full md:basis-auto">
          <div className="flex items-center gap-2">
            <h3 className="font-sans text-base font-semibold leading-snug text-[#020817]">
              {job.title}
            </h3>
            {job.isNew && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                New
              </span>
            )}
            <TypeBadge type={job.type} />
          </div>
          <p className="mt-0.5 text-sm text-[#5b6478]">{job.company}</p>
        </div>

        {/* Industry */}
        <div className="hidden md:block">
          <IndustryBadge industry={job.industry} />
        </div>

        {/* Location */}
        <div className="hidden items-center gap-1.5 text-sm text-[#5b6478] md:flex md:w-28">
          <span className="text-[#0071ba]">
            <PinIcon />
          </span>
          {job.location}
        </div>

        {/* Salary */}
        <div className="hidden text-sm font-semibold text-[#020817] md:block md:w-48 md:text-right">
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

        {/* Apply */}
        <a
          href={mailto}
          className="group/btn inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#0071ba] px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-lg hover:shadow-[#0071ba]/25"
        >
          Apply
          <span className="transition-transform group-hover/btn:translate-x-1">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

/* ----------------------------- main ---------------------------- */

export default function JobsListing() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return JOBS.filter((j) => {
      const matchSearch =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q);
      const matchLocation = location === LOCATIONS[0] || j.location === location;
      const matchIndustry = industry === INDUSTRIES[0] || j.industry === industry;
      return matchSearch && matchLocation && matchIndustry;
    });
  }, [search, location, industry]);

  const visible = filtered.slice(0, FEATURED_COUNT);
  const moreCount = Math.max(0, filtered.length - visible.length);

  const inputBase =
    "w-full rounded-lg border border-[#E6E9F2] bg-white px-4 py-2.5 text-sm text-[#020817] placeholder:text-[#94a3b8] transition-colors focus:border-[#0071ba] focus:outline-none focus:ring-2 focus:ring-[#0071ba]/15";

  return (
    <div>
      {/* Search & filter bar */}
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="rounded-xl border border-[#E6E9F2] bg-white p-4 shadow-[0_4px_24px_rgba(2,8,23,0.04)]"
      >
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
          <input
            type="search"
            placeholder="Job title, keyword or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search jobs"
            className={inputBase}
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Filter by location"
            className={inputBase}
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            aria-label="Filter by industry"
            className={inputBase}
          >
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0071ba] px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-lg hover:shadow-[#0071ba]/25"
          >
            <SearchIcon />
            Search
          </button>
        </div>
      </form>

      {/* Featured Roles heading */}
      <div className="mt-12 mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-sans text-2xl font-bold text-[#020817] md:text-3xl">
            Featured Roles This Week
          </h2>
          <p className="mt-1 text-sm text-[#5b6478]">
            {filtered.length === 0
              ? "No roles match your filters yet."
              : `Hand-picked from ${JOBS.length} live roles across the region.`}
          </p>
        </div>
        {filtered.length > 0 && (
          <span className="text-sm text-[#5b6478]">
            Showing{" "}
            <span className="font-semibold text-[#020817]">{visible.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-[#020817]">{filtered.length}</span>
          </span>
        )}
      </div>

      {/* Horizontal list */}
      {visible.length > 0 ? (
        <div className="space-y-3">
          {visible.map((job) => (
            <JobRow key={job.title} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#E6E9F2] bg-white p-10 text-center shadow-[0_4px_24px_rgba(2,8,23,0.04)]">
          <p className="text-[#5b6478]">
            No roles match your filters. Try widening your search or{" "}
            <a
              href="mailto:career@dhc.com.sg"
              className="font-semibold text-[#0071ba] hover:underline"
            >
              send us your CV
            </a>
            .
          </p>
        </div>
      )}

      {/* View more on portal */}
      <div className="mt-6 text-center">
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0071ba] hover:underline"
        >
          {moreCount > 0
            ? `View more on MyCareersFuture (${moreCount}+ more)`
            : "View more on MyCareersFuture"}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
