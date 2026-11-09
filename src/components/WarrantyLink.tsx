import { ReactNode } from "react";
import { SITE } from "../data/site";
import { warrantyUrl } from "../lib/utils";

/** Opens (or downloads) the authentic DeckRite RV warranty PDF embedded in the build. */
export default function WarrantyLink({ children, className = "", download = false }: { children: ReactNode; className?: string; download?: boolean }) {
  return (
    <a
      href={warrantyUrl()}
      target="_blank"
      rel="noopener"
      download={download ? SITE.warranty.fileName : undefined}
      title={`DeckRite RV ${SITE.warranty.title} (${SITE.warranty.meta})`}
      className={className}
    >
      {children}
    </a>
  );
}
