const logoPng = new URL("../assets/deckrite-rv-logo.png", import.meta.url).href;

/**
 * DeckRite RV wordmark. Lettering is white on a transparent background, so it
 * sits directly on the dark navbar and footer. The inline variant is used on
 * the light warranty card, so it keeps a dark plate.
 */
const VARIANTS = {
  nav: { wrap: "", img: "h-14 sm:h-16 lg:h-20" },
  footer: { wrap: "", img: "h-20 md:h-28" },
  inline: { wrap: "bg-ink px-3 py-1.5", img: "h-8" },
} as const;

export default function Logo({ variant = "nav", className = "" }: { variant?: keyof typeof VARIANTS; className?: string }) {
  const v = VARIANTS[variant];
  return (
    <span className={`inline-flex items-center ${v.wrap} ${className}`}>
      <img src={logoPng} alt="DeckRite RV" width={2172} height={724} draggable={false} className={`block w-auto select-none ${v.img}`} />
    </span>
  );
}
