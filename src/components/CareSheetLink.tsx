import { ReactNode } from "react";
import { careUrl } from "../lib/utils";

export const CARE_SHEET = {
  title: "Shield RV care and maintenance",
  fileName: "DeckRite-RV-Shield-Care-and-Maintenance.pdf",
};

/** Opens the embedded Shield RV cleaning, care and maintenance sheet. */
export default function CareSheetLink({ children, className = "", download = false }: { children: ReactNode; className?: string; download?: boolean }) {
  return (
    <a
      href={careUrl()}
      target="_blank"
      rel="noopener"
      download={download ? CARE_SHEET.fileName : undefined}
      title={`${CARE_SHEET.title} (PDF)`}
      className={className}
    >
      {children}
    </a>
  );
}
