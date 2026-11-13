// Single source of truth for company details, pulled from deckriterv.com.
export const SITE = {
  brand: "DeckRite RV",
  company: "DeckRite LLC",
  phone: {
    vanity: "888-450-DECK",
    digits: "3325",
    pretty: "(888) 450-3325",
    href: "tel:+18884503325",
  },
  address: { street: "3912 East Progress", city: "North Little Rock", region: "AR", zip: "72114" },
  social: [
    { name: "Facebook", href: "https://www.facebook.com/DeckRiteRV/" },
    { name: "X (Twitter)", href: "https://twitter.com/DeckriteRV/" },
    { name: "Instagram", href: "https://www.instagram.com/deckriterv/" },
  ],
  sister: [
    { name: "DeckRite.com", href: "https://deckrite.com" },
    { name: "MariDeck.net", href: "https://marideck.net" },
  ],
  warranty: {
    title: "2-Year Limited Warranty",
    fileName: "DeckRite_RV_Warranty.pdf",
    meta: "PDF · 64 KB",
    // Original location on the current site (the file itself is embedded in the build).
    liveUrl: "https://deckriterv.com/files/DeckRite_RV_Warranty.pdf",
  },
  // The live site posts to /contact-handler.php and /sidebar-handler.php.
  // Point these at the production handlers before launch - while empty, the
  // forms validate and show their success state without sending (demo mode).
  forms: { contactEndpoint: "", brochureEndpoint: "" },
} as const;

export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.zip}`;
const q = encodeURIComponent(ADDRESS_LINE);
export const MAPS = {
  embed: `https://www.google.com/maps?q=${q}&z=15&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
};

// Key points summarised from the warranty PDF (deckriterv.com/files/DeckRite_RV_Warranty.pdf).
export const WARRANTY_FACTS = [
  "Covers the DeckRite RV membrane against defects for a prorated period of two (2) years from the date of purchase.",
  "Extended to the original retail purchaser, when the membrane is installed to DeckRite RV published specifications, properly maintained and used for its intended purpose.",
  "Owners provide DeckRite with written notice of any defect within fifteen (15) days of discovery.",
  "Other components of the RV, and normal wear and tear such as fading or abrasion, are not covered.",
];

export type ContactTopic = "oem" | "product" | "warranty" | "brochure" | "other";
/** Router target for the contact form, optionally pre-selecting a topic. */
export const contactLink = (topic?: ContactTopic) => ({
  to: topic ? `/contact?topic=${topic}` : "/contact",
  state: { scrollTo: "form" },
});
