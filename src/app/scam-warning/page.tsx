import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recruitment Scam Warning",
  description:
    "How to identify scams impersonating Dynamic Human Capital, what to watch out for, and where to report a suspected scam in Singapore.",
  alternates: { canonical: "/scam-warning" },
};

/* ---------- copy ---------- */

const VERIFY: string[] = [
  "We only contact candidates via official email addresses ending in @dhc.com.sg",
  "We never ask for upfront payments, deposits, or processing fees",
  "We never request your banking details, CPF information, or NRIC via WhatsApp or Telegram",
  "All job offers are confirmed in writing via official email only",
  "Our consultants are MOM-licensed and will provide their CEI number on request",
];

const TACTICS: string[] = [
  "Fake WhatsApp or Telegram messages pretending to be DHC consultants",
  'Requests for payment to "secure" a job placement',
  "Offers that seem too good to be true with unusually high salaries",
  "Pressure to act quickly without proper documentation",
];

/* ---------- icons ---------- */

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#0071ba" fillOpacity="0.12" />
      <path
        d="M5.2 9.3l2.4 2.4 5.2-5.6"
        stroke="#0071ba"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#F59E0B" fillOpacity="0.16" />
      <path
        d="M9 4.5v4.7"
        stroke="#92400E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9" cy="12.5" r="0.9" fill="#92400E" />
    </svg>
  );
}

function ActionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#0071ba" fillOpacity="0.12" />
      <path
        d="M9 5.4v3.9l2.6 1.5"
        stroke="#0071ba"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- page ---------- */

export default function ScamWarningPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#020817]">
      {/* Minimal header — logo + back link */}
      <header className="border-b border-[#E6E9F2] bg-white">
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
          <Link
            href="/"
            className="text-sm font-medium text-[#5b6478] transition-colors hover:text-[#0071ba]"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[#F0F4F8] px-6 pb-16 pt-16 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#FFF8E7] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#92400E]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
            Stay Safe
          </span>
          <h1 className="font-sans text-4xl font-bold leading-[1.08] tracking-tight text-[#020817] md:text-5xl">
            Protecting Yourself from Recruitment Scams
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-lg leading-relaxed tracking-wide text-[#6B7280]">
            Dynamic Human Capital will never ask you for money. Here&apos;s how
            to stay safe.
          </p>
        </div>
      </section>

      {/* Body sections */}
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-12 md:pt-16">
        <div className="grid gap-6">
          {/* Section 1 — Verification */}
          <section className="rounded-xl border border-[#E6E9F2] bg-white p-8 shadow-[0_4px_24px_rgba(2,8,23,0.04)] md:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#0071ba]">
              Verification
            </span>
            <h2 className="mt-2 font-sans text-xl font-semibold text-[#020817] md:text-2xl">
              How to identify a genuine DHC representative
            </h2>
            <ul className="mt-6 grid gap-3.5">
              {VERIFY.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#5b6478] md:text-base"
                >
                  <span className="mt-0.5 shrink-0">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 — Warning signs */}
          <section className="rounded-xl border border-[#F59E0B]/25 bg-[#FFFBF0] p-8 shadow-[0_4px_24px_rgba(2,8,23,0.04)] md:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#92400E]">
              Warning Signs
            </span>
            <h2 className="mt-2 font-sans text-xl font-semibold text-[#020817] md:text-2xl">
              Common scam tactics to watch out for
            </h2>
            <ul className="mt-6 grid gap-3.5">
              {TACTICS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#5b6478] md:text-base"
                >
                  <span className="mt-0.5 shrink-0">
                    <WarnIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 — What to do */}
          <section className="rounded-xl border border-[#E6E9F2] bg-white p-8 shadow-[0_4px_24px_rgba(2,8,23,0.04)] md:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#0071ba]">
              If You Suspect a Scam
            </span>
            <h2 className="mt-2 font-sans text-xl font-semibold text-[#020817] md:text-2xl">
              What to do if you suspect a scam
            </h2>
            <ul className="mt-6 grid gap-3.5">
              <li className="flex items-start gap-3 text-sm leading-relaxed text-[#5b6478] md:text-base">
                <span className="mt-0.5 shrink-0">
                  <ActionIcon />
                </span>
                <span>Do not make any payments.</span>
              </li>
              <li className="flex items-start gap-3 text-sm leading-relaxed text-[#5b6478] md:text-base">
                <span className="mt-0.5 shrink-0">
                  <ActionIcon />
                </span>
                <span>
                  Report it to the Singapore Police Force at{" "}
                  <a
                    href="https://www.police.gov.sg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#0071ba] hover:underline"
                  >
                    www.police.gov.sg
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+6518002550000"
                    className="font-semibold text-[#0071ba] hover:underline"
                  >
                    1800-255-0000
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm leading-relaxed text-[#5b6478] md:text-base">
                <span className="mt-0.5 shrink-0">
                  <ActionIcon />
                </span>
                <span>
                  Email us at{" "}
                  <a
                    href="mailto:info@dhc.com.sg"
                    className="font-semibold text-[#0071ba] hover:underline"
                  >
                    info@dhc.com.sg
                  </a>{" "}
                  to verify if a DHC consultant contacted you.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm leading-relaxed text-[#5b6478] md:text-base">
                <span className="mt-0.5 shrink-0">
                  <ActionIcon />
                </span>
                <span>
                  File a report with MOM if it involves fake employment offers.
                </span>
              </li>
            </ul>
          </section>
        </div>

        {/* Back to Home CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#0071ba] px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/30"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
