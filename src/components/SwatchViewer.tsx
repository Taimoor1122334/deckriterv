import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CornersOut, MagnifyingGlassPlus } from "@phosphor-icons/react";
import { Reveal } from "./anim";

export type Swatch = { name: string; group?: string; thumb: string; img: string; tint: string };

// Large color sample + thumbnail rail. Click a thumb to load it; hover the
// sample for a light close-up, without cropping the color into a thin strip.
export default function SwatchViewer({ swatches, thumbsPerRow = 3, wide = false }: { swatches: Swatch[]; thumbsPerRow?: number; wide?: boolean }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const p = swatches[active];
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
      <Reveal>
        <div
          onMouseMove={move}
          onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
          className="group relative aspect-[4/3] min-h-[420px] w-full cursor-crosshair overflow-hidden bg-black ring-1 ring-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] md:min-h-[520px]"
        >
          <AnimatePresence mode="popLayout">
            <motion.div key={p.name} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="absolute inset-0">
              <img
                src={p.img}
                alt={`${p.name} flooring swatch`}
                draggable={false}
                className="absolute inset-0 h-full w-full select-none object-cover"
                style={{ transform: `scale(${zoom.on ? 1.45 : 1})`, transformOrigin: `${zoom.x}% ${zoom.y}%`, transition: "transform 0.45s cubic-bezier(.22,1,.36,1)" }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50" />
          {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "left-4 bottom-4 border-l border-b", "right-4 bottom-4 border-r border-b"].map((c) => (
            <span key={c} className={`pointer-events-none absolute h-6 w-6 border-white/50 ${c}`} />
          ))}
          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" /> {p.group ?? "Swatch"}
          </div>
          <div className={`pointer-events-none absolute right-5 top-5 flex items-center gap-2 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md transition-opacity duration-300 ${zoom.on ? "opacity-100" : "opacity-0"}`}>
            <MagnifyingGlassPlus size={14} weight="duotone" /> Closer detail
          </div>
          <div className={`pointer-events-none absolute inset-x-0 bottom-5 flex justify-center transition-opacity duration-300 ${zoom.on ? "opacity-0" : "opacity-100"}`}>
            <span className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs text-white/80 backdrop-blur-md">
              <CornersOut size={16} weight="duotone" /> Hover to inspect texture
            </span>
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}>
            <div className="text-3xl font-bold text-white md:text-4xl">{p.name}</div>
            {p.group && <div className="mt-2 text-xs uppercase tracking-[0.3em] text-white/40">{p.group}</div>}
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(thumbsPerRow, 2)}, minmax(0,1fr))` }}>
          {swatches.map((t, i) => (
            <button key={t.name} onClick={() => setActive(i)} className={`group relative block text-left transition ${active === i ? "" : "opacity-70 hover:opacity-100"}`}>
              <div className={`relative aspect-[4/3] min-h-[120px] overflow-hidden ring-1 ring-white/10 ${wide ? "" : ""}`}>
                <img src={t.thumb} alt={`${t.name} swatch`} className="absolute inset-0 h-full w-full object-cover" />
                {active === i && <motion.span layoutId="swRing" className="absolute inset-0 ring-2 ring-inset ring-brand-light" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="truncate text-xs font-semibold text-white/80">{t.name}</span>
                {active === i && <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
