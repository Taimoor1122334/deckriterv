import { useEffect } from "react";
import { CARE_PDF_B64 } from "../assets/docs/care";
import { PLANK_SPEC_B64, SHIELD_SPEC_B64 } from "../assets/docs/spec-sheets";
import { WARRANTY_PDF_B64 } from "../assets/docs/warranty";

/** Smooth-scroll to a section on the current page. Plain "#id" links can't be
 *  used: the app runs on a HashRouter, which would treat them as routes. */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function pdfBlobUrl(b64: string) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
}

let warrantyBlobUrl: string | null = null;
/** Lazily turns the embedded warranty PDF into a blob: URL (created once per session). */
export function warrantyUrl() {
  if (!warrantyBlobUrl) warrantyBlobUrl = pdfBlobUrl(WARRANTY_PDF_B64);
  return warrantyBlobUrl;
}

export type SpecSheetId = "shield" | "plank";

const SPEC_B64: Record<SpecSheetId, string> = { shield: SHIELD_SPEC_B64, plank: PLANK_SPEC_B64 };
const specBlobUrls: Partial<Record<SpecSheetId, string>> = {};

/** Lazily turns an embedded product spec sheet into a blob: URL. */
export function specSheetUrl(id: SpecSheetId) {
  if (!specBlobUrls[id]) specBlobUrls[id] = pdfBlobUrl(SPEC_B64[id]);
  return specBlobUrls[id]!;
}

let careBlobUrl: string | null = null;
/** Lazily turns the embedded Shield RV care sheet into a blob: URL. */
export function careUrl() {
  if (!careBlobUrl) careBlobUrl = pdfBlobUrl(CARE_PDF_B64);
  return careBlobUrl;
}
