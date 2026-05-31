import type { MetadataRoute } from "next";

// Next 14 reads this file at build time and writes out/robots.txt as a real
// static file. Previously /robots.txt 404'd into the SPA fallback and served
// a 200 + 25KB of homepage HTML carrying conflicting <meta name="robots">
// tags (see CSO orchestra report 2026-05-31, finding H3).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://dhc.com.sg/sitemap.xml",
    host: "https://dhc.com.sg",
  };
}
