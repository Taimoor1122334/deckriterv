import { ReactNode } from "react";
import { specSheetUrl, type SpecSheetId } from "../lib/utils";

export const SPEC_SHEETS: Record<SpecSheetId, { title: string; fileName: string }> = {
  shield: { title: "Shield RV spec sheet", fileName: "DeckRite-RV-Shield-Data-Sheet.pdf" },
  plank: { title: "Plank RV spec sheet", fileName: "DeckRite-Plank-RV-Technical-Data-Sheet.pdf" },
};

/** Opens the embedded Shield RV or Plank RV technical data sheet. */
export default function SpecSheetLink({ id, children, className = "", download = false }: { id: SpecSheetId; children?: ReactNode; className?: string; download?: boolean }) {
  const sheet = SPEC_SHEETS[id];
  return (
    <a
      href={specSheetUrl(id)}
      target="_blank"
      rel="noopener"
      download={download ? sheet.fileName : undefined}
      title={`${sheet.title} (PDF)`}
      className={className}
    >
      {children ?? sheet.title}
    </a>
  );
}
