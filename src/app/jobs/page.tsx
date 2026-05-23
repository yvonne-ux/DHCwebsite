import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchMcfJobs, MCF_SEARCH_URL } from "@/lib/mcfJobs";
import LiveJobsList from "./_components/LiveJobsList";

export const metadata: Metadata = {
  title: "Open Jobs",
  description:
    "Browse open roles across Singapore and Southeast Asia with Dynamic Human Capital. Live listings from MyCareersFuture and JobStreet.",
  alternates: { canonical: "/jobs" },
};

const JOBSTREET_URL =
  "https://www.jobstreet.com.sg/jobs?q=Dynamic+Human+Capital&sortmode=ListedDate";

/* ---------- portal card ---------- */

type PortalCardProps = {
  accentBg: string;
  accentRing: string;
  emoji: string;
  badgeLabel: string;
  name: string;
  description: string;
  cta: string;
  href: string;
};

function PortalCard({
  accentBg,
  accentRing,
  emoji,
  badgeLabel,
  name,
  description,
  cta,
  href,
}: PortalCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-[#E6E9F2] bg-white p-8 shadow-[0_4px_24px_rgba(2,8,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071ba]/40 hover:shadow-[0_16px_40px_rgba(2,8,23,0.10)]">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border text-2xl ${accentBg} ${accentRing}`}
          aria-hidden="true"
        >
          {emoji}
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5b6478]">
            {badgeLabel}
          </p>
          <h3 className="font-sans text-xl font-semibold leading-tight text-[#020817]">
            Search on {name}
          </h3>
        </div>
      </div>

      <p className="mt-5 flex-1 text-base leading-relaxed text-[#5b6478]">
        {description}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0071ba] px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/30"
      >
        {cta}
        <span className="transition-transform group-hover/btn:translate-x-1">
          →
        </span>
      </a>
    </article>
  );
}

/* ---------- page ---------- */

export default async function JobsPage() {
  // Fetched server-side and cached for 1 hour (see src/lib/mcfJobs.ts).
  const mcfResult = await fetchMcfJobs();

  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#020817]">
      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 text-center md:pt-20">
        <span className="text-sm font-semibold uppercase tracking-widest text-[#0071ba]">
          Find Your Next Role
        </span>
        <h1 className="mt-4 font-sans text-4xl font-bold leading-tight text-[#020817]">
          Browse Open Roles
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-lg leading-relaxed text-[#5b6478]">
          Explore opportunities across Singapore and Southeast Asia. New roles
          added daily.
        </p>
        <div
          className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-[#0071ba]/50 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Portal cards */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid gap-6 md:grid-cols-2">
          <PortalCard
            accentBg="bg-red-50"
            accentRing="border-red-200"
            emoji="🇸🇬"
            badgeLabel="Government Portal"
            name="MyCareersFuture"
            description="Browse all DHC-listed roles on Singapore's official government job portal — across every industry and seniority level."
            cta="View All Jobs on MyCareersFuture"
            href={MCF_SEARCH_URL}
          />
          <PortalCard
            accentBg="bg-blue-50"
            accentRing="border-blue-200"
            emoji="🌏"
            badgeLabel="Regional Platform"
            name="JobStreet"
            description="Find DHC-managed roles across Singapore and Southeast Asia on JobStreet — the region's leading job platform."
            cta="View All Jobs on JobStreet"
            href={JOBSTREET_URL}
          />
        </div>
      </section>

      {/* Live MCF feed — fetched server-side, revalidates hourly */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <LiveJobsList result={mcfResult} />
      </section>

      {/* Navy Quick Apply strip */}
      <section className="bg-[#020817]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 py-12 text-center md:flex-row md:justify-between md:gap-10 md:py-14 md:text-left">
          <p className="text-lg leading-relaxed text-white/85 md:flex-1">
            <span className="font-semibold text-white">
              Can&apos;t find what you&apos;re looking for?
            </span>{" "}
            Send us your CV and we&apos;ll match you with the right
            opportunity.
          </p>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0071ba] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/40"
          >
            Submit Your CV
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
