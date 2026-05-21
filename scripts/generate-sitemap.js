/**
 * Dynamic Sitemap Generator for worldcuphacks.com
 *
 * Reads route data from source files (not hardcoded).
 * Usage: node scripts/generate-sitemap.js
 * Output: dist/public/sitemap.xml + dist/public/robots.txt
 */

import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://worldcuphacks.com";
const SRC = path.resolve(import.meta.dirname, "..", "client", "src");

// ═══════════════════════════════════════════════════════════════
// 1. Extract player slugs from PlayerProfile.tsx
// ═══════════════════════════════════════════════════════════════

function extractPlayerSlugs() {
  const playerFile = path.join(SRC, "pages", "PlayerProfile.tsx");
  if (!fs.existsSync(playerFile)) {
    console.warn("⚠️  PlayerProfile.tsx not found, using fallback slugs");
    return [
      "guillermo-ochoa", "edson-alvarez", "santiago-gimenez",
      "ronwen-williams", "percy-tau",
    ];
  }

  const content = fs.readFileSync(playerFile, "utf-8");
  const slugRegex = /slug:\s*"([^"]+)"/g;
  const slugs = [];
  let match;

  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }

  if (slugs.length === 0) {
    console.warn("⚠️  No slugs found in PlayerProfile.tsx, using fallback");
    return [
      "guillermo-ochoa", "edson-alvarez", "santiago-gimenez",
      "ronwen-williams", "percy-tau",
    ];
  }

  return [...new Set(slugs)]; // deduplicate
}

// ═══════════════════════════════════════════════════════════════
// 2. Extract match IDs from MatchDetail.tsx
// ═══════════════════════════════════════════════════════════════

function extractMatchSlugs() {
  const matchFile = path.join(SRC, "pages", "MatchDetail.tsx");
  if (!fs.existsSync(matchFile)) {
    console.warn("⚠️  MatchDetail.tsx not found, using fallback");
    return ["mex-vs-rsa", "usa-vs-bra", "fra-vs-ger", "arg-vs-eng"];
  }

  const content = fs.readFileSync(matchFile, "utf-8");
  const slugRegex = /"([a-z]+-vs-[a-z]+)"/gi;
  const slugs = [];
  let match;

  while ((match = slugRegex.exec(content)) !== null) {
    const slug = match[1].toLowerCase();
    if (!slugs.includes(slug)) slugs.push(slug);
  }

  if (slugs.length === 0) {
    return ["mex-vs-rsa", "usa-vs-bra", "fra-vs-ger", "arg-vs-eng"];
  }

  return slugs;
}

// ═══════════════════════════════════════════════════════════════
// 3. Extract route paths from App.tsx
// ═══════════════════════════════════════════════════════════════

function extractStaticRoutes() {
  const appFile = path.join(SRC, "App.tsx");
  if (!fs.existsSync(appFile)) {
    return [
      { path: "/", changefreq: "hourly", priority: "1.0" },
      { path: "/matches", changefreq: "hourly", priority: "0.9" },
      { path: "/ai-predictor", changefreq: "daily", priority: "0.8" },
    ];
  }

  const content = fs.readFileSync(appFile, "utf-8");
  const pathRegex = /path="([^"]+)"/g;
  const routes = [];
  let match;

  while ((match = pathRegex.exec(content)) !== null) {
    const p = match[1];
    // Skip dynamic routes (they're handled separately)
    if (p.includes(":") || p === "/404" || p === "*") continue;

    // Assign priority based on path depth
    const isHome = p === "/";
    const isMatchOrPlayers = p.startsWith("/match") || p.startsWith("/players");
    const isMainPage = ["/matches", "/ai-predictor", "/golden-boot"].includes(p);
    const isInfoPage = ["/about", "/shipping", "/privacy"].includes(p);

    routes.push({
      path: p,
      changefreq: isHome ? "hourly" : isMatchOrPlayers ? "hourly" : isMainPage ? "daily" : isInfoPage ? "monthly" : "weekly",
      priority: isHome ? "1.0" : isMainPage ? "0.8" : isInfoPage ? "0.3" : "0.6",
    });
  }

  return routes.length > 0 ? routes : [
    { path: "/", changefreq: "hourly", priority: "1.0" },
    { path: "/matches", changefreq: "hourly", priority: "0.9" },
  ];
}

// ═══════════════════════════════════════════════════════════════
// 4. Generate XML
// ═══════════════════════════════════════════════════════════════

function urlEntry(loc, changefreq = "daily", priority = "0.7") {
  const lastmod = new Date().toISOString().split("T")[0];
  return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`;
}

// ── Execute ──────────────────────────────────────────────────
console.log("🔍 Scanning source files for routes...\n");

const playerSlugs = extractPlayerSlugs();
console.log(`  👤 Players found: ${playerSlugs.length}`);
playerSlugs.forEach(s => console.log(`     /players/${s}`));

const matchSlugs = extractMatchSlugs();
console.log(`  ⚽ Matches found: ${matchSlugs.length}`);
matchSlugs.forEach(s => console.log(`     /match/${s}`));

const staticRoutes = extractStaticRoutes();
console.log(`  📄 Static pages found: ${staticRoutes.length}`);

// Build URL list
const urls = [];

staticRoutes.forEach(r => urls.push(urlEntry(r.path, r.changefreq, r.priority)));
playerSlugs.forEach(slug => urls.push(urlEntry(`/players/${slug}`, "daily", "0.8")));
matchSlugs.forEach(slug => urls.push(urlEntry(`/match/${slug}`, "hourly", "0.9")));

const totalPages = urls.length;
const playerCount = playerSlugs.length;
const matchCount = matchSlugs.length;
const staticCount = staticRoutes.length;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

// ── Write output ──────────────────────────────────────────────
const outDir = path.resolve(import.meta.dirname, "..", "dist", "public");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf-8");

const robots = `User-agent: *
Allow: /
Disallow: /api/
Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(outDir, "robots.txt"), robots, "utf-8");

// ── Audit log ─────────────────────────────────────────────────
console.log(`\n${"═".repeat(50)}`);
console.log(`📊 SITEMAP AUDIT`);
console.log(`${"═".repeat(50)}`);
console.log(`  📄 Static pages:  ${staticCount}`);
console.log(`  👤 Player pages:  ${playerCount} (indexed for Google)`);
console.log(`  ⚽ Match pages:   ${matchCount}`);
console.log(`  ─────────────────────────`);
console.log(`  📍 Total URLs:    ${totalPages}`);
console.log(`\n✅ dist/public/sitemap.xml  (${Buffer.byteLength(sitemap, "utf-8").toLocaleString()} bytes)`);
console.log(`✅ dist/public/robots.txt`);
console.log(`\n🔗 Submit: ${BASE_URL}/sitemap.xml → Google Search Console`);
