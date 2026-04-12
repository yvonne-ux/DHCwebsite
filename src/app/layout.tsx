import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dynamic Human Capital | Connecting Talents, Driving Dreams",
  description: "Singapore's MOM-licensed recruitment partner. 72-hour shortlist. ISO certified. CPF Registered. TAFEP Compliant.",
  openGraph: {
    title: "Dynamic Human Capital | Connecting Talents, Driving Dreams",
    description: "Singapore's MOM-licensed recruitment partner. 72-hour shortlist. ISO certified. CPF Registered. TAFEP Compliant.",
    url: "https://dhc.com.sg",
    siteName: "Dynamic Human Capital",
    images: [
      {
        url: "https://dhc.com.sg/hero2.png",
        width: 1200,
        height: 630,
        alt: "Dynamic Human Capital",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic Human Capital | Connecting Talents, Driving Dreams",
    description: "Singapore's MOM-licensed recruitment partner. 72-hour shortlist. ISO certified. CPF Registered. TAFEP Compliant.",
    images: ["https://dhc.com.sg/hero2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
