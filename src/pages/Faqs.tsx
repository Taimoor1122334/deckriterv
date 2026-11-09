import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, ArrowsHorizontal, BookOpen, Broom, Check, DownloadSimple, Drop, Eye, FilePdf, Knife,
  PaintRoller, Phone, Plus, Ruler,
} from "@phosphor-icons/react";
import * as A from "../assets/images";
import { FAQS, splitVerdict, type Faq } from "../data/faqs";
import { SITE, WARRANTY_FACTS, contactLink } from "../data/site";
import { Btn, Eyebrow, Reveal, SplitText, ease } from "../components/anim";
import CtaSection from "../components/CtaSection";
import WarrantyLink from "../components/WarrantyLink";
import Logo from "../components/Logo";
import { scrollToId, useDocumentTitle } from "../lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ hero -- */
function Hero({ onPick }: { onPick: (i: number) => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink">
      <div className="grain absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-brand/20 blur-[140px]" />
      <div className="relative grid lg:min-h-[100svh] lg:grid-cols-2">
        <motion.div style={{ y: textY }} className="relative z-10 flex flex-col justify-center px-6 pb-14 pt-36 md:pt-48 lg:pb-28 lg:pt-56 lg:pl-[max(1.5rem,calc((100vw_-_80rem)/2_+_1.5rem))] lg:pr-14">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/70">
            <span className="h-px w-10 bg-brand" /> FAQs
          </motion.p>
          <h1 className="text-5xl font-extrabold leading-none tracking-tight text-white sm:text-7xl lg:text-[5.4rem]">
            <SplitText text="Questions?" delay={0.5} /><br />
            <SplitText text="Straight" delay={0.7} className="text-white/90" /><br />
            <SplitText text="answers." delay={0.9} className="font-serif italic font-normal text-brand-light" />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-white/65">
            The questions RV owners ask us most, from choosing a product to cleaning, installing and seaming it.
          </motion.p>
          <motion.ol initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 grid max-w-lg border-t border-white/10 sm:grid-cols-2 sm:gap-x-8">
            {FAQS.map((f, i) => (
              <li key={f.id}>
                <button type="button" onClick={() => onPick(i)} className="group flex w-full items-center justify-between gap-4 border-b border-white/10 py-3.5 text-left">
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-brand-light">{pad(i + 1)}</span>
                    <span className="text-sm font-semibold text-white/75 transition group-hover:text-white">{f.topic}</span>
                  </span>
                  <ArrowRight size={14} weight="bold" className="text-white/30 transition group-hover:translate-x-1 group-hover:text-brand-light" />
                </button>
              </li>
            ))}
          </motion.ol>
        </motion.div>

        <div className="relative h-[68vh] lg:h-auto">
          <motion.div initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ duration: 1.4, ease, delay: 0.2 }} className="absolute inset-0 overflow-hidden">
            <motion.img style={{ scale: imgScale }} src={A.faqHero} alt="A smiling RV owner sitting inside his camper" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-transparent lg:bg-gradient-to-r" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          </motion.div>
          <motion.a href={SITE.phone.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8, ease }}
            className="group absolute bottom-8 left-6 right-6 flex items-center gap-4 border border-white/15 bg-ink/70 p-5 backdrop-blur-xl sm:left-auto sm:right-8 sm:w-80 lg:bottom-12">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white"><Phone size={22} weight="duotone" /></span>
            <span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-white/50">Can't find your answer?</span>
              <span className="block text-xl font-extrabold tracking-wide text-white">{SITE.phone.vanity}</span>
            </span>
            <ArrowUpRight size={18} className="ml-auto text-white/40 transition group-hover:rotate-45 group-hover:text-white" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- answer visuals -- */
const PRODUCTS = [
  { name: "Shield RV", note: "Rugged, slip-resistant", to: "/application/sport-utility", img: A.swRaisedBlackCoinThumb },
  { name: "DeckRite Plank", note: "Ramps, decks & garages", to: "/application/ramp-deck", img: A.swGrayPlankThumb },
  { name: "DeckRite ULTRA", note: "RV living areas", to: "/application/interiors", img: A.swTanJuteThumb },
];
const TOOLS = [
  { icon: Knife, label: "Utility knife" },
  { icon: Ruler, label: "Straight edge" },
  { icon: ArrowsHorizontal, label: "Measuring tape" },
  { icon: PaintRoller, label: "Paint roller & handle" },
];
const stagger = (i: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15 + i * 0.07, duration: 0.5, ease } });

function Visual({ faq }: { faq: Faq }) {
  switch (faq.visual) {
    case "products":
      return (
        <div className="grid grid-cols-3 gap-3">
          {PRODUCTS.map((p, i) => (
            <motion.div key={p.name} {...stagger(i)}>
              <Link to={p.to} className="group block">
                <div className="aspect-square overflow-hidden ring-1 ring-ink/10">
                  <img src={p.img} alt={`${p.name} swatch`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-125" />
                </div>
                <div className="mt-3 text-sm font-bold text-ink">{p.name}</div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-ink/50 transition group-hover:text-brand">{p.note} <ArrowRight size={11} weight="bold" /></div>
              </Link>
            </motion.div>
          ))}
        </div>
      );
    case "retailers":
      return (
        <motion.div {...stagger(0)} className="relative overflow-hidden bg-ink p-7 text-white">
          <div className="grain absolute inset-0" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Toll free · current list of retailers</div>
            <a href={SITE.phone.href} className="mt-2 block text-4xl font-extrabold tracking-tight transition hover:text-brand-light xl:text-5xl">{SITE.phone.pretty}</a>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href={SITE.phone.href}>Call now</Btn>
              <Btn variant="ghost" {...contactLink("retailer")}>Ask online</Btn>
            </div>
          </div>
        </motion.div>
      );
    case "care":
      return (
        <div>
          <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            <motion.div {...stagger(0)} className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
              <img src={A.faqMop} alt="Cleaning a kitchen floor with a wet mop" className="absolute inset-0 h-full w-full object-cover" />
            </motion.div>
            <div className="flex flex-col gap-3">
              <motion.div {...stagger(1)} className="bg-ink p-5 text-white">
                <div className="text-4xl font-extrabold text-brand-light">99%</div>
                <div className="mt-1 text-[11px] uppercase leading-snug tracking-wider text-white/50">of maintenance requirements are very low</div>
              </motion.div>
              <motion.div {...stagger(2)} className="flex items-center gap-3 border border-ink/10 bg-paper p-4 text-sm font-semibold text-ink"><Broom size={22} weight="duotone" className="text-brand" /> A broom</motion.div>
              <motion.div {...stagger(3)} className="flex items-center gap-3 border border-ink/10 bg-paper p-4 text-sm font-semibold text-ink"><Drop size={22} weight="duotone" className="text-brand" /> Or a wet mop</motion.div>
            </div>
          </div>
          <Link {...contactLink("product")} className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Tough clean-up? Ask DeckRite <ArrowRight size={14} weight="bold" className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      );
    case "install":
      return (
        <div>
          <div className="grid gap-3 sm:grid-cols-[1fr_1.1fr]">
            <motion.div {...stagger(0)} className="relative aspect-[4/3] overflow-hidden">
              <img src={A.faqInstall} alt="Cutting material with a utility knife along a straight edge" className="absolute inset-0 h-full w-full object-cover" />
            </motion.div>
            <div className="grid grid-cols-2 gap-2">
              {TOOLS.map((t, i) => (
                <motion.div key={t.label} {...stagger(i + 1)} className="flex flex-col justify-between border border-ink/10 bg-paper p-4">
                  <t.icon size={26} weight="duotone" className="text-brand" />
                  <span className="mt-4 text-xs font-bold uppercase tracking-wide text-ink">{t.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-ink/40">No qualified installer · No unique tools</p>
        </div>
      );
    case "seams":
      return (
        <motion.div {...stagger(0)} className="relative overflow-hidden bg-ink p-7 text-white">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Manufactured width</div>
          <div className="mt-1 flex items-end gap-3"><span className="text-6xl font-extrabold tracking-tight">102″</span><span className="pb-2 text-sm text-white/50">wide rolls</span></div>
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50">
              <span className="h-px flex-1 bg-white/25" /> one continuous sheet <span className="h-px flex-1 bg-white/25" />
            </div>
            <div className="relative h-24 overflow-hidden bg-white/5 ring-1 ring-white/15">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease, delay: 0.25 }}
                className="absolute inset-0 origin-left bg-cover bg-center" style={{ backgroundImage: `url(${A.swGrayPlankHd})` }} />
              <motion.div initial={{ left: "0%" }} animate={{ left: "100%" }} transition={{ duration: 1.4, ease, delay: 0.25 }}
                className="absolute top-0 h-full w-4 -translate-x-full bg-gradient-to-r from-transparent to-black/60" />
            </div>
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.25em] text-white/40"><span>Wall</span><span className="text-brand-light">No seams</span><span>Wall</span></div>
          </div>
        </motion.div>
      );
  }
}

function AnswerCard({ faq, index, compact = false }: { faq: Faq; index: number; compact?: boolean }) {
  const { verdict, rest } = splitVerdict(faq.a);
  return (
    <div className={compact ? "" : "bg-white p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-ink/5 xl:p-10"}>
      {!compact && (
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-ink/40">
          <span className="text-brand">{faq.topic}</span><span className="font-mono">{pad(index + 1)} / {pad(FAQS.length)}</span>
        </div>
      )}
      <div className={`flex items-start ${compact ? "flex-col gap-3" : "mt-6 gap-5"}`}>
        {verdict && <span className={`shrink-0 font-serif italic leading-[0.8] text-brand ${compact ? "text-5xl" : "text-6xl xl:text-7xl"}`}>{verdict}.</span>}
        <p className="text-base leading-relaxed text-ink/70 xl:text-lg">{rest}</p>
      </div>
      <div className="mt-8"><Visual faq={faq} /></div>
    </div>
  );
}

/* --------------------------------------------------------------- explorer -- */
function Explorer({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const idx = active < 0 ? 0 : active; // mobile can collapse all; desktop always shows one
  return (
    <section id="faq" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 grid items-end gap-6 md:grid-cols-2">
          <div>
            <Eyebrow>Frequently asked</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
              <SplitText text="Five questions." /><br /><SplitText text="Every answer." delay={0.2} className="font-serif italic font-normal" />
            </h2>
          </div>
          <Reveal delay={0.2}><p className="max-w-md text-ink/60 md:ml-auto">Straight from the DeckRite RV team. Select a question to see the answer, and what it means for your RV.</p></Reveal>
        </div>

        {/* Desktop: question list + sticky answer panel */}
        <div className="hidden gap-12 lg:grid lg:grid-cols-[0.95fr_1.05fr]">
          <div role="tablist" aria-orientation="vertical" aria-label="Frequently asked questions" className="self-start border-t border-ink/10">
            {FAQS.map((f, i) => (
              <button key={f.id} type="button" role="tab" id={`faq-tab-${f.id}`} aria-selected={idx === i} aria-controls="faq-panel" onClick={() => setActive(i)}
                className="group relative flex w-full items-start gap-6 border-b border-ink/10 py-7 pl-6 pr-4 text-left">
                {idx === i && <motion.span layoutId="faqBar" className="absolute left-0 top-0 h-full w-[3px] bg-brand" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                <span className={`pt-1 font-mono text-sm transition ${idx === i ? "text-brand" : "text-ink/30"}`}>{pad(i + 1)}</span>
                <span>
                  <span className={`block text-[11px] uppercase tracking-[0.3em] transition ${idx === i ? "text-brand" : "text-ink/40"}`}>{f.topic}</span>
                  <span className={`mt-2 block text-xl font-bold leading-snug transition xl:text-2xl ${idx === i ? "text-ink" : "text-ink/45 group-hover:text-ink/75"}`}>{f.q}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="relative">
            <div className="sticky top-28" id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${FAQS[idx].id}`}>
              <AnimatePresence mode="wait">
                <motion.div key={FAQS[idx].id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease }}>
                  <AnswerCard faq={FAQS[idx]} index={idx} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: accordion */}
        <div className="border-t border-ink/10 lg:hidden">
          {FAQS.map((f, i) => {
            const open = active === i;
            return (
              <div key={f.id} className="border-b border-ink/10">
                <button type="button" aria-expanded={open} aria-controls={`faq-acc-${f.id}`} onClick={() => setActive(open ? -1 : i)} className="flex w-full items-start gap-4 py-6 text-left">
                  <span className="pt-1 font-mono text-sm text-brand">{pad(i + 1)}</span>
                  <span className="flex-1 text-lg font-bold leading-snug text-ink">{f.q}</span>
                  <Plus size={20} weight="bold" className={`mt-1 shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-brand" : "text-ink/40"}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div id={`faq-acc-${f.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                      <div className="pb-8 sm:pl-9"><AnswerCard faq={f} index={i} compact /></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- warranty -- */
function Warranty() {
  return (
    <section id="warranty" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="grain absolute inset-0" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-brand/20 blur-[160px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow light>Warranty</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-none tracking-tight md:text-6xl">
            <SplitText text="Two years of" /><br /><SplitText text="peace of mind." delay={0.2} className="font-serif italic font-normal text-brand-light" />
          </h2>
          <Reveal delay={0.2}><p className="mt-6 max-w-lg text-white/60">DeckRite RV membranes are backed by the DeckRite RV {SITE.warranty.title}. Here is what it covers at a glance.</p></Reveal>
          <ul className="mt-10 space-y-5">
            {WARRANTY_FACTS.map((f, i) => (
              <Reveal key={f} delay={0.1 + i * 0.08}>
                <li className="flex gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-light"><Check size={13} weight="bold" /></span>
                  <span className="leading-relaxed text-white/75">{f}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.5}><p className="mt-8 text-xs text-white/40">Summary only. The full warranty document contains all terms, conditions and limitations.</p></Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative mx-auto max-w-sm">
            <motion.div initial={{ rotate: -4 }} whileHover={{ rotate: 0, y: -10 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative bg-paper p-8 text-ink shadow-[0_60px_120px_-30px_rgba(0,0,0,0.85)]">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                <Logo variant="inline" />
                <FilePdf size={28} weight="duotone" className="text-brand" />
              </div>
              <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-ink/40">DeckRite LLC</div>
              <div className="mt-1 text-2xl font-extrabold leading-tight">2 Year Limited Warranty</div>
              <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 text-[9px] uppercase tracking-wider text-ink/40">
                {["Owner", "RV description", "Date of purchase", "Material (sq. ft.)"].map((l) => <div key={l} className="border-b border-ink/15 pb-1.5">{l}</div>)}
              </div>
              <div className="mt-6 space-y-2">{[96, 100, 84, 92, 58, 88, 72].map((w, i) => <div key={i} className="h-1.5 bg-ink/10" style={{ width: `${w}%` }} />)}</div>
              <div className="absolute -bottom-6 -right-6 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full bg-brand text-center text-[10px] font-bold uppercase leading-tight tracking-wider text-white shadow-xl">2 Year<br />Limited</div>
            </motion.div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <WarrantyLink className="group relative inline-flex items-center gap-3 overflow-hidden bg-brand px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white">
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
                <Eye size={18} weight="duotone" className="relative" /><span className="relative">View warranty</span>
              </WarrantyLink>
              <WarrantyLink download className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white">
                <DownloadSimple size={18} weight="bold" /> Download
              </WarrantyLink>
            </div>
            <p className="mt-4 text-center text-xs text-white/40">{SITE.warranty.fileName} · {SITE.warranty.meta}</p>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-20 max-w-7xl px-6">
        <Reveal>
          <Link {...contactLink("brochure")} className="group flex flex-col items-start justify-between gap-6 border border-white/10 bg-white/[0.03] p-8 transition hover:border-white/25 md:flex-row md:items-center">
            <div className="flex items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-brand-light"><BookOpen size={28} weight="duotone" /></span>
              <div>
                <div className="text-xl font-bold">Prefer everything in one place?</div>
                <div className="mt-1 text-white/55">Request the free DeckRite RV PDF brochure.</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-light">
              Request brochure <ArrowRight size={16} weight="bold" className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function Faqs() {
  useDocumentTitle("FAQs | DeckRite RV");
  const [active, setActive] = useState(0);
  const pick = (i: number) => { setActive(i); scrollToId("faq"); };
  return (
    <>
      <FaqSchema />
      <Hero onPick={pick} />
      <Explorer active={active} setActive={setActive} />
      <Warranty />
      <CtaSection
        id="faq-cta"
        eyebrow="Still have a question?"
        titleA="Ask the people"
        titleB="who make it."
        text={`Call DeckRite toll free ${SITE.phone.pretty}, or send us a message and we'll be glad to help.`}
        action={{ label: "Send a message", ...contactLink("product") }}
        image={A.bannerInteriors}
      />
    </>
  );
}
