"use client";

import { useEffect, useRef, useState } from "react";

type Service = {
  icon: string;
  title: string;
  desc: string;
  points: string[];
  tag?: string;
};

const SERVICES: Service[] = [
  {
    icon: "🎯",
    title: "Permanent Recruitment",
    tag: "Most Popular",
    desc: "End-to-end talent acquisition for permanent roles across every industry and seniority level. Our consultants are the long-term partners behind 5,000+ placements.",
    points: [
      "Executive, mid-level and specialist search",
      "Industry-mapped sourcing networks",
      "Behavioural and competency assessments",
      "Post-placement onboarding support",
      "Replacement guarantee on every hire",
      "20+ industries covered",
      "Dedicated consultant per mandate",
    ],
  },
  {
    icon: "⚡",
    title: "Temporary & Contract",
    desc: "Scale your workforce up or down with flexible staffing — ideal for project peaks, leave cover, or fast deployments.",
    points: [
      "Short- and long-term contracts",
      "48-hour rapid deployment",
      "Managed headcount",
      "Full MOM compliance",
    ],
  },
  {
    icon: "💼",
    title: "Payroll Services",
    desc: "Delegate payroll end-to-end. CPF submissions, IR8A filing and statutory compliance handled by our specialists.",
    points: [
      "CPF & MOM compliance",
      "IR8A / IRAS filing",
      "Leave & claims management",
      "Itemised monthly reporting",
    ],
  },
  {
    icon: "👔",
    title: "Executive Search",
    desc: "Confidential C-suite and senior leadership search powered by deep industry networks and rigorous assessment.",
    points: [
      "C-suite & VP placements",
      "Confidential mandates",
      "Mapped talent universe",
      "Onboarding & integration support",
    ],
  },
  {
    icon: "🌏",
    title: "Employer of Record (EOR)",
    tag: "New",
    desc: "Hire across Southeast Asia without setting up a local entity. We become the legal employer and handle all compliance.",
    points: [
      "Legal employer entity",
      "Cross-border compliance",
      "Benefits administration",
      "Risk management across 5 SEA markets",
    ],
  },
  {
    icon: "🧭",
    title: "HR Consulting & Outsourcing",
    desc: "Outsource non-core HR functions so your team can focus on strategy. We design, run and optimise the rest.",
    points: [
      "HR administration & operations",
      "Onboarding & offboarding",
      "Policy & process design",
      "Dedicated account manager",
    ],
  },
];

export default function ServicesPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICES[activeIndex];

  // Keep the active tab visible inside its scroll container.
  // On mobile (horizontal pills) this slides the row to centre the active pill;
  // on desktop (vertical list) this is a no-op since all tabs are already visible.
  // Skip the first render so loading the page doesn't auto-scroll to the tabs section.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = document.getElementById(`service-tab-${activeIndex}`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (i + 1) % SERVICES.length;
      setActiveIndex(next);
      document.getElementById(`service-tab-${next}`)?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (i - 1 + SERVICES.length) % SERVICES.length;
      setActiveIndex(prev);
      document.getElementById(`service-tab-${prev}`)?.focus();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
      {/* ---- Tabs ----
         Mobile: edge-to-edge horizontal scroll of rounded pills.
         Desktop (md+): vertical list inside a single card. */}
      <nav
        role="tablist"
        aria-label="Services"
        className="hide-scrollbar -mx-6 flex shrink-0 gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:block md:gap-0 md:overflow-visible md:rounded-xl md:border md:border-[#E6E9F2] md:bg-white md:px-0 md:pb-0 md:shadow-[0_4px_24px_rgba(2,8,23,0.04)]"
      >
        {SERVICES.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={s.title}
              id={`service-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`service-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm transition-colors md:flex md:w-full md:gap-3 md:rounded-none md:border-0 md:border-l-2 md:px-5 md:py-4 md:text-left md:text-base ${
                isActive
                  ? "border-[#0071ba] bg-[#0071ba] font-semibold text-white md:border-l-[#0071ba] md:bg-[#F7F8FC] md:text-[#0071ba]"
                  : "border-[#E6E9F2] bg-white font-medium text-[#5b6478] md:border-l-transparent md:bg-transparent md:hover:bg-[#F7F8FC] md:hover:text-[#020817]"
              }`}
            >
              <span className="text-base leading-none md:text-lg" aria-hidden="true">
                {s.icon}
              </span>
              <span className="md:flex-1">{s.title}</span>
            </button>
          );
        })}
      </nav>

      {/* ---- Right: animated details panel ---- */}
      <div className="overflow-hidden">
        <div
          key={activeIndex}
          role="tabpanel"
          id={`service-panel-${activeIndex}`}
          aria-labelledby={`service-tab-${activeIndex}`}
          className="services-panel-slide rounded-xl border border-[#E6E9F2] bg-white p-8 shadow-[0_4px_24px_rgba(2,8,23,0.05)] md:p-10"
        >
          <div className="flex items-start justify-between">
            <span className="text-5xl leading-none" aria-hidden="true">
              {active.icon}
            </span>
            {active.tag && (
              <span className="rounded-full border border-[#0071ba]/30 bg-[#0071ba]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0071ba]">
                {active.tag}
              </span>
            )}
          </div>

          <h2 className="mt-6 font-sans text-2xl font-semibold text-[#020817] md:text-3xl">
            {active.title}
          </h2>

          <p className="mt-3 text-base leading-relaxed text-[#5b6478]">
            {active.desc}
          </p>

          <ul className="mt-6 space-y-2.5">
            {active.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2.5 text-sm text-[#5b6478] md:text-base"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071ba]"
                  aria-hidden="true"
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <a
            href="mailto:career@dhc.com.sg"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0071ba] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/30"
          >
            Enquire Now
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
