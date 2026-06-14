"use client";

import { useState } from "react";

const SUBJECTS = [
  "I'm hiring talent",
  "I'm looking for a job",
  "General enquiry",
  "Press / partnership",
];

// Formspree endpoint — submissions are forwarded to the configured inbox
// from the Formspree dashboard.
const FORMSPREE_URL = "https://formspree.io/f/mwvzqevd";

type Status = "idle" | "sending" | "success" | "error";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = ((data.get("name") as string) ?? "").trim();
    const email = ((data.get("email") as string) ?? "").trim();
    const message = ((data.get("message") as string) ?? "").trim();

    // Manual JS validation — the form has noValidate so the browser never
    // shows native "Please fill in this field" balloons. Validation only
    // fires when the user actually clicks Send.
    const firstMissing = !name
      ? "name"
      : !email
        ? "email"
        : !message
          ? "message"
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
      <h2 className="font-sans text-xl font-semibold text-[#020817] md:text-2xl">
        Send an enquiry
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#5b6478]">
        Fill in the form and we&apos;ll get back to you within 1 business day.
      </p>

      <div className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ef-name" className={labelBase}>
              Name
            </label>
            <input
              id="ef-name"
              name="name"
              required
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              className={`mt-2 ${inputBase}`}
            />
          </div>
          <div>
            <label htmlFor="ef-email" className={labelBase}>
              Email
            </label>
            <input
              id="ef-email"
              name="email"
              required
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`mt-2 ${inputBase}`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="ef-company" className={labelBase}>
            Company{" "}
            <span className="font-normal normal-case tracking-normal text-[#94a3b8]">
              (optional)
            </span>
          </label>
          <input
            id="ef-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={`mt-2 ${inputBase}`}
          />
        </div>

        <div>
          <label htmlFor="ef-subject" className={labelBase}>
            I&apos;m enquiring about
          </label>
          <select
            id="ef-subject"
            name="subject"
            className={`mt-2 ${inputBase}`}
            defaultValue={SUBJECTS[0]}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ef-message" className={labelBase}>
            Message
          </label>
          <textarea
            id="ef-message"
            name="message"
            required
            rows={5}
            placeholder="Tell us a little about what you need…"
            className={`mt-2 resize-y ${inputBase}`}
          />
        </div>

        {status === "success" && (
          <div
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-800"
          >
            Thank you! We&apos;ll get back to you within 1 business day.
          </div>
        )}
        {status === "error" && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800"
          >
            Something went wrong. Please try again or email us at{" "}
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
          {status === "sending" ? "Sending…" : "Send Enquiry"}
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
