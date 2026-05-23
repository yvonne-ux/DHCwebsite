import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import ScamBanner from "./_components/ScamBanner";

const FOOTER_NAV = [
  { label: "About",         href: "/about" },
  { label: "Services",      href: "/services" },
  { label: "Jobs",          href: "/jobs" },
  { label: "MOM Resources", href: "/mom-resources" },
  { label: "Contact",       href: "/contact" },
];

const LINKEDIN_URL =
  "https://www.linkedin.com/company/dynamic-human-capital-pte-ltd/";

function SiteFooter() {
  return (
    <footer>
      {/* ---- Main footer (white) ---- */}
      <div className="border-t border-[#EAEDF3] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand + description + social */}
            <div className="md:col-span-2">
              <Image
                src="/dhc-logo.png"
                alt="Dynamic Human Capital"
                width={130}
                height={44}
                className="h-9 w-auto object-contain"
              />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5b6478]">
                Dynamic Human Capital — Singapore&apos;s MOM-licensed
                recruitment partner since 2012. Part of the Elitez Group of
                Companies.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dynamic Human Capital on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EAEDF3] text-[#5b6478] transition-colors hover:border-[#0071ba] hover:text-[#0071ba]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Company nav */}
            <div>
              <h3 className="font-sans text-sm font-semibold text-[#020817]">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_NAV.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#5b6478] transition-colors hover:text-[#0071ba]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact (single email each, no duplicates) */}
            <div>
              <h3 className="font-sans text-sm font-semibold text-[#020817]">
                Contact
              </h3>
              <div className="mt-4 space-y-2 text-sm text-[#5b6478]">
                <p>2 Kallang Avenue, CT Hub</p>
                <p>#03-08, Singapore 339407</p>
                <a
                  href="mailto:career@dhc.com.sg"
                  className="block transition-colors hover:text-[#0071ba]"
                >
                  career@dhc.com.sg
                </a>
                <a
                  href="mailto:info@dhc.com.sg"
                  className="block transition-colors hover:text-[#0071ba]"
                >
                  info@dhc.com.sg
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Bottom bar (very light grey) ---- */}
      <div className="border-t border-[#EAEDF3] bg-[#F7F8FC]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-sm text-[#5b6478] md:flex-row">
          <p>© 2026 Dynamic Human Capital Pte Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#0071ba]"
            >
              Privacy Policy (PDPA)
            </Link>
            <span className="text-[#cbd5e1]" aria-hidden="true">|</span>
            <span>EA License: 12C6253</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SITE_URL = "https://dhc.com.sg";
const OG_IMAGE = "https://dhc.com.sg/og-image.png";
// Long description — kept for general meta and structured data.
const DESCRIPTION =
  "Singapore's MOM-licensed recruitment partner since 2012. 72-hour shortlist, ISO certified, CPF registered and TAFEP compliant. Permanent, contract, payroll and Employer of Record solutions across Southeast Asia.";
// Short description tuned for share previews (WhatsApp, Telegram, LinkedIn).
const OG_DESCRIPTION =
  "Singapore's MOM-licensed recruitment partner since 2012. Permanent, contract and executive search across Southeast Asia.";
const OG_TITLE = "Dynamic Human Capital | Singapore Recruitment Agency";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dynamic Human Capital | Connecting Talents, Driving Dreams",
    template: "%s | Dynamic Human Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "recruitment agency Singapore",
    "MOM licensed recruitment",
    "staffing agency Singapore",
    "payroll outsourcing Singapore",
    "executive search",
    "contract staffing",
    "Employer of Record SEA",
    "Dynamic Human Capital",
  ],
  authors: [{ name: "Dynamic Human Capital Pte Ltd" }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "Dynamic Human Capital",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Dynamic Human Capital — Singapore's MOM-licensed recruitment partner",
        type: "image/png",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
  verification: {
    google: "Eiac3MaOtpxD-nRhyQmDBlkixc5vBhA7O1_CGgLLY10",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dynamic Human Capital",
    legalName: "Dynamic Human Capital Pte Ltd",
    url: SITE_URL,
    logo: `${SITE_URL}/dhc-logo.png`,
    image: OG_IMAGE,
    description: DESCRIPTION,
    slogan: "Connecting Talents, Driving Dreams",
    foundingDate: "2012",
    email: "career@dhc.com.sg",
    telephone: "+65-6050-0777",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Kallang Avenue, CT Hub, #03-08",
      addressLocality: "Singapore",
      postalCode: "339407",
      addressCountry: "SG",
    },
    areaServed: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam"],
    parentOrganization: {
      "@type": "Organization",
      name: "Elitez Group",
      url: "https://elitez.asia",
    },
    sameAs: ["https://elitez.asia"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dynamic Human Capital",
    url: SITE_URL,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
        />
        <ScamBanner />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
