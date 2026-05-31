"use client";

// Employer enquiry form — POSTs to a dedicated Formspree endpoint
// configured for hiring leads (separate inbox from the general contact form).

import { useState } from "react";

const HIRES_OPTIONS = ["1", "2-5", "6-10", "10+"];
const EMPLOYMENT_OPTIONS = [
  "Permanent",
  "Contract",
  "Temporary",
  "Payroll Outsourcing",
];
const TIMELINE_OPTIONS = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "Just exploring",
];

const FORMSPREE_URL = "https://formspree.io/f/xkoezwje";

type Status = "idle" | "sending" | "success" | "error";

export default function HireTalentForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = ((data.get("name") as string) ?? "").trim();
    const email = ((data.get("email") as string) ?? "").trim();
    const company = ((data.get("company") as string) ?? "").trim();
    const jobTitle = ((data.get("job_title") as string) ?? "").trim();

    // Manual validation — form has noValidate so the browser never shows
    // its native "Please fill in this field" balloons. We focus the first
    // empty required field instead.
    const firstMissing = !name
      ? "name"
      : !email
        ? "email"
        : !company
          ? "company"
          : !jobTitle
            ? "job_title"
            : null;
    if (firstMissing) {
      const el = form.elements.namedItem(firstMissing) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      el?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "min-h-[44px] w-full rounded-lg border border-[#E6E9F2] bg-white px-4 py-3 text-sm text-[#020817] placeholder:text-[#94a3b8] transition-colors focus:border-[#0071ba] focus:outline-none focus:ring-2 focus:ring-[#0071ba]/15";
  const labelBase =
    "block text-xs font-semibold uppercase tracking-wider text-[#5b6478]";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-[#E6E9F2] bg-white p-7 shadow-[0_4px_24px_rgba(2,8,23,0.05)] md:p-8"
    >
      <div className="space-y-5">
        {/* Row 1 — Name + Work Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ht-name" className={labelBase}>
              Full Name
            </label>
            <input
              id="ht-name"
              name="name"
              required
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              className={`mt-2 ${inputBase}`}
            />
          </div>
          <div>
            <label htmlFor="ht-email" className={labelBase}>
              Work Email
            </label>
            <input
              id="ht-email"
              name="email"
              required
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className={`mt-2 ${inputBase}`}
            />
          </div>
        </div>

        {/* Row 2 — Company + Job Title */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ht-company" className={labelBase}>
              Company Name
            </label>
            <input
              id="ht-company"
              name="company"
              required
              type="text"
              autoComplete="organization"
              placeholder="Company name"
              className={`mt-2 ${inputBase}`}
            />
          </div>
          <div>
            <label htmlFor="ht-job-title" className={labelBase}>
              Job Title You&apos;re Hiring For
            </label>
            <input
              id="ht-job-title"
              name="job_title"
              required
              type="text"
              placeholder="e.g. Senior Software Engineer"
              className={`mt-2 ${inputBase}`}
            />
          </div>
        </div>

        {/* Row 3 — Number of hires + Employment type */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ht-hires" className={labelBase}>
              Number of Hires Needed
            </label>
            <select
              id="ht-hires"
              name="hires"
              defaultValue={HIRES_OPTIONS[0]}
              className={`mt-2 ${inputBase}`}
            >
              {HIRES_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ht-employment" className={labelBase}>
              Employment Type
            </label>
            <select
              id="ht-employment"
              name="employment_type"
              defaultValue={EMPLOYMENT_OPTIONS[0]}
              className={`mt-2 ${inputBase}`}
            >
              {EMPLOYMENT_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4 — Timeline */}
        <div>
          <label htmlFor="ht-timeline" className={labelBase}>
            Timeline
          </label>
          <select
            id="ht-timeline"
            name="timeline"
            defaultValue={TIMELINE_OPTIONS[0]}
            className={`mt-2 ${inputBase}`}
          >
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Row 5 — Message */}
        <div>
          <label htmlFor="ht-message" className={labelBase}>
            Message / Additional Details{" "}
            <span className="font-normal normal-case tracking-normal text-[#94a3b8]">
              (optional)
            </span>
          </label>
          <textarea
            id="ht-message"
            name="message"
            rows={5}
            placeholder="Tell us more about the role, required skills, location, salary range, or anything else that would help us shortlist faster…"
            className={`mt-2 resize-y ${inputBase}`}
          />
        </div>

        {/* Status banners */}
        {status === "success" && (
          <div
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-800"
          >
            Thank you! A consultant will contact you within 1 business day.
          </div>
        )}
        {status === "error" && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800"
          >
            Something went wrong. Please email us at{" "}
            <a
              href="mailto:info@dhc.com.sg"
              className="font-semibold underline"
            >
              info@dhc.com.sg
            </a>
            .
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0071ba] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/30 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {status === "sending" ? "Sending…" : "Submit Enquiry"}
          {status !== "sending" && (
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          )}
        </button>

        <p className="text-center text-xs text-[#94a3b8]">
          Submissions are processed by Formspree (USA) and routed to our
          consultants&apos; Google Workspace inboxes. See our{" "}
          <a
            href="/privacy-policy"
            className="font-semibold text-[#5b6478] underline decoration-dotted underline-offset-2 hover:text-[#0071ba]"
          >
            Privacy Policy
          </a>{" "}
          for the full list of processors.
        </p>
      </div>
    </form>
  );
}
