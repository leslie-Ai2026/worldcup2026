/**
 * Automated Sitemap Generator for worldcuphacks.com
 * Runs at build time — generates sitemap.xml with all dynamic routes.
 * Add more slugs here to automatically include them in the sitemap.
 */

import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://worldcuphacks.com";

// ─── Dynamic route data ────────────────────────────────────────

const PLAYER_SLUGS = [
  "guillermo-ochoa",
  "edson-alvarez",
  "santiago-gimenez",
  "ronwen-williams",
  "percy-tau",
  "hirving-lozano",
  "cesar-montes",
  "luis-chavez",
  "teboho-mokoena",
  "sipho-mbule",
  "grant-kekana",
  "evidence-makgopa",
];

const MATCH_SLUGS = [
  "mex-vs-rsa",
  "usa-vs-bra",
  "fra-vs-ger",
  "arg-vs-eng",
  "esp-vs-ned",
  "eng-vs-por",
  "bra-vs-arg",
  "ita-vs-uru",
];

const STATIC_ROUTES = [
  { path: "/", changefreq: "hourly", priority: "1.0" },
  { path: "/matches", changefreq: "hourly", priority: "0.9" },
  { path: "/ai-predictor", changefreq: "daily", priority: "0.8" },
  { path: "/golden-boot", changefreq: "daily", priority: "0.8" },
  { path: "/host-city-guide", changefreq: "weekly", priority: "0.7" },
  { path: "/supporter-kit", changefreq: "weekly", priority: "0.6" },
  { path: "/about", changefreq: "monthly", priority: "0.3" },
  { path: "/shipping", changefreq: "monthly", priority: "0.3" },
  { path: "/privacy", changefreq: "monthly", priority: "0.3" },
];

// ─── Generate XML ──────────────────────────────────────────────

function urlEntry(loc, changefreq = "daily", priority = "0.7") {
  return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>`;
}

const urls = [];

// Static pages
STATIC_ROUTES.forEach(r => urls.push(urlEntry(r.path, r.changefreq, r.priority)));

// Player profiles
PLAYER_SLUGS.forEach(slug => {
  urls.push(urlEntry(`/players/${slug}`, "daily", "0.8"));
});

// Match detail pages
MATCH_SLUGS.forEach(slug => {
  urls.push(urlEntry(`/match/${slug}`, "hourly", "0.9"));
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

// ─── Write to public directory ─────────────────────────────────
const outDir = path.resolve(import.meta.dirname, "..", "dist", "public");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf-8");

console.log(`✅ Sitemap generated: ${urls.length} URLs → dist/public/sitemap.xml`);

// Also write robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(outDir, "robots.txt"), robots, "utf-8");
console.log(`✅ robots.txt generated → dist/public/robots.txt`);
