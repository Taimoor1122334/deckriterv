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
const CACHE = "/tmp/dl";
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
  // authentic client imagery - deckriterv.com
  "interiors-slider-1920.jpg": `${DRV}/img/header/interiors-slider-1920.jpg`,
  "sport-slider-1920.jpg": `${DRV}/img/header/sport-slider-1920.jpg`,
  "ramp-slider-1920.jpg": `${DRV}/img/header/ramp-slider-1920.jpg`,
  ...Object.fromEntries(SWATCHES.map((s) => [`${s}.jpg`, `${DRV}/img/swatches/${s}.jpg`])),
  "DeckRite_RV_Warranty.pdf": `${DRV}/files/DeckRite_RV_Warranty.pdf`,
  // sister brand - deckrite.com
  "dr-hero_image.png": "https://deckrite.com/wp-content/uploads/2026/10/hero_image.png",
  "dr-second-section-image.png": "https://deckrite.com/wp-content/themes/deckrite/assets/images/second-section-image.png",
  // stock photography - Pexels
  "quad-trailer.jpg": pexels(9331870),
  "caravan-deck.jpg": pexels(7163689),
  "rv-kitchen.jpg": pexels(7163683),
  "rv-bikes.jpg": pexels(35418212),
  "couple-rv.jpg": pexels(13304737),
  "rv-interior-lights.jpg": pexels(16746356),
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
  let p = sharp(path.join(CACHE, srcFile));
  if (opts.extract) p = p.extract(opts.extract);
  if (opts.resize) p = p.resize(opts.resize[0], opts.resize[1], { kernel: "lanczos3", fit: "cover" });
  if (opts.sharpen) p = p.sharpen(opts.sharpen);
  const buf = await p.jpeg({ quality: opts.q ?? 70, progressive: true, chromaSubsampling: opts.sub ?? "4:2:0" }).toBuffer();
  exports_.push(`export const ${camel(outName)} = "data:image/jpeg;base64,${buf.toString("base64")}";`);
  console.log(outName.padEnd(36), (buf.length / 1024).toFixed(0) + " KB");
}

// Home + banners: right half of the 1920x567 sliders (left half has baked-in titles)
const slider = (f, ex, rs, name, q = 70) => emit(f, name, { extract: ex, resize: rs, sharpen: { sigma: 0.7 }, q });
await slider("interiors-slider-1920.jpg", { left: 1000, top: 0, width: 920, height: 567 }, [1400, 863], "hero-desktop");
await slider("interiors-slider-1920.jpg", { left: 1010, top: 0, width: 330, height: 567 }, [460, 793], "hero-mobile", 72);
await slider("interiors-slider-1920.jpg", { left: 990, top: 0, width: 930, height: 567 }, [1000, 612], "app-interior");
await slider("sport-slider-1920.jpg", { left: 990, top: 0, width: 930, height: 567 }, [1000, 612], "app-garage");
await slider("ramp-slider-1920.jpg", { left: 990, top: 0, width: 930, height: 567 }, [1000, 612], "app-deck");
await slider("sport-slider-1920.jpg", { left: 960, top: 0, width: 960, height: 567 }, [1240, 730], "banner-sport", 66);
await slider("ramp-slider-1920.jpg", { left: 960, top: 0, width: 960, height: 567 }, [1240, 730], "banner-ramp", 66);
await slider("interiors-slider-1920.jpg", { left: 960, top: 0, width: 960, height: 567 }, [1240, 730], "banner-interiors", 66);

// Application pages - stock heroes / lifestyle
const photo = (f, name, q = 64, w = 1200) => emit(f, name, { resize: [w, null], q });
await photo("quad-trailer.jpg", "page-sport-hero");
await photo("caravan-deck.jpg", "page-ramp-hero");
await photo("rv-kitchen.jpg", "page-interiors-hero");
await photo("rv-bikes.jpg", "life-sport");
await photo("couple-rv.jpg", "life-ramp");
await photo("rv-interior-lights.jpg", "life-interiors");

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

// Authentic swatches: thumb for grids, sharpened upscale for the zoom viewer
for (const s of SWATCHES) {
  await emit(`${s}.jpg`, `sw-${s}-thumb`, { resize: [300, 300], q: 76, sub: "4:4:4" });
  await emit(`${s}.jpg`, `sw-${s}-hd`, { resize: [820, 820], sharpen: { sigma: 1.0, m1: 0.7, m2: 1.5 }, q: 64, sub: "4:4:4" });
}

fs.writeFileSync(path.join(OUT, "index.ts"), `/* AUTO-GENERATED by scripts/gen-images.mjs - do not edit by hand.
   Sources: deckriterv.com (sliders + swatches), deckrite.com (who-we-are imagery),
   Pexels stock (page heroes / lifestyle / FAQ visuals). See SOURCES in the script. */
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
