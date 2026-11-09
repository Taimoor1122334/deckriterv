import { useEffect } from "react";
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

let warrantyBlobUrl: string | null = null;
/** Lazily turns the embedded warranty PDF into a blob: URL (created once per session). */
export function warrantyUrl() {
  if (warrantyBlobUrl) return warrantyBlobUrl;
  const bin = atob(WARRANTY_PDF_B64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  warrantyBlobUrl = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
  return warrantyBlobUrl;
}
