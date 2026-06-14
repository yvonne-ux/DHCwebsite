import type { MetadataRoute } from "next";

const SITE_URL = "https://dhc.com.sg";

// Next 14 writes out/sitemap.xml at build time. Mirrors the SiteNav + footer
// route map. Update when adding a new app/<route>/page.tsx.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/",                priority: 1.0, changeFrequency: "weekly"  },
    { path: "/about",           priority: 0.8, changeFrequency: "monthly" },
    { path: "/services",        priority: 0.9, changeFrequency: "monthly" },
    { path: "/jobs",            priority: 0.9, changeFrequency: "daily"   },
    { path: "/hire-talent",     priority: 0.9, changeFrequency: "monthly" },
    { path: "/mom-resources",   priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact",         priority: 0.7, changeFrequency: "yearly"  },
    { path: "/scam-warning",    priority: 0.6, changeFrequency: "yearly"  },
    { path: "/privacy-policy",  priority: 0.4, changeFrequency: "yearly"  },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
