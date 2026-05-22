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
          Effective: 30 September 2023 · Last Updated: 4 August 2024
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
            <ul className="list-disc space-y-1 pl-5">
              <li>Full name, gender, date of birth, nationality</li>
              <li>Contact details (address, phone, email)</li>
              <li>Resume, educational and professional qualifications</li>
              <li>Employment history and references</li>
              <li>Salary information and bank account details</li>
              <li>Next-of-kin and family member details</li>
              <li>Work-related health information and disabilities</li>
              <li>Photographs</li>
            </ul>
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

          <Section number="7" title="International Transfers">
            Personal data may be transferred outside Singapore to service
            providers, with appropriate legal safeguards ensuring comparable
            protection standards.
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
