import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ResourceList from "./_components/ResourceList";

export const metadata: Metadata = {
  title: "MOM Resources & Work Pass Guides",
  description:
    "Everything you need to know about Singapore work passes, MOM employment regulations, CPF, IR8A and fair-employment practices. Curated MOM resources from Dynamic Human Capital.",
  alternates: { canonical: "/mom-resources" },
};

const QUICK_TOOLS = [
  {
    name: "MOM Levy Calculator",
    desc: "Estimate the foreign worker levy for your hires.",
    href: "https://www.mom.gov.sg/eservices/services/foreign-worker-levy-calculator",
  },
  {
    name: "Work Pass Eligibility Checker",
    desc: "Self-Assessment Tool for Employment Pass & S Pass.",
    href: "https://www.mom.gov.sg/eservices/services/self-assessment-tool-sat-for-employment-pass-and-s-pass",
  },
  {
    name: "Employment Act Guide",
    desc: "Singapore's labour law in plain language.",
    href: "https://www.mom.gov.sg/employment-practices/employment-act",
  },
];

export default function MOMResourcesPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#020817]">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-[#EAEDF3] bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Dynamic Human Capital — home"
          >
            <Image
              src="/dhc-logo.png"
              alt="Dynamic Human Capital"
              width={130}
              height={44}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
          <nav aria-label="Breadcrumb" className="text-sm text-[#5b6478]">
            <Link href="/" className="transition-colors hover:text-[#0071ba]">
              Home
            </Link>
            <span className="mx-2 text-[#cbd5e1]" aria-hidden="true">
              /
            </span>
            <span className="font-medium text-[#020817]">MOM Resources</span>
          </nav>
        </div>
      </header>

      {/* Intro — centred */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 text-center md:pt-20">
        <span className="text-sm font-semibold uppercase tracking-widest text-[#0071ba]">
          Work Pass Guides
        </span>
        <h1 className="mt-4 font-sans text-4xl font-bold leading-tight text-[#020817]">
          MOM Resources &amp; Work Pass Guides
        </h1>
        <p className="mx-auto mt-5 max-w-[600px] text-lg leading-relaxed text-[#5b6478]">
          Everything you need to know about Singapore work passes, eligibility
          and application processes.
        </p>
        <div
          className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-[#0071ba]/50 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Category tabs + resource cards */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <ResourceList />
      </section>

      {/* Quick Tools strip */}
      <section className="bg-[#EFF6FF] py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#0071ba]">
              Quick Tools
            </span>
            <h2 className="mt-3 font-sans text-2xl font-bold text-[#020817] md:text-3xl">
              MOM Tools at a Glance
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-base leading-relaxed text-[#5b6478]">
              The three tools we reach for most when advising clients on
              compliance and hiring.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {QUICK_TOOLS.map((t) => (
              <a
                key={t.name}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-blue-100 bg-white p-6 shadow-[0_2px_12px_rgba(2,8,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071ba] hover:shadow-[0_12px_28px_rgba(2,8,23,0.08)]"
              >
                <h3 className="font-sans text-base font-semibold text-[#020817]">
                  {t.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#5b6478]">
                  {t.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#0071ba]">
                  Open Tool
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-14 md:pb-16">
        <div className="rounded-xl border border-[#E6E9F2] border-l-4 border-l-[#0071ba] bg-white p-10 text-center shadow-[0_4px_24px_rgba(2,8,23,0.05)]">
          <h2 className="font-sans text-2xl font-bold text-[#020817] md:text-3xl">
            Need help with work pass applications?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#5b6478]">
            Our MOM-licensed consultants can guide you through Singapore&apos;s
            employment regulations end to end.
          </p>
          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0071ba] px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/30"
          >
            Talk to a Consultant
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
