"use client";

import { useMemo, useState } from "react";

type Resource = {
  icon: string;
  title: string;
  desc: string;
  href: string;
  category: "Work Passes" | "Compliance" | "Fair Employment";
};

const RESOURCES: Resource[] = [
  {
    icon: "📋",
    title: "Employment Act",
    desc: "Singapore's main labour law covering employee rights, contracts, salary, and working hours.",
    href: "https://www.mom.gov.sg/employment-practices/employment-act",
    category: "Compliance",
  },
  {
    icon: "🏢",
    title: "EA Licence Check",
    desc: "Verify if a recruitment agency is MOM-licensed. DHC's EA License: 12C6253.",
    href: "https://www.mom.gov.sg/eservices/services/employment-agencies-and-personnel-search",
    category: "Compliance",
  },
  {
    icon: "💰",
    title: "CPF Contributions",
    desc: "Understand CPF contribution rates, eligibility, and submission requirements for employers.",
    href: "https://www.cpf.gov.sg/employer",
    category: "Compliance",
  },
  {
    icon: "🌍",
    title: "Work Pass Portal",
    desc: "Apply and manage Employment Pass, S Pass, and Work Permits for foreign employees.",
    href: "https://www.mom.gov.sg/passes-and-permits",
    category: "Work Passes",
  },
  {
    icon: "⚖️",
    title: "TAFEP Guidelines",
    desc: "Tripartite Alliance for Fair and Progressive Employment Practices guidelines and resources.",
    href: "https://www.tafep.sg",
    category: "Fair Employment",
  },
  {
    icon: "📊",
    title: "COMPASS Framework",
    desc: "Complementarity Assessment Framework for EP applications. Points-based system guide.",
    href: "https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility",
    category: "Work Passes",
  },
  {
    icon: "🔄",
    title: "Job Redesign+",
    desc: "Up to 70% government funding for workforce transformation and job redesign programmes.",
    href: "https://www.wsg.gov.sg/home/employers-industry-partners/workforce-development-job-redesign",
    category: "Fair Employment",
  },
  {
    icon: "📝",
    title: "IR8A Filing",
    desc: "Annual tax form for employee earnings. Submission deadlines and requirements.",
    href: "https://www.iras.gov.sg/taxes/individual-income-tax/employers/auto-inclusion-scheme-(ais)-for-employment-income",
    category: "Compliance",
  },
  {
    icon: "🏥",
    title: "Work Injury Compensation",
    desc: "WICA requirements, coverage, and claims process for workplace injuries.",
    href: "https://www.mom.gov.sg/workplace-safety-and-health/work-injury-compensation",
    category: "Compliance",
  },
];

const CATEGORIES = [
  "All",
  "Work Passes",
  "Compliance",
  "Fair Employment",
] as const;
type Category = (typeof CATEGORIES)[number];

function ResourceCard({ r }: { r: Resource }) {
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-[#E6E9F2] bg-white p-6 shadow-[0_4px_24px_rgba(2,8,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071ba]/40 hover:shadow-[0_16px_40px_rgba(2,8,23,0.10)]"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="text-3xl leading-none" aria-hidden="true">
          {r.icon}
        </span>
        <span className="rounded-full bg-[#F0F4F8] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#475569]">
          {r.category}
        </span>
      </div>
      <h3 className="font-sans text-lg font-semibold leading-snug text-[#020817]">
        {r.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5b6478]">
        {r.desc}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0071ba]">
        Visit Site
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}

export default function ResourceList() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () => (active === "All" ? RESOURCES : RESOURCES.filter((r) => r.category === active)),
    [active]
  );

  return (
    <div>
      {/* Category tabs (DHC blue pills) */}
      <div
        role="tablist"
        aria-label="Resource categories"
        className="flex flex-wrap justify-center gap-2"
      >
        {CATEGORIES.map((c) => {
          const isActive = c === active;
          const count =
            c === "All" ? RESOURCES.length : RESOURCES.filter((r) => r.category === c).length;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(c)}
              type="button"
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#0071ba] text-white shadow-md shadow-[#0071ba]/25"
                  : "border border-[#E6E9F2] bg-white text-[#5b6478] hover:-translate-y-0.5 hover:border-[#0071ba] hover:text-[#0071ba]"
              }`}
            >
              {c}
              <span
                className={`text-[11px] font-bold ${
                  isActive ? "text-white/80" : "text-[#94a3b8]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <ResourceCard key={r.title} r={r} />
        ))}
      </div>
    </div>
  );
}
