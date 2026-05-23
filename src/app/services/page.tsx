import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServicesPanel from "./_components/ServicesPanel";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-spectrum HR solutions for Singapore's most ambitious organisations — permanent and contract recruitment, executive search, payroll, EOR, and HR consulting. MOM-licensed, ISO-certified.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#020817]">
      {/* Minimal header — logo + breadcrumb */}
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
            <Link
              href="/"
              className="transition-colors hover:text-[#0071ba]"
            >
              Home
            </Link>
            <span className="mx-2 text-[#cbd5e1]" aria-hidden="true">
              /
            </span>
            <span className="font-medium text-[#020817]">Services</span>
          </nav>
        </div>
      </header>

      {/* Intro — centred */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 text-center md:pt-20">
        <span className="text-base font-semibold uppercase tracking-widest text-[#0071ba]">
          What We Do
        </span>
        <h1 className="mt-4 font-sans text-3xl font-bold leading-tight text-[#020817]">
          Our Services
        </h1>
        <p className="mx-auto mt-5 max-w-[600px] text-lg leading-relaxed text-[#5b6478]">
          Full-spectrum HR solutions for Singapore&apos;s most ambitious
          organisations.
        </p>
        <p className="mx-auto mt-2 text-sm text-[#94a3b8]">
          MOM-licensed
          <span className="mx-2.5 text-[#cbd5e1]" aria-hidden="true">·</span>
          ISO-certified
          <span className="mx-2.5 text-[#cbd5e1]" aria-hidden="true">·</span>
          Trusted by 200+ companies
        </p>
        {/* Subtle gradient divider */}
        <div
          className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-[#0071ba]/50 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Tabbed sliding panel */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <ServicesPanel />
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-6 md:pb-10">
        <div className="rounded-xl border border-[#E6E9F2] border-l-4 border-l-[#0071ba] bg-white p-10 text-center shadow-[0_4px_24px_rgba(2,8,23,0.05)]">
          <h2 className="font-sans text-2xl font-bold text-[#020817] md:text-3xl">
            Not sure which service fits?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#5b6478]">
            Our consultants will assess your needs and recommend the right
            solution — usually within 24 hours.
          </p>
          <a
            href="mailto:career@dhc.com.sg"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0071ba] px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/30"
          >
            Talk to a Consultant
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
