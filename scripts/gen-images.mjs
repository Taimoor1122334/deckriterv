// Regenerates src/assets/images/index.ts (+ src/assets/docs/warranty.ts).
// Every asset is exported as a data URI because the production build is a
// single index.html (vite-plugin-singlefile) - separate files are not served.
//
// Usage:  npm i -D sharp && node scripts/gen-images.mjs
// Missing sources are downloaded automatically into CACHE from the manifest.
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, "src/assets/images");
const DOCS = path.join(ROOT, "src/assets/docs");
const CACHE = path.join(ROOT, ".cache", "img-src");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(DOCS, { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });

// ---------------------------------------------------------------- sources --
const DRV = "https://deckriterv.com";
const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
const SWATCHES = ["black-diamond", "gray-diamond", "dark-gray-speckled-diamond", "light-gray-speckled-diamond",
  "tan-speckled-diamond", "raised-black-coin", "raised-gray-coin", "gray-jute", "tan-jute", "hempshire",
  "tan-teak", "gray-teak", "colonial", "pillar-grey", "pillar-tan", "brown-plank", "gray-plank"];

const SOURCES = {
  // authentic client swatches - deckriterv.com (color samples, not lifestyle photos)
  ...Object.fromEntries(SWATCHES.map((s) => [`${s}.jpg`, `${DRV}/img/swatches/${s}.jpg`])),
  "DeckRite_RV_Warranty.pdf": `${DRV}/files/DeckRite_RV_Warranty.pdf`,
  // sister brand - deckrite.com
  "dr-hero_image.png": "https://deckrite.com/wp-content/uploads/2026/10/hero_image.png",
  "dr-second-section-image.png": "https://deckrite.com/wp-content/themes/deckrite/assets/images/second-section-image.png",
  // Pexels stock. Wide, current coaches — the old site sliders were tight crops
  // and the sport slider included a person the client asked us to remove.
  "hero-camp.jpg": pexels(17816414),
  "air-deck.jpg": pexels(18764826),
  "air-side.jpg": pexels(39523694),
  "rv-interior.jpg": pexels(16746356),
  "pontoon.jpg": pexels(39242500),
  "yellowstone-rvs.jpg": pexels(29344876),
  "factory-rolls.jpg": pexels(236748),
  "faq-hero.jpg": pexels(7476962),
  "faq-install.jpg": pexels(6653999),
  "faq-mop.jpg": pexels(7641347),
};

for (const [file, url] of Object.entries(SOURCES)) {
  const dest = path.join(CACHE, file);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) continue;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log("downloaded", file);
}

// ---------------------------------------------------------------- encoder --
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const exports_ = [];
async function emit(srcFile, outName, opts) {
  const src = path.join(CACHE, srcFile);
  const meta = await sharp(src).metadata();
  let p = sharp(src);
  if (opts.cropRight) {
    const width = Math.max(1, Math.round(meta.width * (1 - opts.cropRight)));
    p = p.extract({ left: 0, top: 0, width, height: meta.height });
  }
  if (opts.extract) p = p.extract(opts.extract);
  if (opts.resize) p = p.resize(opts.resize[0], opts.resize[1], { kernel: "lanczos3", fit: "cover" });
  if (opts.sharpen) p = p.sharpen(opts.sharpen);
  const buf = await p.jpeg({ quality: opts.q ?? 70, progressive: true, chromaSubsampling: opts.sub ?? "4:2:0" }).toBuffer();
  exports_.push(`export const ${camel(outName)} = "data:image/jpeg;base64,${buf.toString("base64")}";`);
  console.log(outName.padEnd(36), (buf.length / 1024).toFixed(0) + " KB");
}

// Wide frames only. No tight crops, and no coach with a brand the client is not supplying yet.
const photo = (f, name, q = 68, w = 1400) => emit(f, name, { resize: [w, null], q });
await photo("hero-camp.jpg", "hero-desktop", 74, 1800);
await photo("hero-camp.jpg", "hero-mobile", 72, 1100);
await photo("rv-interior.jpg", "app-interior", 70, 1400);
await photo("yellowstone-rvs.jpg", "app-garage", 70, 1400);
await photo("air-deck.jpg", "app-deck", 70, 1400);
await photo("yellowstone-rvs.jpg", "banner-sport", 68, 1400);
await photo("air-side.jpg", "banner-ramp", 68, 1400);
await photo("rv-interior.jpg", "banner-interiors", 68, 1400);

await photo("yellowstone-rvs.jpg", "page-sport-hero", 70, 1600);
await photo("air-side.jpg", "page-ramp-hero", 70, 1600);
await photo("rv-interior.jpg", "page-interiors-hero", 70, 1600);
await photo("hero-camp.jpg", "life-sport", 68, 1400);
await photo("air-deck.jpg", "life-ramp", 68, 1400);
await photo("air-side.jpg", "life-interiors", 68, 1400);

// Who We Are
await emit("dr-hero_image.png", "who-hero", { resize: [1280, null], q: 68 });
await emit("dr-second-section-image.png", "who-deck", { resize: [1120, null], q: 68 });
await photo("pontoon.jpg", "who-marine");
await photo("yellowstone-rvs.jpg", "who-rv");
await photo("factory-rolls.jpg", "who-craft");

// FAQs - hero is cropped portrait (4:5) around the subject for the split layout
await emit("faq-hero.jpg", "faq-hero", { extract: { left: 348, top: 0, width: 854, height: 1068 }, resize: [860, 1075], q: 70 });
await photo("faq-install.jpg", "faq-install", 66, 1000);
await photo("faq-mop.jpg", "faq-mop", 66, 1000);

// Authentic swatches, kept large enough to read as a color sample rather than a tight crop.
for (const s of SWATCHES) {
  await emit(`${s}.jpg`, `sw-${s}-thumb`, { resize: [560, 560], q: 80, sub: "4:4:4" });
  await emit(`${s}.jpg`, `sw-${s}-hd`, { resize: [1200, 1200], sharpen: { sigma: 0.3, m1: 0.4, m2: 0.5 }, q: 74, sub: "4:4:4" });
}

fs.writeFileSync(path.join(OUT, "index.ts"), `/* AUTO-GENERATED by scripts/gen-images.mjs - do not edit by hand.
   Sources: deckriterv.com (swatches), deckrite.com (who-we-are deck imagery),
   Pexels stock (wide RV heroes / lifestyle / FAQ visuals). See SOURCES in the script. */
${exports_.join("\n")}
`);

// Authentic warranty PDF from the live site, embedded for the single-file build
const pdf = fs.readFileSync(path.join(CACHE, "DeckRite_RV_Warranty.pdf"));
if (pdf.subarray(0, 4).toString() !== "%PDF") throw new Error("Warranty file is not a PDF");
fs.writeFileSync(path.join(DOCS, "warranty.ts"), `/* AUTO-GENERATED by scripts/gen-images.mjs.
   Source: ${SOURCES["DeckRite_RV_Warranty.pdf"]} (${pdf.length} bytes) */
export const WARRANTY_PDF_B64 = "${pdf.toString("base64")}";
`);
console.log(`\nWrote index.ts (${exports_.length} images) + warranty.ts (${(pdf.length / 1024).toFixed(0)} KB PDF)`);
