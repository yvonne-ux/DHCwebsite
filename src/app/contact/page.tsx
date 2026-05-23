import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "./_components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Dynamic Human Capital. Office, phone, email and enquiry form for hiring, job applications and general questions. MOM-licensed recruitment in Singapore.",
  alternates: { canonical: "/contact" },
};

/* ---------- icons ---------- */

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 6.5c0 3.5-5 8-5 8s-5-4.5-5-8a5 5 0 1 1 10 0z" />
      <circle cx="8" cy="6.5" r="1.8" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 11.4v2a1.3 1.3 0 0 1-1.4 1.3A12 12 0 0 1 1.3 3.4 1.3 1.3 0 0 1 2.6 2h2a1.3 1.3 0 0 1 1.3 1.1c.08.6.22 1.2.42 1.7a1.3 1.3 0 0 1-.3 1.4l-.8.8a10 10 0 0 0 4 4l.8-.8a1.3 1.3 0 0 1 1.4-.3c.5.2 1.1.34 1.7.42A1.3 1.3 0 0 1 14 11.4z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3.5" width="12" height="9" rx="1.2" />
      <path d="M2.5 4l5.5 4 5.5-4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

/* ---------- contact row ---------- */

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const valueClass =
    "mt-0.5 text-base font-medium text-[#020817] " +
    (href ? "transition-colors hover:text-[#0071ba]" : "");
  return (
    <li className="flex items-start gap-4">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0071ba]/10 text-[#0071ba]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5b6478]">
          {label}
        </div>
        {href ? (
          <a href={href} className={valueClass}>
            {value}
          </a>
        ) : (
          <div className={valueClass}>{value}</div>
        )}
      </div>
    </li>
  );
}

/* ---------- page ---------- */

const LINKEDIN_URL =
  "https://www.linkedin.com/company/3648154/admin/dashboard/";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#020817]">
      {/* Intro — centred */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 text-center md:pt-20">
        <span className="text-sm font-semibold uppercase tracking-widest text-[#0071ba]">
          Get in Touch
        </span>
        <h1 className="mt-4 font-sans text-4xl font-bold leading-tight text-[#020817]">
          Let&apos;s Build Your Workforce Together
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-lg leading-relaxed text-[#5b6478]">
          Whether you&apos;re hiring or looking for your next role — we&apos;re
          ready to help.
        </p>
        <div
          className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-[#0071ba]/50 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Two-column layout */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-12 lg:gap-16">
          {/* LEFT — contact details */}
          <div className="rounded-xl border border-[#E6E9F2] bg-white p-7 shadow-[0_4px_24px_rgba(2,8,23,0.04)] md:p-8">
            <h2 className="font-sans text-xl font-semibold text-[#020817] md:text-2xl">
              Visit, call or email us
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5b6478]">
              Our consultants are based in Singapore and serve clients across
              Southeast Asia and India.
            </p>

            <ul className="mt-7 space-y-5">
              <ContactRow
                icon={<PinIcon />}
                label="Office"
                value={
                  <>
                    2 Kallang Avenue, CT Hub
                    <br />
                    #03-08, Singapore 339407
                  </>
                }
              />
              <ContactRow
                icon={<PhoneIcon />}
                label="Phone"
                value="+65 6050 0777"
                href="tel:+6560500777"
              />
              <ContactRow
                icon={<MailIcon />}
                label="General Enquiries"
                value="info@dhc.com.sg"
                href="mailto:info@dhc.com.sg"
              />
              <ContactRow
                icon={<MailIcon />}
                label="Career Enquiries"
                value="career@dhc.com.sg"
                href="mailto:career@dhc.com.sg"
              />
              <ContactRow
                icon={<ClockIcon />}
                label="Office Hours"
                value="Mon–Fri · 9:00am – 6:00pm SGT"
              />
            </ul>

            {/* Socials */}
            <div className="mt-7 border-t border-[#EAEDF3] pt-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5b6478]">
                Follow Us
              </div>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dynamic Human Capital on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EAEDF3] text-[#5b6478] transition-colors hover:border-[#0071ba] hover:text-[#0071ba]"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-7 flex flex-wrap gap-2 border-t border-[#EAEDF3] pt-6">
              {[
                "MOM Licensed",
                "ISO Certified",
                "CPF Registered",
                "TAFEP Compliant",
              ].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 rounded-full border border-[#E6E9F2] bg-[#F7F8FC] px-3 py-1 text-[11px] font-semibold text-[#5b6478]"
                >
                  ✓ {c}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — enquiry form */}
          <EnquiryForm />
        </div>
      </section>
    </main>
  );
}
