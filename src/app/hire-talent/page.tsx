import type { Metadata } from "next";
import HireTalentForm from "./_components/HireTalentForm";

export const metadata: Metadata = {
  title: "Hire Talent",
  description:
    "Hire top talent in Singapore in 72 hours with Dynamic Human Capital. Permanent, contract, temporary and payroll outsourcing. MOM-licensed and ISO certified.",
  alternates: { canonical: "/hire-talent" },
};

export default function HireTalentPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#020817]">
      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-14 text-center md:pt-20">
        <span className="text-sm font-semibold uppercase tracking-widest text-[#0071ba]">
          Let&apos;s Build Your Team
        </span>
        <h1 className="mt-4 font-sans text-4xl font-bold leading-tight text-[#020817] md:text-5xl">
          Hire Top Talent in 72 Hours
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-lg leading-relaxed text-[#5b6478]">
          Tell us what you need and our consultants will get back to you within
          1 business day.
        </p>
        <div
          className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-[#0071ba]/50 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Form */}
      <section className="mx-auto max-w-2xl px-6 pb-16 md:pb-24">
        <HireTalentForm />
      </section>
    </main>
  );
}
