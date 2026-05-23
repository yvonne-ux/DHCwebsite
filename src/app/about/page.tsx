import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dynamic Human Capital — Singapore's MOM-licensed recruitment partner since 2012. Part of the Elitez Group with offices across Southeast Asia.",
  alternates: { canonical: "/about" },
};

const WHY_DHC: { icon: string; title: string; desc: string }[] = [
  {
    icon: "🏛️",
    title: "MOM Licensed",
    desc: "Fully accredited by Singapore's Ministry of Manpower. EA License: 12C6253. We operate with full compliance and transparency.",
  },
  {
    icon: "🌏",
    title: "Part of Elitez Group",
    desc: "Backed by a regional HR conglomerate with offices across Singapore, Malaysia, Indonesia, Thailand, and Vietnam.",
  },
  {
    icon: "⭐",
    title: "ISO Certified",
    desc: "ISO certified and TAFEP compliant. We uphold the highest standards of fair employment practices.",
  },
  {
    icon: "⚡",
    title: "72-Hour Shortlist",
    desc: "Average 72-hour shortlist turnaround. Industry-specialist recruiters, not generalists. Speed without compromising quality.",
  },
  {
    icon: "🤝",
    title: "Dedicated Account Manager",
    desc: "Every client gets a dedicated consultant who understands your business, culture, and hiring needs.",
  },
  {
    icon: "💡",
    title: "Replacement Guarantee",
    desc: "We stand behind every placement. Replacement guarantee on permanent placements for your peace of mind.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#020817]">
      {/* Centred intro */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 text-center md:pt-20">
        <span className="text-sm font-semibold uppercase tracking-widest text-[#0071ba]">
          Est. 2012
        </span>
        <h1 className="mt-4 font-sans text-4xl font-bold leading-tight text-[#020817] md:text-5xl">
          Connecting Talents, Driving Dreams
        </h1>
        <p className="mx-auto mt-5 max-w-[620px] text-lg leading-relaxed text-[#5b6478]">
          Singapore&apos;s MOM-licensed recruitment partner since 2012. Part of
          the Elitez Group, with offices across Southeast Asia.
        </p>
        <div
          className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-[#0071ba]/50 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Company description + team image */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-sans text-2xl font-bold text-[#020817] md:text-3xl">
              People-first recruitment, across Southeast Asia.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#5b6478]">
              Dynamic Human Capital (DHC) is a MOM-licensed Singapore
              recruitment agency established in 2012. We are part of Elitez
              Group — one of Southeast Asia&apos;s leading HR conglomerates with
              9 offices across 5 markets.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#5b6478]">
              From permanent placement to workforce transformation, we connect
              Singapore&apos;s top organisations with exceptional talent. Our
              consultants are industry specialists who deliver quality, speed,
              and compliance — every time.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-[#E6E9F2] shadow-[0_8px_28px_rgba(2,8,23,0.08)]">
            <Image
              src="/hero1.png"
              alt="The DHC team — Singapore &amp; Southeast Asia"
              width={720}
              height={520}
              className="h-auto w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020817]/55 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="font-sans text-base font-semibold text-white">
                The DHC Team
              </div>
              <p className="mt-0.5 text-sm text-white/85">
                Singapore &amp; Southeast Asia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why DHC? */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#0071ba]">
            Why DHC
          </span>
          <h2 className="mt-3 font-sans text-3xl font-bold text-[#020817] md:text-4xl">
            What sets us apart
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY_DHC.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-xl border border-[#E6E9F2] bg-white p-6 shadow-[0_4px_24px_rgba(2,8,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071ba]/40 hover:shadow-[0_16px_40px_rgba(2,8,23,0.10)]"
            >
              <span className="text-3xl leading-none" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="mt-4 font-sans text-lg font-semibold text-[#020817]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6478]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-12 md:pb-16">
        <div className="rounded-xl border border-[#E6E9F2] border-l-4 border-l-[#0071ba] bg-white p-10 text-center shadow-[0_4px_24px_rgba(2,8,23,0.05)]">
          <h2 className="font-sans text-2xl font-bold text-[#020817] md:text-3xl">
            Ready to work with us?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#5b6478]">
            Whether you&apos;re hiring or looking for your next role,
            we&apos;re here to help.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:career@dhc.com.sg"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#0071ba] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/30"
            >
              Get in Touch
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-[#020817]/10 bg-white px-7 py-3.5 text-sm font-bold text-[#020817] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0071ba] hover:text-[#0071ba]"
            >
              Our Services
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
