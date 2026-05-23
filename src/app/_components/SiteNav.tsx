"use client";

// Global site navigation — sticky, full-width, rendered once in layout.tsx
// so it appears on every page. Highlights the current page via usePathname,
// uses Next <Link> for SPA navigation, auto-closes the mobile menu on route
// change, and gains a subtle border + shadow after a few px of scroll.

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About",         href: "/about" },
  { label: "Services",      href: "/services" },
  { label: "Jobs",          href: "/jobs" },
  { label: "MOM Resources", href: "/mom-resources" },
  { label: "Contact",       href: "/contact" },
];

const HIRE_FORM = "https://forms.gle/dMc28vTtxo2A1KhQ7";

/* ------------------------------------------------------------------ */
/*  TaglineWalker                                                      */
/*  Pixel-art office worker (~14px tall) — DHC-blue suit + briefcase.  */
/*  Positioned absolutely on the tagline baseline by .tagline-walker;  */
/*  the .tagline-walk keyframe drives the walk + flip animation.       */
/* ------------------------------------------------------------------ */

function TaglineWalker() {
  const HIP_FRONT = { transformBox: "view-box" as const, transformOrigin: "11.7px 15.7px" };
  const HIP_BACK  = { transformBox: "view-box" as const, transformOrigin: "8.9px 15.7px"  };
  const SHOULDER  = { transformBox: "view-box" as const, transformOrigin: "14.6px 11px"   };

  const SUIT      = "#0071ba";
  const SUIT_DARK = "#005a96";
  const TROUSER   = "#003a5c";
  const SHOE      = "#1a1a22";
  const SKIN      = "#e9b98c";
  const HAIR      = "#2b2b33";
  const SHIRT     = "#ffffff";
  const CASE      = "#8a5a2a";
  const CASE_DK   = "#5e3a18";
  const HANDLE    = "#3a2a1a";

  return (
    <div className="tagline-walker" aria-hidden="true">
      <div className="walker-bob">
        <svg width="13" height="14" viewBox="0 0 22 24" shapeRendering="crispEdges">
          <rect x="6" y="10.5" width="2" height="5.5" fill={SUIT_DARK} />
          <g className="worker-leg-b" style={HIP_BACK}>
            <rect x="7.7" y="15.5" width="2.4" height="5.3" fill={TROUSER} />
            <rect x="6.6" y="20.6" width="3.6" height="1.7" fill={SHOE} />
          </g>
          <g className="worker-leg-a" style={HIP_FRONT}>
            <rect x="10.5" y="15.5" width="2.4" height="5.3" fill={TROUSER} />
            <rect x="10.3" y="20.6" width="3.6" height="1.7" fill={SHOE} />
          </g>
          <rect x="7.5" y="10" width="7" height="6.2" fill={SUIT} />
          <rect x="8.6" y="9"  width="4"   height="1.6" fill={SHIRT} />
          <rect x="10.4" y="10" width="1.3" height="3.6" fill={SHIRT} />
          <rect x="9" y="4.4" width="5"   height="4.8" fill={SKIN} />
          <rect x="7" y="4"   width="2.2" height="4.2" fill={HAIR} />
          <rect x="7" y="2"   width="7.2" height="2.6" fill={HAIR} />
          <g className="worker-arm" style={SHOULDER}>
            <rect x="13.5" y="10.5" width="2.3" height="5.4" fill={SUIT} />
            <rect x="13.6" y="15.4" width="2.1" height="1.4" fill={SKIN} />
            <rect x="13.7" y="15.9" width="2"   height="1.2" fill={HANDLE} />
            <rect x="11.9" y="16.9" width="4.8" height="3.5" fill={CASE} />
            <rect x="11.9" y="18.3" width="4.8" height="0.6" fill={CASE_DK} />
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SiteNav                                                            */
/* ------------------------------------------------------------------ */

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Match "/about" on both "/about" and "/about/anything", but never match
  // "/" against deeper paths.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href) ?? false;

  return (
    <nav
      className={`sticky top-0 z-50 overflow-hidden border-b bg-white transition-all duration-300 ${
        scrolled
          ? "border-[#E6E9F2] shadow-[0_4px_20px_rgba(2,8,23,0.05)]"
          : "border-transparent"
      }`}
    >
      <div className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:h-24">
        {/* Logo + tagline + walker */}
        <Link
          href="/"
          className="relative flex h-full flex-col items-start justify-center gap-1"
          aria-label="Dynamic Human Capital — home"
        >
          <div className="flex w-fit flex-col">
            <Image
              src="/dhc-logo.png"
              alt="Dynamic Human Capital"
              width={130}
              height={44}
              priority
              className="block h-9 w-auto object-contain"
            />
            <div className="logo-underline mt-1.5" aria-hidden="true" />
          </div>
          <div className="relative hidden w-[280px] md:block">
            <span className="tagline-text text-[9px] font-bold uppercase leading-none tracking-[0.15em] text-[#0071ba]">
              Connecting Talents, Driving Dreams
            </span>
            <TaglineWalker />
          </div>
        </Link>

        {/* Centre links (desktop) */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "text-[#0071ba]"
                    : "text-[#5b6478] hover:text-[#0071ba]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href={HIRE_FORM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-xl bg-[#0071ba] px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-lg hover:shadow-[#0071ba]/25"
          >
            Hire Talent
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-0.5 w-6 bg-[#020817] transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-[#020817] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-[#020817] transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="relative z-10 border-t border-[#E6E9F2] bg-white lg:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-[44px] items-center text-sm font-medium transition-colors ${
                    active
                      ? "text-[#0071ba]"
                      : "text-[#5b6478] hover:text-[#0071ba]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href={HIRE_FORM}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-xl bg-[#0071ba] px-5 py-3 text-center text-sm font-bold text-white"
            >
              Hire Talent
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
