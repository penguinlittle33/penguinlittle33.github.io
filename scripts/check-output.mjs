import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadSiteData } from "./content.mjs";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "dist");
const entries = loadSiteData(root).entries.filter(entry => entry.status === "published");
const files = [];
function walk(folder) { for (const item of fs.readdirSync(folder, { withFileTypes: true })) { const file = path.join(folder, item.name); if (item.isDirectory()) walk(file); else files.push(file); } }
walk(output);
const pages = files.filter(file => file.endsWith(".html"));
assert.equal(pages.length, 2 * (5 + entries.length) + 1, "Unexpected number of bilingual pages");
assert.ok(fs.existsSync(path.join(output, ".nojekyll")), "Missing .nojekyll");
let links = 0;
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const data = /<script id="page-data" type="application\/json">([\s\S]*?)<\/script>/.exec(html);
  assert.ok(data, "Page data missing: " + page);
  const props = JSON.parse(data[1]);
  assert.equal(props.data.entries.length, entries.length);
  assert.ok(props.data.entries.every(entry => entry.status === "published"), "Draft included in page data");
  for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]*)"/g)) {
    const value = match[1].replace(/&amp;/g, "&");
    if (!value || value.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(value) || value.startsWith("//")) continue;
    assert.ok(!value.startsWith("/"), "Internal URL must be relative: " + value);
    const file = path.resolve(path.dirname(page), decodeURIComponent(value.split(/[?#]/)[0]));
    assert.ok(file === output || file.startsWith(output + path.sep), "Link escapes output: " + value);
    assert.ok(fs.existsSync(file), "Missing resource: " + page + " -> " + value);
    links++;
  }
}
for (const entry of entries) for (const lang of ["zh", "en"]) assert.ok(fs.existsSync(path.join(output, lang === "en" ? "en" : "", "post", entry.id, "index.html")));
console.log(JSON.stringify({ pages: pages.length, publishedEntries: entries.length, internalResourcesChecked: links, result: "passed" }));
