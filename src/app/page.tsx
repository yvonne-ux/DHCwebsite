"use client";

import { Component, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { geoMercator } from "d3-geo";

/* ------------------------------------------------------------------ */
/*  MapErrorBoundary — never let a stray render error blank the page   */
/* ------------------------------------------------------------------ */

class MapErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (typeof console !== "undefined") {
      console.warn("[MapErrorBoundary] caught:", error.message);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="mx-auto w-full rounded-xl border border-[#E6E9F2] bg-white p-8 text-center text-sm text-[#5b6478]">
            Map temporarily unavailable.
          </div>
        )
      );
    }
    return this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const HERO_PHRASES = [
  "Your Next Career Move Starts Here",
  "Hire Smarter. Move Faster.",
  "People First. Always.",
];

const STATS = [
  { value: 5000, suffix: "+", label: "Placements" },
  { value: 12, suffix: "", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 72, suffix: "hr", label: "Shortlist Turnaround" },
];

const JOB_TICKER = [
  { role: "Senior Accountant", salary: "$5,500" },
  { role: "HR Business Partner", salary: "$7,000" },
  { role: "Software Engineer", salary: "$8,500" },
  { role: "Operations Manager", salary: "$9,000" },
  { role: "Procurement Specialist", salary: "$5,200" },
  { role: "Warehouse Supervisor", salary: "$3,800" },
  { role: "Marketing Manager", salary: "$7,800" },
  { role: "Customer Success Lead", salary: "$6,500" },
  { role: "Finance Analyst", salary: "$5,800" },
  { role: "Project Engineer", salary: "$6,200" },
];

const HIRE_FORM = "https://forms.gle/dMc28vTtxo2A1KhQ7";
const JOBS_LINK =
  "https://www.mycareersfuture.gov.sg/search?search=dynamic+human+capital&sortBy=new_posting_date";
const JOBSTREET_LINK =
  "https://www.jobstreet.com.sg/jobs?q=Dynamic+Human+Capital&sortmode=ListedDate";

/* ------------------------------------------------------------------ */
/*  Typewriter                                                         */
/* ------------------------------------------------------------------ */

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = HERO_PHRASES[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), 1900);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % HERO_PHRASES.length);
    } else {
      timer = setTimeout(
        () =>
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          ),
        deleting ? 40 : 75
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span>
      {text}
      <span className="typewriter-caret" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Count-up stat                                                      */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Drive the counter by ELAPSED TIME (requestAnimationFrame), not by
    // counting interval ticks — guarantees we reach `value` exactly,
    // regardless of frame-rate throttling or browser tab sleep.
    let rafId = 0;
    const startTime = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed >= duration) {
        setCount(value);
        return;
      }
      const progress = elapsed / duration;
      // ease-out cubic for a softer landing
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * eased));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [value]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  WalkingWomanSprite                                                 */
/*  Pixel-art female office professional with 6 country-costume        */
/*  variants. Shared skeleton + leg/arm pivots, so the gait animation  */
/*  (worker-leg-a/b + worker-arm) works for every costume.             */
/*    variant 0 — Singapore (business suit, default)                    */
/*    variant 1 — Malaysia  (Baju Kurung + hijab)                      */
/*    variant 2 — Thailand  (Chut Thai, sash + topknot)                */
/*    variant 3 — Vietnam   (Áo Dài over wide-leg pants)               */
/*    variant 4 — Indonesia (Kebaya + batik sarong)                    */
/*    variant 5 — India     (Saree + bindi)                            */
/* ------------------------------------------------------------------ */

function WalkingWomanSprite({
  size = 18,
  variant = 0,
}: {
  size?: number;
  variant?: number;
}) {
  const w = Math.round((size * 22) / 24);
  const HIP_BACK  = { transformBox: "view-box" as const, transformOrigin: "9.25px 21px"  };
  const HIP_FRONT = { transformBox: "view-box" as const, transformOrigin: "12.75px 21px" };
  const SHOULDER  = { transformBox: "view-box" as const, transformOrigin: "15.5px 11px"  };
  const SKIN       = "#e9b98c";
  const SKIN_DARK  = "#c08566";
  const HAIR_BROWN = "#3a2a18";
  const HAIR_BLACK = "#1a1a22";
  const SHOE       = "#1a1a22";

  let content: React.ReactNode;

  switch (variant) {
    case 1: {
      // Malaysia — Baju Kurung + hijab (purple + gold)
      const HIJAB = "#7c3aed";
      const HIJAB_DARK = "#5b21b6";
      const GOLD = "#d4af37";
      content = (
        <>
          {/* Hijab covers crown + drapes to chest */}
          <rect x="5"    y="2"    width="12"  height="4"   fill={HIJAB} />
          <rect x="5"    y="6"    width="3"   height="6.5" fill={HIJAB} />
          <rect x="14"   y="6"    width="3"   height="6.5" fill={HIJAB} />
          {/* Face (smaller, framed by hijab) */}
          <rect x="8"    y="6"    width="6"   height="4"   fill={SKIN} />
          {/* Back arm */}
          <rect x="5.5"  y="10.5" width="2"   height="5.5" fill={HIJAB_DARK} />
          {/* Legs (mostly hidden under long dress) */}
          <g className="worker-leg-b" style={HIP_BACK}>
            <rect x="8"    y="21.5" width="2.5" height="2.5" fill={HIJAB} />
            <rect x="7.7"  y="23.5" width="3.1" height="0.7" fill={SHOE} />
          </g>
          <g className="worker-leg-a" style={HIP_FRONT}>
            <rect x="11.5" y="21.5" width="2.5" height="2.5" fill={HIJAB} />
            <rect x="11.2" y="23.5" width="3.1" height="0.7" fill={SHOE} />
          </g>
          {/* Long tunic (Baju) */}
          <rect x="6"    y="10"   width="10"  height="8"   fill={HIJAB} />
          {/* Gold belt */}
          <rect x="6"    y="17.3" width="10"  height="0.6" fill={GOLD} />
          {/* Long skirt (Kurung) — ankle length */}
          <polygon points="6,18 16,18 17,23 5,23" fill={HIJAB} />
          <rect x="5"    y="22.5" width="12"  height="0.4" fill={GOLD} />
          {/* Front arm + gold clutch */}
          <g className="worker-arm" style={SHOULDER}>
            <rect x="14.5" y="10.5" width="2"   height="5.5" fill={HIJAB} />
            <rect x="13"   y="15.5" width="3.5" height="2"   fill={GOLD} />
          </g>
        </>
      );
      break;
    }

    case 2: {
      // Thailand — Chut Thai (magenta silk + gold sabai, topknot hair)
      const SILK = "#be185d";
      const SILK_DARK = "#9d174d";
      const GOLD = "#d4af37";
      const SHOE_TH = "#451a03";
      content = (
        <>
          {/* Topknot + hair frame */}
          <rect x="9"    y="0.5" width="4"   height="2.5" fill={HAIR_BLACK} />
          <rect x="6"    y="3"   width="10"  height="3"   fill={HAIR_BLACK} />
          <rect x="5.5"  y="4.5" width="2"   height="4"   fill={HAIR_BLACK} />
          <rect x="14.5" y="4.5" width="2"   height="4"   fill={HAIR_BLACK} />
          {/* Face */}
          <rect x="8"    y="5"   width="6"   height="5"   fill={SKIN} />
          {/* Back arm */}
          <rect x="5.5"  y="10.5" width="2"  height="5"   fill={SILK_DARK} />
          {/* Legs (fitted Pha Sin — narrow) */}
          <g className="worker-leg-b" style={HIP_BACK}>
            <rect x="8"    y="21.5" width="2.5" height="2.5" fill={SILK} />
            <rect x="7.7"  y="23.5" width="3.1" height="0.7" fill={SHOE_TH} />
          </g>
          <g className="worker-leg-a" style={HIP_FRONT}>
            <rect x="11.5" y="21.5" width="2.5" height="2.5" fill={SILK} />
            <rect x="11.2" y="23.5" width="3.1" height="0.7" fill={SHOE_TH} />
          </g>
          {/* Top blouse */}
          <rect x="7"    y="10"   width="8"   height="5"   fill={SILK} />
          {/* Sabai — diagonal gold sash */}
          <polygon points="6.5,11 9,10 16,15.5 14,17" fill={GOLD} />
          {/* Fitted Pha Sin skirt */}
          <polygon points="7,15 15,15 15.5,21.5 6.5,21.5" fill={SILK} />
          <rect x="6.5"  y="20.6" width="9"   height="0.6" fill={GOLD} />
          {/* Front arm */}
          <g className="worker-arm" style={SHOULDER}>
            <rect x="14.5" y="10.5" width="2"   height="5"   fill={SILK} />
          </g>
        </>
      );
      break;
    }

    case 3: {
      // Vietnam — Áo Dài (white tunic + wide-leg blue pants, long black hair)
      const TUNIC = "#ffffff";
      const NECK_TRIM = "#0071ba";
      const PANTS = "#0071ba";
      const ARM_DARK = "#9ca3af";
      content = (
        <>
          {/* Long straight black hair */}
          <rect x="6"    y="2"   width="10"  height="3.5" fill={HAIR_BLACK} />
          <rect x="5"    y="4"   width="2.5" height="11"  fill={HAIR_BLACK} />
          <rect x="14.5" y="4"   width="2.5" height="11"  fill={HAIR_BLACK} />
          {/* Face */}
          <rect x="8"    y="5"   width="6"   height="5"   fill={SKIN} />
          {/* Back arm */}
          <rect x="5.5"  y="10.5" width="2"  height="5"   fill={ARM_DARK} />
          {/* Wide-leg pants under tunic */}
          <g className="worker-leg-b" style={HIP_BACK}>
            <rect x="7.5"  y="19"   width="3"   height="5"   fill={PANTS} />
            <rect x="7.3"  y="23.5" width="3.4" height="0.7" fill={SHOE} />
          </g>
          <g className="worker-leg-a" style={HIP_FRONT}>
            <rect x="11.5" y="19"   width="3"   height="5"   fill={PANTS} />
            <rect x="11.3" y="23.5" width="3.4" height="0.7" fill={SHOE} />
          </g>
          {/* Long Áo Dài tunic */}
          <rect x="7"    y="10"   width="8"   height="9"   fill={TUNIC} />
          {/* Neck trim */}
          <rect x="9"    y="10"   width="4"   height="1"   fill={NECK_TRIM} />
          {/* Side-slit hints */}
          <rect x="7"    y="17"   width="0.7" height="2"   fill={PANTS} />
          <rect x="14.3" y="17"   width="0.7" height="2"   fill={PANTS} />
          {/* Front arm */}
          <g className="worker-arm" style={SHOULDER}>
            <rect x="14.5" y="10.5" width="2"   height="5"   fill={TUNIC} />
          </g>
        </>
      );
      break;
    }

    case 4: {
      // Indonesia — Kebaya (white) + Batik sarong (brown w/ pattern dots)
      const KEBAYA = "#ffffff";
      const KEBAYA_TRIM = "#e5e7eb";
      const BATIK = "#92400e";
      const BATIK_DOT = "#fef3c7";
      content = (
        <>
          {/* Hair with bun */}
          <rect x="9.5"  y="1"   width="3"   height="2.5" fill={HAIR_BLACK} />
          <rect x="6"    y="3"   width="10"  height="3"   fill={HAIR_BLACK} />
          <rect x="5.5"  y="4.5" width="2"   height="5"   fill={HAIR_BLACK} />
          <rect x="14.5" y="4.5" width="2"   height="5"   fill={HAIR_BLACK} />
          {/* Face */}
          <rect x="8"    y="5"   width="6"   height="5"   fill={SKIN} />
          {/* Back arm */}
          <rect x="5.5"  y="10.5" width="2"  height="5"   fill={KEBAYA_TRIM} />
          {/* Legs */}
          <g className="worker-leg-b" style={HIP_BACK}>
            <rect x="8"    y="21.5" width="2.5" height="2.5" fill={BATIK} />
            <rect x="7.7"  y="23.5" width="3.1" height="0.7" fill={SHOE} />
          </g>
          <g className="worker-leg-a" style={HIP_FRONT}>
            <rect x="11.5" y="21.5" width="2.5" height="2.5" fill={BATIK} />
            <rect x="11.2" y="23.5" width="3.1" height="0.7" fill={SHOE} />
          </g>
          {/* Kebaya (fitted white blouse) */}
          <rect x="7"    y="10"   width="8"   height="6"   fill={KEBAYA} />
          {/* Lace seam hint */}
          <rect x="10.5" y="11"   width="1"   height="3"   fill={KEBAYA_TRIM} />
          {/* Batik sarong */}
          <polygon points="6,16 16,16 17,22 5,22" fill={BATIK} />
          {/* Batik motif dots */}
          <rect x="7"    y="18"   width="0.7" height="0.7" fill={BATIK_DOT} />
          <rect x="10"   y="19"   width="0.7" height="0.7" fill={BATIK_DOT} />
          <rect x="13"   y="18"   width="0.7" height="0.7" fill={BATIK_DOT} />
          <rect x="15"   y="20"   width="0.7" height="0.7" fill={BATIK_DOT} />
          <rect x="8.5"  y="20.5" width="0.7" height="0.7" fill={BATIK_DOT} />
          {/* Front arm */}
          <g className="worker-arm" style={SHOULDER}>
            <rect x="14.5" y="10.5" width="2"   height="5"   fill={KEBAYA} />
          </g>
        </>
      );
      break;
    }

    case 5: {
      // India — Saree (red + gold pallu, bindi)
      const SAREE = "#dc2626";
      const SAREE_DARK = "#991b1b";
      const GOLD = "#d4af37";
      const SHOE_IND = "#451a03";
      content = (
        <>
          {/* Hair */}
          <rect x="6"    y="2.5" width="10"  height="3"   fill={HAIR_BLACK} />
          <rect x="5"    y="4.5" width="2.5" height="9"   fill={HAIR_BLACK} />
          <rect x="14.5" y="4.5" width="2.5" height="9"   fill={HAIR_BLACK} />
          {/* Face */}
          <rect x="8"    y="5"   width="6"   height="5"   fill={SKIN_DARK} />
          {/* Bindi */}
          <rect x="10.5" y="5.5" width="1"   height="1"   fill={SAREE} />
          {/* Back arm */}
          <rect x="5.5"  y="10.5" width="2"  height="5"   fill={SAREE_DARK} />
          {/* Legs (saree drape — narrow) */}
          <g className="worker-leg-b" style={HIP_BACK}>
            <rect x="8"    y="21.5" width="2.5" height="2.5" fill={SAREE} />
            <rect x="7.7"  y="23.5" width="3.1" height="0.7" fill={SHOE_IND} />
          </g>
          <g className="worker-leg-a" style={HIP_FRONT}>
            <rect x="11.5" y="21.5" width="2.5" height="2.5" fill={SAREE} />
            <rect x="11.2" y="23.5" width="3.1" height="0.7" fill={SHOE_IND} />
          </g>
          {/* Choli (blouse) */}
          <rect x="7"    y="10"   width="8"   height="3.5" fill={SAREE} />
          {/* Midriff strip */}
          <rect x="7"    y="13.5" width="8"   height="1.2" fill={SKIN_DARK} />
          {/* Saree drape */}
          <polygon points="6,14.7 16,14.7 17,22 5,22" fill={SAREE} />
          {/* Gold pallu — diagonal over shoulder */}
          <polygon points="7.5,10 14,11 13,17 9,16" fill={GOLD} />
          {/* Gold hem */}
          <rect x="5.5"  y="21.3" width="11"  height="0.5" fill={GOLD} />
          {/* Front arm */}
          <g className="worker-arm" style={SHOULDER}>
            <rect x="14.5" y="10.5" width="2"   height="5"   fill={SAREE} />
          </g>
        </>
      );
      break;
    }

    default: {
      // Singapore — Business suit (DHC blue blazer, navy skirt, tablet)
      const BLAZER = "#0071ba";
      const BLAZER_DARK = "#005a96";
      const SKIRT = "#003a5c";
      const SHIRT = "#ffffff";
      const TABLET = "#1a1a22";
      const SCREEN = "#cbd5e1";
      content = (
        <>
          <rect x="6"    y="2"   width="10"  height="3.5" fill={HAIR_BROWN} />
          <rect x="5"    y="4"   width="2.5" height="9"   fill={HAIR_BROWN} />
          <rect x="14.5" y="4"   width="2.5" height="9"   fill={HAIR_BROWN} />
          <rect x="8"    y="5"   width="6"   height="5"   fill={SKIN} />
          <rect x="5.5"  y="10.5" width="2"  height="5"   fill={BLAZER_DARK} />
          <g className="worker-leg-b" style={HIP_BACK}>
            <rect x="8"    y="21"   width="2.5" height="3"   fill={SKIRT} />
            <rect x="7.7"  y="23.5" width="3.1" height="0.7" fill={SHOE} />
          </g>
          <g className="worker-leg-a" style={HIP_FRONT}>
            <rect x="11.5" y="21"   width="2.5" height="3"   fill={SKIRT} />
            <rect x="11.2" y="23.5" width="3.1" height="0.7" fill={SHOE} />
          </g>
          <rect x="7"    y="10"   width="8"   height="5"   fill={BLAZER} />
          <rect x="9.5"  y="10"   width="3"   height="2"   fill={SHIRT} />
          <polygon points="6,15 16,15 17.5,21 4.5,21" fill={SKIRT} />
          <g className="worker-arm" style={SHOULDER}>
            <rect x="14.5" y="10.5" width="2"   height="5"   fill={BLAZER} />
            <rect x="13"   y="14"   width="4"   height="3"   fill={TABLET} />
            <rect x="13.5" y="14.5" width="3"   height="2"   fill={SCREEN} />
          </g>
        </>
      );
    }
  }

  return (
    <svg width={w} height={size} viewBox="0 0 22 24" shapeRendering="crispEdges">
      {content}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SEAPresenceMap                                                     */
/*  Real-geography map (react-simple-maps + world-atlas topojson).     */
/*  A pixel-art woman walks Singapore -> Malaysia -> Thailand ->       */
/*  Vietnam -> Indonesia -> India and loops, stopping 3s at each       */
/*  capital where a popup card shows the country's website. Users      */
/*  can also click any dot to open / switch the popup.                 */
/* ------------------------------------------------------------------ */

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const HIGHLIGHTED_COUNTRIES = new Set([
  "India", "Singapore", "Malaysia", "Thailand", "Indonesia", "Vietnam",
]);

const DHC_COUNTRIES: {
  name: string;
  flag: string;
  url: string;
  coords: [number, number];
}[] = [
  { name: "Singapore", flag: "🇸🇬", url: "https://www.dhc.com.sg",                                                                       coords: [103.82,  1.35] },
  { name: "Malaysia",  flag: "🇲🇾", url: "https://www.linkedin.com/company/elitez-my/?originalSubdomain=my",                              coords: [101.69,  3.14] },
  { name: "Thailand",  flag: "🇹🇭", url: "https://www.qhunter.co.th/ENG/home.html",                                                       coords: [100.50, 13.75] },
  { name: "Vietnam",   flag: "🇻🇳", url: "https://www.linkedin.com/company/elitez-asia-vi%E1%BB%87t-nam/?originalSubdomain=vn",            coords: [105.85, 21.03] },
  { name: "Indonesia", flag: "🇮🇩", url: "https://www.elitez.asia/indonesia/",                                                            coords: [106.85, -6.21] },
  { name: "India",     flag: "🇮🇳", url: "https://elitez.in/",                                                                            coords: [ 77.20, 28.61] },
];

const MAP_WIDTH  = 500;
const MAP_HEIGHT = 500;
const MAP_SCALE  = 560;
const MAP_CENTER: [number, number] = [95, 11];
const WAIT_MS = 3000;
const WALK_MS = 2000;

function SEAPresenceMap() {
  // Popup currently shown (auto from walker, or manual from click).
  const [activePopup, setActivePopup] = useState<number | null>(0);
  // Country costume the walker is currently wearing.
  // Updates whenever she arrives at a country (i.e. activePopup goes
  // null → number); keeps the previous costume during a walk segment.
  const [costumeIdx, setCostumeIdx] = useState(0);

  // Imperative walker — avoids re-rendering Geographies 60×/s.
  const walkerRef     = useRef<SVGGElement>(null);
  const lastFacingRef = useRef<1 | -1>(1);
  const lastPopupRef  = useRef<number | null>(0);

  // Sync the costume whenever the active popup lands on a country.
  useEffect(() => {
    if (
      activePopup !== null &&
      activePopup >= 0 &&
      activePopup < DHC_COUNTRIES.length
    ) {
      setCostumeIdx(activePopup);
    }
  }, [activePopup]);

  // Project each capital once to SVG pixel coordinates.
  // Defensive: wrap in try/catch + finite-number checks; never let a
  // bad projection result return an undefined x/y.
  const dotPositions = useMemo(() => {
    try {
      const projection = geoMercator()
        .scale(MAP_SCALE)
        .center(MAP_CENTER)
        .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
      return DHC_COUNTRIES.map((c) => {
        const projected = projection(c.coords);
        const x =
          projected && Number.isFinite(projected[0])
            ? projected[0]
            : MAP_WIDTH / 2;
        const y =
          projected && Number.isFinite(projected[1])
            ? projected[1]
            : MAP_HEIGHT / 2;
        return { ...c, x, y };
      });
    } catch (err) {
      if (typeof console !== "undefined") {
        console.warn("[SEAPresenceMap] projection failed:", err);
      }
      // Safe fallback so downstream code can still iterate
      return DHC_COUNTRIES.map((c, i) => ({
        ...c,
        x: 60 + i * 70,
        y: MAP_HEIGHT / 2,
      }));
    }
  }, []);

  // Animation loop — drives walker transform + auto popup.
  // Delay first frame 500ms so all projection / layout work has settled,
  // and wrap each tick in try/catch + coordinate null-checks to make
  // it impossible to throw "Cannot read 'x' of undefined" at runtime.
  useEffect(() => {
    if (!dotPositions || dotPositions.length === 0) return;

    let rafId = 0;
    const segLen = WAIT_MS + WALK_MS;
    const cycle = DHC_COUNTRIES.length * segLen;
    let startTime = 0;

    const tick = (now: number) => {
      try {
        if (startTime === 0) startTime = now;
        const elapsed = (now - startTime) % cycle;
        const segIdx = Math.floor(elapsed / segLen);
        const segT = elapsed % segLen;
        const from = dotPositions[segIdx];
        const to = dotPositions[(segIdx + 1) % dotPositions.length];

        // Silently skip the frame if either endpoint is missing or
        // has non-numeric coords — we'll try again next frame.
        if (
          !from ||
          !to ||
          typeof from.x !== "number" ||
          typeof from.y !== "number" ||
          typeof to.x !== "number" ||
          typeof to.y !== "number"
        ) {
          rafId = requestAnimationFrame(tick);
          return;
        }

        let x: number, y: number, facing: 1 | -1;
        let newPopup: number | null;
        if (segT < WAIT_MS) {
          x = from.x;
          y = from.y;
          facing = lastFacingRef.current;
          newPopup = segIdx;
        } else {
          const t = (segT - WAIT_MS) / WALK_MS;
          x = from.x + (to.x - from.x) * t;
          y = from.y + (to.y - from.y) * t;
          facing = to.x >= from.x ? 1 : -1;
          lastFacingRef.current = facing;
          newPopup = null;
        }

        if (walkerRef.current) {
          walkerRef.current.setAttribute(
            "transform",
            `translate(${x},${y}) scale(${facing},1)`
          );
        }

        if (newPopup !== lastPopupRef.current) {
          lastPopupRef.current = newPopup;
          setActivePopup(newPopup);
        }
      } catch {
        /* Swallow per-frame errors — animation continues on next tick. */
      }
      rafId = requestAnimationFrame(tick);
    };

    // 500ms safety delay so map projection / layout has fully settled.
    const startDelay = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, 500);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(rafId);
    };
  }, [dotPositions]);

  const openPopup = (i: number) => {
    if (i < 0 || i >= dotPositions.length) return;
    lastPopupRef.current = i;
    setActivePopup(i);
  };

  // Cached, safe reference for the popup card render.
  const popupDot =
    activePopup !== null &&
    activePopup >= 0 &&
    activePopup < dotPositions.length
      ? dotPositions[activePopup]
      : null;

  return (
    <div className="w-full">
      {/* Instruction hint — static tour-guide woman with a flag */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <span
          className="static-walker shrink-0 leading-none"
          aria-hidden="true"
        >
          <WalkingWomanSprite size={20} />
        </span>
        <p className="text-base font-medium text-[#475569]">
          🚩 Tap any country to meet our team there
        </p>
      </div>

      {/* Map card */}
      <div
        className="rounded-xl bg-white p-3 shadow-[0_4px_24px_rgba(2,8,23,0.05)]"
        role="img"
        aria-label="DHC office locations across India and Southeast Asia"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: MAP_SCALE, center: MAP_CENTER }}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(
                (geo: { rsmKey: string; properties: { name?: string } }) => {
                  const isHighlighted = HIGHLIGHTED_COUNTRIES.has(
                    geo.properties.name ?? ""
                  );
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHighlighted ? "#DBEAFE" : "#F1F5F9"}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover:   { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                }
              )
            }
          </Geographies>

          {/* Dotted travel path — the loop she walks */}
          <g pointerEvents="none">
            {dotPositions.map((p, i) => {
              const next = dotPositions[(i + 1) % dotPositions.length];
              return (
                <line
                  key={`path-${i}`}
                  x1={p.x}
                  y1={p.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="#0071ba"
                  strokeOpacity={0.35}
                  strokeWidth={1}
                  strokeDasharray="3 4"
                />
              );
            })}
          </g>

          {/* Country dots — clickable */}
          {dotPositions.map((c, i) => (
            <g
              key={c.name}
              className="country-dot"
              onClick={() => openPopup(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPopup(i);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Show DHC ${c.name} office details`}
            >
              <circle cx={c.x} cy={c.y} r={16} fill="transparent" />
              <circle
                cx={c.x}
                cy={c.y}
                r={6}
                fill="#0071ba"
                opacity={0.45}
                className="city-pulse"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <circle cx={c.x} cy={c.y} r={5} fill="#0071ba" />
              <circle cx={c.x} cy={c.y} r={1.8} fill="#ffffff" opacity={0.95} />
            </g>
          ))}

          {/* Walking woman — transform set imperatively in the RAF loop.
              Costume (variant) swaps when she arrives at a country dot. */}
          <g ref={walkerRef} style={{ pointerEvents: "none" }}>
            {/* +30% sprite — translate offset adjusted to keep feet on the dot */}
            <g transform="translate(-9,-29)">
              <WalkingWomanSprite size={26} variant={costumeIdx} />
            </g>
          </g>

          {/* Popup card — fades in to the side of the dot so it never
              covers the walking lady or the dot itself. */}
          {popupDot &&
            (() => {
              const CARD_W = 180;        // max card width
              const FO_W = 200;          // foreignObject width (card + arrow + shadow padding)
              const FO_H = 80;           // foreignObject height
              const GAP = 12;            // gap between dot edge and card edge
              const PAD = 10;            // padding inside FO for arrow + shadow
              // Prefer right placement; flip left if no room on the right.
              const placeRight =
                popupDot.x + GAP + CARD_W + PAD <= MAP_WIDTH;
              const fx = placeRight
                ? popupDot.x + GAP - PAD
                : popupDot.x - GAP - CARD_W - PAD;
              const fy = Math.max(
                0,
                Math.min(MAP_HEIGHT - FO_H, popupDot.y - FO_H / 2)
              );

              return (
                <foreignObject
                  key={activePopup}
                  x={fx}
                  y={fy}
                  width={FO_W}
                  height={FO_H}
                >
                  <div
                    style={{
                      width: `${FO_W}px`,
                      height: `${FO_H}px`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: placeRight ? "flex-start" : "flex-end",
                      paddingLeft: placeRight ? `${PAD}px` : 0,
                      paddingRight: placeRight ? 0 : `${PAD}px`,
                    }}
                  >
                    <div
                      className={`popup-card ${
                        placeRight ? "arrow-left" : "arrow-right"
                      } rounded-lg bg-white px-3 py-2 shadow-[0_8px_20px_rgba(2,8,23,0.18)]`}
                      style={{ maxWidth: `${CARD_W}px` }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">
                          {popupDot.flag}
                        </span>
                        <span className="text-base font-semibold text-[#020817]">
                          {popupDot.name}
                        </span>
                      </div>
                      <a
                        href={popupDot.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-[#0071ba] hover:underline"
                      >
                        Visit Website →
                      </a>
                    </div>
                  </div>
                </foreignObject>
              );
            })()}
        </ComposableMap>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#020817]">
      {/* ============================ HERO =========================== */}
      <section className="relative bg-gradient-to-b from-white to-[#F0F4F8] px-6 pb-24 pt-16 md:pt-20">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Headline — typewriter */}
          <h1 className="hero-reveal flex min-h-[2.6em] items-center justify-center font-sans text-3xl font-bold leading-[1.08] tracking-tight text-[#020817] sm:text-4xl md:min-h-[2.2em] md:text-5xl lg:text-6xl">
            <span className="sr-only">
              Your next career move starts here — Dynamic Human Capital,
              Singapore&apos;s leading recruitment partner
            </span>
            <span aria-hidden="true">
              <Typewriter />
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="hero-reveal mt-6 max-w-[560px] text-lg font-normal leading-relaxed tracking-wide text-[#6B7280]"
            style={{ animationDelay: "0.3s" }}
          >
            Singapore&apos;s leading recruitment partner since 2012, with 6
            countries across Southeast Asia.
          </p>

          {/* CTA buttons */}
          <div
            className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href={JOBS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-button group flex items-center justify-center gap-2 rounded-xl bg-[#0071ba] px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-xl hover:shadow-[#0071ba]/30"
            >
              Find a Job
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={HIRE_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-xl border-2 border-[#0071ba] bg-white px-8 py-3.5 text-sm font-bold text-[#0071ba] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0071ba]/5 hover:shadow-lg hover:shadow-[#0071ba]/15"
            >
              Hire Talent
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Bento stat cards */}
          <div
            className="hero-reveal mt-16 grid w-full grid-cols-2 gap-4 md:grid-cols-4"
            style={{ animationDelay: "0.3s" }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="stat-card rounded-xl border border-[#E6E9F2] bg-white p-6 text-left shadow-[0_4px_24px_rgba(2,8,23,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071ba]/40 hover:shadow-[0_16px_40px_rgba(2,8,23,0.10)]"
              >
                <div className="text-3xl font-extrabold tracking-tight text-[#0071ba] md:text-4xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#5b6478]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= LIVE JOB TICKER ====================== */}
      <section
        className="border-y border-[#E6E9F2] bg-white"
        aria-labelledby="live-roles-heading"
      >
        <h2 id="live-roles-heading" className="sr-only">
          Latest job openings
        </h2>
        <div className="flex items-stretch">
          {/* Label */}
          <div className="flex shrink-0 items-center gap-2.5 border-r border-[#E6E9F2] bg-[#F7F8FC] px-5 sm:px-6">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-extrabold uppercase tracking-[0.14em] text-[#020817]">
                Live Roles
              </span>
              <span className="hidden text-[10px] font-medium text-[#5b6478] sm:block">
                Now hiring
              </span>
            </span>
          </div>

          {/* Scrolling roles */}
          <div className="marquee-group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_96%,transparent)]">
            <div className="flex w-max animate-marquee py-3.5">
              {[...JOB_TICKER, ...JOB_TICKER].map((j, i) => (
                <a
                  key={i}
                  href={JOBS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-3 inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#E6E9F2] bg-white px-4 py-1.5 transition-colors duration-200 hover:border-[#0071ba]/50 hover:bg-[#0071ba]/5"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]" aria-hidden="true" />
                  <span className="text-sm font-bold text-[#020817]">
                    {j.role}
                  </span>
                  <span className="text-sm font-bold text-[#0071ba]">
                    {j.salary}/mo
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* View all */}
          <a
            href={JOBS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1.5 border-l border-[#E6E9F2] bg-[#F7F8FC] px-6 text-xs font-bold uppercase tracking-[0.12em] text-[#0071ba] transition-colors hover:bg-[#0071ba]/5 sm:flex"
          >
            All Jobs
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ====================== SEA PRESENCE MAP ====================== */}
      <section
        className="bg-[#F0F4F8] py-20 md:py-24"
        aria-labelledby="presence-heading"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-[3fr_2fr] md:gap-14">
            {/* Map */}
            <div className="relative">
              <MapErrorBoundary>
                <SEAPresenceMap />
              </MapErrorBoundary>
            </div>

            {/* Copy */}
            <div>
              <span className="text-base font-semibold uppercase tracking-widest text-[#0071ba]">
                Our Footprint
              </span>
              <h2
                id="presence-heading"
                className="mt-4 font-sans text-4xl font-bold text-[#020817]"
              >
                Delivering Exceptional Talent Across Asia Pacific
              </h2>
              <p className="mt-6 max-w-[540px] text-lg leading-relaxed text-[#6B7280]">
                6 countries. Decades of expertise. One trusted recruitment
                partner across Southeast Asia and beyond.
              </p>

              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {[
                  { name: "Singapore", flag: "🇸🇬" },
                  { name: "Malaysia",  flag: "🇲🇾" },
                  { name: "Thailand",  flag: "🇹🇭" },
                  { name: "Indonesia", flag: "🇮🇩" },
                  { name: "Vietnam",   flag: "🇻🇳" },
                  { name: "India",     flag: "🇮🇳" },
                ].map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center gap-2.5 text-base font-medium text-[#020817]"
                  >
                    <span className="text-base leading-none" aria-hidden="true">
                      {c.flag}
                    </span>
                    {c.name}
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-base text-[#5b6478]">
                DHC is proudly part of the{" "}
                <a
                  href="https://www.elitez.asia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0071ba] hover:underline"
                >
                  Elitez Group of Companies
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= TWO JOURNEYS ========================= */}
      <section
        className="bg-[#F7F8FC] py-20 md:py-24"
        aria-labelledby="journeys-heading"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center md:mb-14">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-[#0071ba]">
              Who We Serve
            </span>
            <h2
              id="journeys-heading"
              className="font-sans text-3xl font-bold text-[#020817] md:text-5xl"
            >
              Two Journeys. One Partner.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* For Candidates */}
            <article className="group overflow-hidden rounded-xl border border-[#E6E9F2] bg-white shadow-[0_4px_24px_rgba(2,8,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071ba]/40 hover:shadow-[0_16px_40px_rgba(2,8,23,0.10)]">
              <div className="relative h-56 overflow-hidden md:h-64">
                <Image
                  src="/hero4.png"
                  alt="Candidates exploring career opportunities with DHC"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/40 bg-white/85 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0071ba] backdrop-blur">
                  For Candidates
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-sans text-2xl font-bold text-[#020817]">
                  Find Your Dream Job
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5b6478] md:text-base">
                  Explore thousands of roles across Singapore and SEA. From
                  fresh grad to C-suite — your next move starts here.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={JOBS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center justify-between rounded-xl bg-[#0071ba] px-5 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-lg hover:shadow-[#0071ba]/25"
                  >
                    <span>Search MyCareersFuture</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </a>
                  <a
                    href={JOBSTREET_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center justify-between rounded-xl border border-[#020817]/10 bg-white px-5 py-3.5 text-sm font-bold text-[#020817] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0071ba] hover:text-[#0071ba]"
                  >
                    <span>Browse JobStreet</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </article>

            {/* For Employers */}
            <article className="group overflow-hidden rounded-xl border border-[#E6E9F2] bg-white shadow-[0_4px_24px_rgba(2,8,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071ba]/40 hover:shadow-[0_16px_40px_rgba(2,8,23,0.10)]">
              <div className="relative h-56 overflow-hidden md:h-64">
                <Image
                  src="/hero3.png"
                  alt="Employers building their dream team with DHC"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/40 bg-white/85 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0071ba] backdrop-blur">
                  For Employers
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-sans text-2xl font-bold text-[#020817]">
                  Build Your Dream Team
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5b6478] md:text-base">
                  Access Singapore&apos;s best talent in 72 hours. MOM-licensed.
                  ISO certified. Trusted by 200+ leading companies.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={HIRE_FORM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center justify-between rounded-xl bg-[#0071ba] px-5 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005a96] hover:shadow-lg hover:shadow-[#0071ba]/25"
                  >
                    <span>Talk to a Consultant</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </a>
                  <a
                    href="mailto:career@dhc.com.sg"
                    className="group/btn flex items-center justify-between rounded-xl border border-[#020817]/10 bg-white px-5 py-3.5 text-sm font-bold text-[#020817] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0071ba] hover:text-[#0071ba]"
                  >
                    <span>career@dhc.com.sg</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
