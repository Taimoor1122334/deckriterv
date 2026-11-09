DeckRite RV - image & document assets
=====================================
Regenerate everything with:
    npm i -D sharp && node scripts/gen-images.mjs
The script downloads any missing source into /tmp/dl from its SOURCES
manifest, so it works on a fresh machine.

Outputs
  src/assets/images/index.ts  - every image as a base64 data URI
  src/assets/docs/warranty.ts - the warranty PDF as base64
Assets are embedded because the build is a single index.html
(vite-plugin-singlefile); separate files in /public are not served.

Authentic client assets (deckriterv.com)
  img/header/*-slider-1920.jpg -> home hero, application cards, banners
                                  (right half only; left half has baked-in titles)
  img/swatches/*.jpg (all 17)  -> sw-*-thumb (grids) + sw-*-hd (zoom viewer)
  files/DeckRite_RV_Warranty.pdf -> warranty view/download (2-Year Limited Warranty)

Sister brand (deckrite.com)
  who-hero, who-deck

Stock photography (Pexels) where the live site has no suitable photo
  page-*-hero, life-*         application pages
  who-marine, who-rv, who-craft  Who We Are
  faq-hero, faq-install, faq-mop FAQs (owner portrait; utility knife +
                                 straight edge; mopping a kitchen floor)

When moving to conventional hosting, serve the PDF at its original path
(/files/DeckRite_RV_Warranty.pdf) and swap the data URIs for real files.
