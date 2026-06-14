import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Dynamic Human Capital's Personal Data Protection Act (PDPA) privacy notice — how we collect, use, store and protect your personal data.",
  alternates: { canonical: "/privacy-policy" },
};

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="font-sans text-lg font-semibold text-[#020817]">
        {number}. {title}
      </h2>
      <div className="mt-3 text-[#5b6478] leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#020817]">
      <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-medium text-[#0071ba] hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="font-sans text-4xl font-bold leading-tight text-[#020817] md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-[#5b6478]">Dynamic Human Capital Pte Ltd</p>
        <p className="mt-1 text-sm text-[#94a3b8]">
          Effective: 30 September 2023 · Last Updated: 31 May 2026
        </p>

        <div className="mt-10 rounded-xl border border-[#E6E9F2] bg-white p-8 shadow-[0_4px_24px_rgba(2,8,23,0.04)] md:p-10">
          <p className="text-[#5b6478] leading-relaxed">
            This Privacy Notice outlines how{" "}
            <strong className="font-semibold text-[#020817]">
              Dynamic Human Capital Pte Ltd (&ldquo;DHC&rdquo;)
            </strong>{" "}
            collects, uses, discloses, and processes personal data under
            Singapore&apos;s{" "}
            <strong className="font-semibold text-[#020817]">
              Personal Data Protection Act (PDPA)
            </strong>
            .
          </p>

          <Section number="1" title="Application of This Notice">
            DHC collects personal data to provide recruiting and staffing
            services, act as an employer, and deliver HR-related services. The
            company requires certain personal information from candidates, job
            applicants, contractors, and former employees to proceed with job
            placement and related services.
          </Section>

          <Section number="2" title="Personal Data Collected">
            <p className="mb-3">
              The categories of personal data DHC may collect depend on the
              stage of your engagement with us:
            </p>
            <p className="mb-2">
              <strong className="font-semibold text-[#020817]">
                Website forms (this site):
              </strong>{" "}
              name, email, phone, company name, job title, message content.
              Submitted via the &ldquo;Enquire&rdquo; and &ldquo;Hire
              Talent&rdquo; forms only.
            </p>
            <p className="mb-2">
              <strong className="font-semibold text-[#020817]">
                Active candidacy (collected after you engage with a consultant):
              </strong>
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Full name, gender, date of birth, nationality</li>
              <li>Address and additional contact details</li>
              <li>Resume, educational and professional qualifications</li>
              <li>Employment history and references</li>
              <li>Salary expectations and, at offer stage, bank account for
                payroll</li>
              <li>Next-of-kin and family member details (where required by the
                placement)</li>
              <li>Work-related health information and disabilities (where
                required by the role)</li>
              <li>Photographs (where required by the role)</li>
            </ul>
            <p className="mt-3 text-sm">
              The website itself never collects items in the second list —
              those are obtained directly by your assigned consultant under a
              separate written consent.
            </p>
          </Section>

          <Section number="3" title="Collection, Use, and Disclosure">
            <ul className="list-disc space-y-1 pl-5">
              <li>Assessing and evaluating your suitability for employment</li>
              <li>Identity verification</li>
              <li>Sharing with clients for placement opportunities</li>
              <li>Handling inquiries and complaints</li>
              <li>Compliance with legal obligations</li>
              <li>Background checks and screening</li>
              <li>Crime prevention and office security</li>
              <li>
                Sending industry-relevant content and career resources
              </li>
            </ul>
          </Section>

          <Section number="4" title="Consent and Withdrawal">
            Individuals may withdraw consent in writing via email to the Data
            Protection Officer. Withdrawal may affect job placement eligibility
            and office access.
          </Section>

          <Section number="5" title="Data Protection Measures">
            DHC implements administrative, physical and technical measures
            including encryption, access controls, authentication protocols,
            and regular security testing to safeguard your personal data.
          </Section>

          <Section number="6" title="Personal Data Retention">
            DHC retains personal data as long as necessary for stated purposes
            or as required by law.
          </Section>

          <Section number="7" title="International Transfers &amp; Named Processors">
            <p>
              DHC uses a small number of named third-party processors to deliver
              this website and our placement services. Each processor handles
              personal data under contractual safeguards comparable to PDPA
              protection.
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="font-semibold text-[#020817]">
                  Formspree, Inc.
                </strong>{" "}
                (Pennsylvania, USA) — receives form submissions from the
                Enquiry and Hire Talent forms on this website and forwards
                them to our consultants&apos; mailboxes. Data Processing
                Addendum:{" "}
                <a
                  href="https://formspree.io/legal/dpa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0071ba] hover:underline"
                >
                  formspree.io/legal/dpa
                </a>
                .
              </li>
              <li>
                <strong className="font-semibold text-[#020817]">
                  Google Workspace
                </strong>{" "}
                (Singapore region) — hosts DHC&apos;s consultant inboxes,
                calendars and shared drives. PDPA-aligned standard contractual
                clauses apply.
              </li>
              <li>
                <strong className="font-semibold text-[#020817]">
                  GitHub Pages
                </strong>{" "}
                (Microsoft, USA) and{" "}
                <strong className="font-semibold text-[#020817]">
                  Cloudflare
                </strong>{" "}
                (USA) — host and route the static{" "}
                <span className="font-mono">dhc.com.sg</span> website pages.
                The website itself does not store personal data; these
                providers see only HTTP traffic logs.
              </li>
              <li>
                <strong className="font-semibold text-[#020817]">
                  Singapore client employers
                </strong>{" "}
                — at placement stage, your CV and assessment are shared with
                the prospective employer named in our written consent.
              </li>
            </ul>
            <p className="mt-3 text-sm">
              No personal data is sold. Processors are audited annually by the
              Data Protection Officer. We will name any new processor in this
              section before it goes live.
            </p>
          </Section>

          <Section number="8" title="Data Protection Officer">
            <p>
              For requests regarding access, correction, or withdrawal of
              consent, contact our Data Protection Officer:
            </p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:DPO@elitez.asia"
                className="font-semibold text-[#0071ba] hover:underline"
              >
                DPO@elitez.asia
              </a>
            </p>
            <p className="mt-3">
              For general data queries:{" "}
              <a
                href="mailto:info@dhc.com.sg"
                className="font-semibold text-[#0071ba] hover:underline"
              >
                info@dhc.com.sg
              </a>{" "}
              · 2 Kallang Avenue, CT Hub, #03-08, Singapore 339407
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
