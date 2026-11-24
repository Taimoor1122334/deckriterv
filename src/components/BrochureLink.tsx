import { ReactNode } from "react";
import { brochureUrl } from "../lib/utils";

export const BROCHURE = {
  title: "DeckRite RV brochure",
  fileName: "DeckRite-RV-Brochure.pdf",
};

/** Opens the embedded DeckRite RV brochure. */
export default function BrochureLink({ children, className = "", download = false }: { children: ReactNode; className?: string; download?: boolean }) {
  return (
    <a
      href={brochureUrl()}
      target="_blank"
      rel="noopener"
      download={download ? BROCHURE.fileName : undefined}
      title={`${BROCHURE.title} (PDF)`}
      className={className}
    >
      {children}
    </a>
  );
}
