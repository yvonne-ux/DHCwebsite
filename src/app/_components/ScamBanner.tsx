"use client";

import { useEffect, useState } from "react";

// Dismissal is now stored in sessionStorage (per-tab / per-window),
// so the banner reappears for every new browser session, tab, or window —
// ensuring new visitors and returning users both see the scam warning.
const STORAGE_KEY = "dhc-scam-banner-dismissed";

export default function ScamBanner() {
  // Hidden on SSR + first client paint to avoid hydration mismatch.
  // useEffect promotes to visible only if the user hasn't dismissed it
  // *in this session*.
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      // One-time migration: clear any old localStorage dismissal from
      // the previous (persistent) implementation so the banner reappears
      // for previously-dismissed visitors.
      localStorage.removeItem(STORAGE_KEY);
      if (!sessionStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore — banner just stays dismissed for this view */
    }
  };

  return (
    <div
      role="alert"
      className="w-full border-l-4 border-[#F59E0B] bg-[#FFF8E7]"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <span
          className="scam-dot shrink-0 text-[15px] leading-none"
          aria-hidden="true"
        >
          🔴
        </span>

        <p className="flex-1 text-sm leading-snug text-[#78350F]">
          <span className="font-semibold">
            Beware of scammers impersonating Dynamic Human Capital.
          </span>{" "}
          DHC will never ask for payments or personal banking details.
        </p>

        <a
          href="/scam-warning"
          className="hidden shrink-0 text-sm font-semibold text-[#0071ba] hover:underline sm:inline-block"
        >
          Learn More
        </a>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss scam warning"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded text-[#78350F]/70 transition-colors hover:bg-black/5 hover:text-[#78350F]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="3" y1="3" x2="11" y2="11" />
            <line x1="11" y1="3" x2="3" y2="11" />
          </svg>
        </button>
      </div>
    </div>
  );
}
