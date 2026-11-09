import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, CornersOut, Drop, FileText, Footprints, Headset, MagnifyingGlassPlus,
  Ruler, ShieldCheck, Stack, SunHorizon, Swatches, Tire,
} from "@phosphor-icons/react";
import * as A from "../assets/images";
import { Btn, Reveal, SplitText } from "../components/anim";
import CtaSection from "../components/CtaSection";
import { useHeroCrowding } from "../lib/useHeroCrowding";
import { contactLink } from "../data/site";
import { useDocumentTitle } from "../lib/utils";

const IMG = {
  hero: A.heroDesktop,
  heroSm: A.heroMobile,
  interior: A.appInterior,
  garage: A.appGarage,
  deck: A.appDeck,
};
const ease = [0.22, 1, 0.36, 1] as const;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { hideHint, hidePanel } = useHeroCrowding(ref, contentRef, hintRef, panelRef);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="relative min-h-[max(100svh,680px)] overflow-hidden bg-ink">
      <motion.div style={{ scale }} className="absolute inset-0">
        <motion.picture initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.6, ease }} className="block h-full w-full">
          <source media="(max-width: 767px)" srcSet={IMG.heroSm} />
          <img src={IMG.hero} alt="DeckRite ULTRA woven PVC installed in a luxury RV interior" className="h-full w-full object-cover" />
        </motion.picture>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      <div className="grain absolute inset-0" />

      <motion.div ref={contentRef} style={{ y, opacity: op }} className="relative mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-center px-6 pt-36 md:pt-48 lg:pt-56 md:pb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/70">
          <span className="h-px w-10 bg-brand" /> Rugged, Functional RV Flooring
        </motion.div>
        <h1 className="max-w-4xl text-5xl font-extrabold leading-none tracking-tight text-white sm:text-7xl lg:text-[6.2rem]">
          <SplitText text="RV Flooring." delay={0.7} /><br />
          <SplitText text="Rugged by Nature." delay={0.9} className="text-white/90" /><br />
          <SplitText text="Refined by Design." delay={1.1} className="italic font-serif font-normal text-brand-light" />
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 max-w-lg text-lg leading-relaxed text-white/70">
          From feet-friendly woven PVC for interiors to durable Shield RV and DeckRite Plank for garages, ramps and decks.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <Btn {...contactLink("retailer")}>Find a Retailer</Btn><Btn variant="ghost" scrollTo="spaces">Explore Products</Btn>
        </motion.div>
      </motion.div>

      <motion.div ref={panelRef} style={{ visibility: hidePanel ? "hidden" : "visible" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-0 right-0 hidden border-l border-t border-white/10 bg-ink/60 backdrop-blur-md md:flex">
        {[["3", "RV flooring families"], ["8", "ULTRA woven patterns"], ["2", "ULTRA backing options"]].map(([n, l]) => (
          <div key={l} className="border-r border-white/10 px-8 py-6 last:border-0">
            <div className="text-3xl font-bold text-white">{n}</div><div className="mt-1 text-xs uppercase tracking-wider text-white/50">{l}</div>
          </div>
        ))}
      </motion.div>
      <div ref={hintRef} style={{ visibility: hideHint ? "hidden" : "visible" }} className="absolute bottom-8 left-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50 md:left-1/2 md:-translate-x-1/2">
        <div className="relative h-10 w-px overflow-hidden bg-white/20"><motion.span animate={{ y: [-40, 40] }} transition={{ repeat: Infinity, duration: 1.6 }} className="absolute h-4 w-px bg-brand" /></div>Scroll
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["ULTRA Woven PVC", "DeckRite Plank", "Shield RV", "Diamond Plate", "Raised Coin", "Ramp / Deck", "Toy Hauler Garages"];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-paper py-6">
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-2xl font-bold uppercase tracking-tight text-ink/80 md:text-4xl">
            {t}<span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const spaces = [
  { n: "01", title: "RV Interiors", link: "Explore ULTRA Woven PVC", to: "/application/interiors", img: IMG.interior, pos: "40% 50%", desc: "ULTRA woven PVC brings luxurious patterns, feet-friendly comfort and a touch of elegance to RV living spaces." },
  { n: "02", title: "Toy Hauler Garages", link: "Explore Shield RV", to: "/application/sport-utility", img: IMG.garage, pos: "52% 40%", desc: "Shield RV is engineered for tougher environments, including toy hauler garages, enclosed and cargo trailers, and small and micro campers." },
  { n: "03", title: "Ramps & Patio Decks", link: "Explore DeckRite Plank", to: "/application/ramp-deck", img: IMG.deck, pos: "42% 55%", desc: "DeckRite Plank pairs a realistic wood look with slip resistance and durability for ramps, exterior decks and toy hauler garages." },
];

function Spaces() {
  const [active, setActive] = useState(0);
  return (
    <section id="spaces" className="bg-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-7 grid items-end gap-5 md:mb-8 md:grid-cols-2">
          <div>
            <Reveal><p className="mb-4 text-xs uppercase tracking-[0.35em] text-brand">— Applications</p></Reveal>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
              <SplitText text="The right flooring" /><br /><SplitText text="for every space." delay={0.2} className="font-serif italic font-normal" />
            </h2>
          </div>
          <Reveal delay={0.2}><p className="max-w-md text-ink/60 md:ml-auto">DeckRite RV offers flooring options for living areas, toy hauler garages, enclosed trailers, ramps and exterior decks.</p></Reveal>
        </div>
        <div className="flex h-auto flex-col gap-3 md:h-[580px] md:flex-row">
          {spaces.map((s, i) => (
            <motion.div key={s.title} onMouseEnter={() => setActive(i)} layout
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: i * 0.12 }}
              className={`group relative h-[420px] overflow-hidden md:h-full transition-[flex] duration-700 ease-out ${active === i ? "md:flex-[2.4]" : "md:flex-1"}`}>
              <Link to={s.to} className="absolute inset-0 z-10" aria-label={s.title} />
              <img src={s.img} alt={s.title} style={{ objectPosition: s.pos }} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute left-6 top-6 font-mono text-sm text-white/70">{s.n} / 03</div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-2xl font-bold text-white md:text-3xl">{s.title}</h3>
                <div className={`grid transition-all duration-700 ${active === i ? "md:grid-rows-[1fr] md:opacity-100" : "md:grid-rows-[0fr] md:opacity-0"}`}>
                  <p className="overflow-hidden pt-3 text-white/70 max-w-md">{s.desc}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-brand-light pb-1 text-sm font-semibold text-brand-light">{s.link} →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const products = [
  {
    name: "Tan Jute", code: "ULTRA WOVEN", zone: "DeckRite ULTRA Woven PVC", img: A.swTanJuteHd, thumb: A.swTanJuteThumb, tint: "#a8957c",
    desc: "DeckRite ULTRA woven PVC pairs luxurious patterns with feet-friendly comfort for RV interiors. Choose 5 mm foam backing or ULTRA-FB with 80 g non-woven polyester backing.",
    specs: [
      { icon: Stack, label: "Construction", value: "Woven PVC" },
      { icon: Drop, label: "Backing options", value: "5 mm / 80 g" },
      { icon: Swatches, label: "Colors & patterns", value: "8 options" },
    ],
    to: "/application/interiors",
  },
  {
    name: "Gray Plank", code: "DECKRITE PLANK", zone: "DeckRite Plank", img: A.swGrayPlankHd, thumb: A.swGrayPlankThumb, tint: "#8a8578",
    desc: "A realistic wood-look surface for toy hauler ramps and exterior decks, with slip resistance and durability. Available in Gray or Brown, its 80 mil virgin PVC is laminated to an 80 g non-woven polyester backing.",
    specs: [
      { icon: Ruler, label: "Thickness", value: "80 mil" },
      { icon: SunHorizon, label: "Best for", value: "Ramp & deck" },
      { icon: Footprints, label: "Surface", value: "Slip resistant" },
    ],
    to: "/application/ramp-deck",
  },
  {
    name: "Raised Black Coin", code: "SHIELD RV", zone: "Shield RV · Raised Coin", img: A.swRaisedBlackCoinHd, thumb: A.swRaisedBlackCoinThumb, tint: "#26272a",
    desc: "Shield RV is engineered for toy hauler garages, enclosed and cargo trailers, and small or micro campers. Choose Diamond, Speckled Diamond or Raised Coin embossing. Virgin PVC with polymeric plasticizers provides long-term flexibility; non-woven polyester backing adds dimensional stability.",
    specs: [
      { icon: Ruler, label: "Diamond / coin", value: "3 mm / 2.15 mm" },
      { icon: Tire, label: "Applications", value: "Garages & trailers" },
      { icon: ShieldCheck, label: "Construction", value: "Virgin PVC" },
    ],
    to: "/application/sport-utility",
  },
];

function Products() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const p = products[active];
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
  };
  return (
    <section className="relative overflow-hidden bg-ink py-14 text-white md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(60% 50% at 75% 40%, ${p.tint}33, transparent 70%)`, transition: "background 0.8s" }} />
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-7 grid items-end gap-5 md:mb-8 md:grid-cols-2">
          <div>
            <Reveal><p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-brand-light"><Swatches size={18} weight="duotone" /> Design & Color Options</p></Reveal>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight md:text-[3.25rem]">
              <SplitText text="See the texture." /><br /><SplitText text="Find your finish." delay={0.2} className="font-serif italic font-normal text-brand-light" />
            </h2>
          </div>
          <Reveal delay={0.2}><p className="max-w-md text-white/60 md:ml-auto">Explore ULTRA woven PVC, DeckRite Plank and Shield RV surfaces, each designed for a different part of your RV.</p></Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
          <Reveal>
            <div
              onMouseMove={move}
              onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
              className="group relative aspect-[16/9] w-full cursor-crosshair overflow-hidden bg-black ring-1 ring-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)]"
            >
              <AnimatePresence mode="popLayout">
                <motion.div key={p.code} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }} className="absolute inset-0">
                  <img
                    src={p.img}
                    alt={`${p.name} — ${p.zone} flooring sample`}
                    draggable={false}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                    style={{ transform: `scale(${zoom.on ? 2.6 : 1})`, transformOrigin: `${zoom.x}% ${zoom.y}%`, transition: "transform 0.45s cubic-bezier(.22,1,.36,1)" }}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50" />
              {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "left-4 bottom-4 border-l border-b", "right-4 bottom-4 border-r border-b"].map((c) => (
                <span key={c} className={`pointer-events-none absolute h-6 w-6 border-white/50 ${c}`} />
              ))}
              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.25em] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-light" /> {p.code}
              </div>
              <div className={`pointer-events-none absolute right-5 top-5 flex items-center gap-2 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.25em] backdrop-blur-md transition-opacity duration-300 ${zoom.on ? "opacity-100" : "opacity-0"}`}>
                <MagnifyingGlassPlus size={14} weight="duotone" /> 2.6× Detail
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
              <motion.div key={p.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }}>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                  <Stack size={16} weight="duotone" className="text-brand-light" /> {p.zone}
                </div>
                <h3 className="mt-2 text-3xl font-bold md:text-4xl">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">{p.desc}</p>
                <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden bg-white/10">
                  {p.specs.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }} className="bg-ink p-3 md:p-4">
                      <s.icon size={22} weight="duotone" className="text-brand-light" />
                      <div className="mt-2 text-xs font-semibold md:text-sm">{s.value}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-wider text-white/40">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link to={p.to} className="group relative inline-flex items-center gap-3 overflow-hidden bg-brand px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white">
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">View Color Options</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link {...contactLink("retailer")} className="group inline-flex items-center gap-2 px-2 py-4 text-sm font-semibold uppercase tracking-wide text-white/80 hover:text-white">
                Find a retailer <ArrowUpRight size={18} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 md:gap-5 lg:w-[calc((100%-2.5rem)*1.45/2.45)]">
          {products.map((t, i) => (
            <Reveal key={t.code} delay={i * 0.08}>
              <button onClick={() => setActive(i)} className={`group relative block w-full text-left transition ${active === i ? "" : "opacity-60 hover:opacity-100"}`}>
                <div className="relative aspect-[21/9] overflow-hidden ring-1 ring-white/10">
                  <img src={t.thumb} alt={`${t.name} swatch`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-125" />
                  {active === i && <motion.span layoutId="thumbRing" className="absolute inset-0 ring-2 ring-inset ring-brand-light" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="hidden text-[11px] uppercase tracking-wider text-white/40 sm:block">{t.zone}</div>
                  </div>
                  <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                </div>
                <div className="mt-2 h-px w-full bg-white/10">
                  {active === i && <motion.div layoutId="thumbBar" className="h-px bg-brand-light" />}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
const Icon = {
  design: <Swatches size={30} weight="duotone" />,
  doc: <FileText size={30} weight="duotone" />,
  chat: <Headset size={30} weight="duotone" />,
};

function Lineup() {
  const items = [
    { icon: Icon.design, t: "Design & Color Options", d: "Choose ULTRA woven patterns, Shield RV embossing designs, or DeckRite Plank in Gray or Brown.", l: "Explore Colors", to: "/application/interiors" },
    { icon: Icon.doc, t: "Product Construction", d: "Compare ULTRA foam and polyester backings with the durable vinyl construction of Shield RV and DeckRite Plank.", l: "View Product Details", to: "/application/sport-utility" },
    { icon: Icon.chat, t: "FAQs & Warranty", d: "Find answers about maintenance, installation and applications, plus DeckRite RV warranty information.", l: "Explore FAQs & Warranty", to: "/faqs" },
  ];
  return (
    <section className="bg-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
            <SplitText text="Rugged. Functional." /><br /><SplitText text="Made for RVs." delay={0.2} className="font-serif italic font-normal" />
          </h2>
          <Reveal><p className="max-w-sm text-ink/60">DeckRite RV products combine practical performance with comfort and contemporary style for a range of RV applications.</p></Reveal>
        </div>
        <div className="grid border-t border-ink/10 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.12}>
              <Link to={it.to} className="group relative block h-full overflow-hidden border-b border-ink/10 p-10 md:border-b-0 md:border-r md:last:border-r-0">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out group-hover:scale-y-100" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/10 to-brand/0 text-brand ring-1 ring-brand/20 transition duration-500 group-hover:rotate-[-6deg] group-hover:from-brand group-hover:to-brand-dark group-hover:text-white group-hover:ring-brand">{it.icon}</div>
                    <span className="font-mono text-sm text-ink/30 group-hover:text-white/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 text-2xl font-bold text-ink transition group-hover:text-white">{it.t}</h3>
                  <p className="mt-3 text-ink/60 transition group-hover:text-white/60">{it.d}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand group-hover:text-brand-light">{it.l}<span className="transition-transform group-hover:translate-x-2">→</span></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useDocumentTitle("DeckRite RV | Vinyl Flooring for RV Interiors, Garages & Decks");
  return (
    <>
      <Hero /><Marquee /><Spaces /><Products /><Lineup /><CtaSection action={{ label: "Send us a message", ...contactLink("retailer") }} />
    </>
  );
}
