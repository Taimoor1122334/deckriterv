import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Broom, Boat, Drop, Footprints, House, ShieldCheck, Tree } from "@phosphor-icons/react";
import * as A from "../assets/images";
import { Btn, Eyebrow, Reveal, SplitText, ease } from "../components/anim";
import CtaSection from "../components/CtaSection";
import { useDocumentTitle } from "../lib/utils";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="relative min-h-[max(92svh,620px)] overflow-hidden bg-ink">
      <motion.div style={{ scale }} className="absolute inset-0">
        <motion.img initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.6, ease }}
          src={A.whoHero} alt="Elevated waterproof DeckRite deck above a covered living space" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <div className="grain absolute inset-0" />
      <motion.div style={{ y, opacity: op }} className="relative mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-center px-6 pt-36 md:pt-48 lg:pt-56 md:pb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/70">
          <span className="h-px w-10 bg-brand" /> Who We Are
        </motion.div>
        <h1 className="max-w-4xl text-5xl font-extrabold leading-none tracking-tight text-white sm:text-7xl lg:text-[5.8rem]">
          <SplitText text="One vinyl." delay={0.6} /><br />
          <SplitText text="Decks, boats" delay={0.8} className="text-white/90" /><br />
          <SplitText text="& RVs." delay={1.0} className="italic font-serif font-normal text-brand-light" />
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
          DeckRite LLC is a foremost supplier of vinyl flooring to the decking, marine and recreational vehicle industries.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <Btn scrollTo="story">Our story</Btn>
          <Btn variant="ghost" scrollTo="markets">Our markets</Btn>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stats() {
  const stats = [
    ["1970s", "Proven performance"],
    ["20M+", "Sq. ft. installed across North America"],
    ["100%", "Waterproof protection + walking surface"],
    ["102\"", "Wide rolls — no seaming in any RV"],
  ];
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {stats.map(([n, l], i) => (
          <Reveal key={l} delay={i * 0.08}>
            <div className={`border-white/10 p-8 md:p-10 ${i > 0 ? "border-l max-lg:[&:nth-child(3)]:border-l-0" : ""} max-lg:border-t lg:border-t-0 lg:border-l lg:first:border-l-0`}>
              <div className="text-4xl font-extrabold tracking-tight text-brand-light md:text-5xl">{n}</div>
              <div className="mt-3 text-xs uppercase tracking-wider text-white/50">{l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  return (
    <section id="story" className="overflow-hidden bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative order-2 lg:order-1">
          <motion.div style={{ y }} className="relative aspect-[4/3] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)]">
            <img src={A.whoDeck} alt="Second-story waterproof vinyl deck with outdoor furniture" className="h-full w-full object-cover" />
          </motion.div>
          <Reveal delay={0.3} className="absolute -bottom-8 -right-2 max-w-xs bg-ink p-7 text-white shadow-2xl md:-right-8">
            <p className="font-serif text-2xl italic leading-snug text-brand-light">“One surface. Two jobs.”</p>
            <p className="mt-3 text-xs uppercase tracking-widest text-white/50">A finished deck above. Waterproof protection below.</p>
          </Reveal>
        </div>
        <div className="order-1 lg:order-2">
          <Eyebrow>Our story</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
            <SplitText text="Vinyl, perfected" /><br /><SplitText text="since the 1970s." delay={0.2} className="font-serif italic font-normal" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg leading-relaxed text-ink/60">
              DeckRite LLC is a foremost supplier of vinyl flooring products to the single family and multifamily decking markets, the marine industry — including pontoons, fishing and sport boats — and the recreational vehicle industry for towable travel trailers, fifth wheels, sport trailers and toy haulers.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 leading-relaxed text-ink/60">
              DeckRite RV products are engineered to be rugged and functional, and to add a contemporary floor to the coach. We supply original equipment manufacturers for toy hauler garages, ramps, decks and interiors — including coaches built by Winnebago, Airstream and Rich Trailers.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/application/interiors" className="group inline-flex items-center gap-2 border-b border-brand pb-1 text-sm font-semibold text-brand">
                Explore DeckRite RV <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a href="https://deckrite.com" className="group inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-sm font-semibold text-ink/70 hover:text-ink">
                Visit DeckRite.com <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const markets = [
  {
    icon: House, name: "Decking", brand: "DeckRite", img: A.whoDeck,
    desc: "Waterproof exterior vinyl for decks, balconies and porches — a durable walking surface and a complete waterproof membrane in one. Proven since the 1970s in the harshest climates.",
    href: "https://deckrite.com", external: true,
  },
  {
    icon: Boat, name: "Marine", brand: "MariDeck", img: A.whoMarine,
    desc: "Woven and textured vinyl flooring for pontoons, fishing and sport boats — built for life on the water.",
    href: "https://marideck.net", external: true,
  },
  {
    icon: Tree, name: "RV", brand: "DeckRite RV", img: A.whoRv,
    desc: "ULTRA woven PVC, Shield RV and DeckRite Plank, supplied to OEM builders of towable trailers, fifth wheels and toy haulers.",
    href: "/application/interiors", external: false,
  },
];

function Markets() {
  return (
    <section id="markets" className="bg-stone py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Three markets, one material</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
              <SplitText text="Wherever you walk." />
            </h2>
          </div>
          <Reveal><p className="max-w-sm text-ink/60">The same waterproof vinyl technology, engineered for the places you live, play and travel.</p></Reveal>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {markets.map((m, i) => {
            const inner = (
              <>
                <img src={m.img} alt={`${m.brand} — ${m.name}`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md">
                  <m.icon size={24} weight="duotone" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="font-mono text-xs text-white/60">0{i + 1}</div>
                  <h3 className="mt-1 text-3xl font-extrabold text-white">{m.brand}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-brand-light">{m.name}</p>
                  <p className="mt-4 max-h-0 overflow-hidden text-sm leading-relaxed text-white/70 transition-all duration-700 group-hover:max-h-40 [@media(hover:none)]:max-h-40 [@media(hover:none)]:[text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">{m.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 border-b border-brand-light pb-1 text-sm font-semibold text-brand-light">
                    Visit {m.brand} <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </>
            );
            const cls = "group relative block h-[440px] overflow-hidden";
            return (
              <Reveal key={m.brand} delay={i * 0.1}>
                {m.external ? <a href={m.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a> : <Link to={m.href} className={cls}>{inner}</Link>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const values = [
  { icon: Drop, t: "100% Waterproof", d: "A complete waterproof membrane — protection and walking surface in one." },
  { icon: Footprints, t: "Slip Resistant", d: "Sure footing wet or dry, on decks, ramps and garage floors alike." },
  { icon: Broom, t: "Low Maintenance", d: "No annual staining or sealing. A broom or a wet mop — like a kitchen floor." },
  { icon: ShieldCheck, t: "Built to Last", d: "Virgin PVC with polymeric plasticizers for long-term flexibility and performance." },
];

function Craft() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <section className="overflow-hidden bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>How it's made</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
            <SplitText text="Extruded, laminated," /><br /><SplitText text="proven in the field." delay={0.2} className="font-serif italic font-normal" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 leading-relaxed text-ink/60 md:text-lg">
              Our vinyl is extruded as a 3-ply membrane and laminated to foam or non-woven polyester backings — then proven over decades in some of the harshest climates in North America. Unlike a traditional wood deck: no slivers, no exposed nails, no rotting boards, no annual resealing.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="group h-full bg-paper p-6 transition-colors duration-500 hover:bg-ink">
                  <v.icon size={28} weight="duotone" className="text-brand transition group-hover:text-brand-light" />
                  <div className="mt-4 font-bold text-ink transition group-hover:text-white">{v.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60 transition group-hover:text-white/60">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div ref={ref} className="relative">
          <motion.div style={{ y }} className="aspect-[4/3] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)]">
            <img src={A.whoCraft} alt="Rolls of vinyl flooring in the DeckRite production facility" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steps = [
    { year: "1970s", t: "Proven performance", d: "DeckRite vinyl proven in the harshest climates across North America." },
    { year: "20M+ sq. ft.", t: "Installed & counting", d: "Millions of square feet of waterproof surface across decks, boats and RVs." },
    { year: "Three markets", t: "Decks · Marine · RV", d: "One material family serving homeowners, boaters and RV owners." },
    { year: "Today", t: "DeckRite RV", d: "ULTRA, Plank and Shield RV — rugged, functional flooring with contemporary design." },
  ];
  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Eyebrow light>Milestones</Eyebrow>
        <h2 className="mb-16 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-6xl">
          <SplitText text="Decades on the" /><br /><SplitText text="floor." delay={0.2} className="font-serif italic font-normal text-brand-light" />
        </h2>
        <div ref={ref} className="relative">
          <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-white/15 md:left-1/2" />
          <motion.div style={{ height: line }} className="absolute left-[7px] top-2 w-px origin-top bg-brand md:left-1/2" />
          <div className="space-y-12 md:space-y-16">
            {steps.map((s, i) => (
              <Reveal key={s.year} delay={i * 0.05}>
                <div className={`relative flex flex-col gap-3 pl-10 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
                  <span className={`absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-brand bg-ink md:top-2 ${i % 2 ? "md:left-[-8px]" : "md:left-auto md:right-[-8px]"}`} />
                  <div className="text-sm font-mono uppercase tracking-[0.25em] text-brand-light">{s.year}</div>
                  <h3 className="text-2xl font-bold md:text-3xl">{s.t}</h3>
                  <p className="max-w-md text-white/60 max-md:max-w-none md:ml-auto">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WhoWeAre() {
  useDocumentTitle("Who We Are | DeckRite RV");
  return (
    <>
      <Hero /><Stats /><Story /><Markets /><Craft /><Timeline /><CtaSection />
    </>
  );
}
