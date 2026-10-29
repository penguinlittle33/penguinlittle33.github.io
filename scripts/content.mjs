import fs from "node:fs";
import path from "node:path";

const kinds = ["work", "reading", "journal"];
const nodeTypes = ["text", "p", "h2", "h3", "blockquote", "ul", "ol", "li", "strong", "em", "u", "br", "a", "img"];
function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { throw new Error(file + ": " + error.message); }
}
function bilingual(value, label) {
  if (!value || typeof value.zh !== "string" || typeof value.en !== "string") throw new Error(label + " needs zh and en text fields");
  return value;
}
function richNode(node, label) {
  if (!node || !nodeTypes.includes(node.type)) throw new Error(label + ": unknown text block type");
  if (node.type === "img" && (typeof node.src !== "string" || !node.src)) throw new Error(label + ": image src is required");
  if (node.text !== undefined && typeof node.text !== "string") throw new Error(label + ": text must be a string");
  const result = { ...node };
  if (node.children !== undefined) {
    if (!Array.isArray(node.children)) throw new Error(label + ": children must be an array");
    result.children = node.children.map((child, index) => richNode(child, label + ".children[" + index + "]"));
  } else if (typeof node.text === "string" && node.type !== "text") {
    result.children = [{ type: "text", text: node.text }];
    delete result.text;
  }
  return result;
}
function entryOf(entry, label) {
  if (!entry || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id || "")) throw new Error(label + ": id must use lowercase words separated by hyphens");
  if (!kinds.includes(entry.kind)) throw new Error(label + ": kind must be work, reading or journal");
  if (!["published", "draft"].includes(entry.status)) throw new Error(label + ": status must be published or draft");
  const date = typeof entry.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(entry.date) ? new Date(entry.date + "T00:00:00Z") : null;
  if (!date || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== entry.date) throw new Error(label + ": use a valid date such as 2026-10-29");
  const title = bilingual(entry.title, label + ".title");
  if (!title.zh && !title.en) throw new Error(label + ": a title is required");
  const body = {};
  for (const lang of ["zh", "en"]) {
    const blocks = entry.body?.[lang] ?? [];
    if (!Array.isArray(blocks)) throw new Error(label + ".body." + lang + " must be an array");
    body[lang] = blocks.map((node, index) => richNode(node, label + ".body." + lang + "[" + index + "]"));
  }
  return { period: "", cover: "", book: "", bookAuthor: "", ...entry, title, summary: bilingual(entry.summary ?? { zh: "", en: "" }, label + ".summary"), category: bilingual(entry.category ?? { zh: "", en: "" }, label + ".category"), body };
}
function checkMedia(root, value, label) {
  if (!value || /^https?:\/\//.test(value)) return;
  if (!value.startsWith("/") || value.startsWith("//")) throw new Error(label + ": use an image path starting with / or an https URL");
  const publicRoot = path.join(root, "public");
  const file = path.resolve(publicRoot, value.slice(1));
  if (!file.startsWith(publicRoot + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) throw new Error(label + ": image file not found: " + value);
}
export function loadSiteData(root, fallback) {
  const siteFile = path.join(root, "content", "site.json");
  const source = fs.existsSync(siteFile) ? readJson(siteFile) : fallback;
  if (!source?.profile || !Array.isArray(source.entries)) throw new Error("content/site.json needs profile and entries");
  bilingual(source.profile.intro, "profile.intro");
  const entries = source.entries.map((entry, index) => entryOf(entry, "content/site.json entries[" + index + "]"));
  const postDir = path.join(root, "content", "posts");
  if (fs.existsSync(postDir)) for (const name of fs.readdirSync(postDir).filter(name => name.endsWith(".json")).sort()) entries.push(entryOf(readJson(path.join(postDir, name)), "content/posts/" + name));
  const ids = new Set();
  for (const entry of entries) {
    if (ids.has(entry.id)) throw new Error("Duplicate article id: " + entry.id);
    ids.add(entry.id);
    if (entry.status !== "published") continue;
    checkMedia(root, entry.cover, entry.id + " cover");
    const walk = nodes => { for (const node of nodes) { if (node.type === "img") checkMedia(root, node.src, entry.id); if (node.children) walk(node.children); } };
    walk(entry.body.zh); walk(entry.body.en);
  }
  checkMedia(root, source.profile.photo, "profile photo");
  return { profile: source.profile, entries };
}
