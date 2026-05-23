"use client";

import { useState } from "react";

const SUBJECTS = [
  "I'm hiring talent",
  "I'm looking for a job",
  "General enquiry",
  "Press / partnership",
];

export default function EnquiryForm() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = ((data.get("name") as string) ?? "").trim();
    const email = ((data.get("email") as string) ?? "").trim();
    const company = ((data.get("company") as string) ?? "").trim();
    const subject = ((data.get("subject") as string) ?? "General enquiry").trim();
    const message = ((data.get("message") as string) ?? "").trim();

    // Manual JS validation — we run noValidate on the form so the browser
    // never shows native "Please fill in this field" balloons. Validation
    // only fires when the user actually clicks Send.
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

    setSending(true);
    const mailSubject = `${subject} — Enquiry from ${name}`;
    const mailBody =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Company: ${company || "N/A"}\n` +
      `Subject: ${subject}\n\n` +
      `Message:\n${message}\n`;

    const href =
      `mailto:info@dhc.com.sg?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(mailBody)}`;
    window.location.href = href;

    // Re-enable button after a short delay (the user may cancel the mail client)
    window.setTimeout(() => setSending(false), 1500);
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

        <button
          type="submit"
          disabled={sending}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0071ba] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/30 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {sending ? "Opening your mail app…" : "Send Enquiry"}
          {!sending && (
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          )}
        </button>

        <p className="text-center text-xs text-[#94a3b8]">
          Your information is kept confidential and never shared with third
          parties.
        </p>
      </div>
    </form>
  );
}
