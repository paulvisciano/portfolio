#!/usr/bin/env node
/**
 * Generates sitemap.xml from the homepage + every blog/*.html file.
 * Run locally: node scripts/generate-sitemap.js
 * Or let the GitHub Action run it on push.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "blog");
const OUT = path.join(ROOT, "sitemap.xml");
const BASE = "https://paulvisciano.com";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function listBlogSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".html"))
    .map((f) => f.replace(/\.html$/, ""))
    .sort();
}

function entry(loc, priority, changefreq) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const urls = [entry(`${BASE}/`, "1.0", "weekly")];

for (const slug of listBlogSlugs()) {
  urls.push(entry(`${BASE}/blog/${slug}`, "0.8", "monthly"));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

fs.writeFileSync(OUT, xml, "utf8");
console.log(`Wrote ${OUT} (${urls.length} URLs)`);
