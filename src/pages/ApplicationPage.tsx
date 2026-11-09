import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Question, SealCheck, Wrench } from "@phosphor-icons/react";
import WarrantyLink from "../components/WarrantyLink";
import { SITE } from "../data/site";
import { scrollToId, useDocumentTitle } from "../lib/utils";
import { useHeroCrowding } from "../lib/useHeroCrowding";
import { APPLICATIONS, getApplication } from "../data/applications";
import { Btn, Eyebrow, Reveal, SplitText, ease } from "../components/anim";
import CtaSection from "../components/CtaSection";
import SwatchViewer from "../components/SwatchViewer";

// Single template for all three applications. Everything visible comes from
// the Application data object, so adding a 4th application = adding data.

function Hero({ app }: { app: NonNullable<ReturnType<typeof getApplication>> }) {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const { hideHint } = useHeroCrowding(ref, contentRef, hintRef);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="relative min-h-[max(92svh,620px)] overflow-hidden bg-ink">
      <motion.div style={{ scale }} className="absolute inset-0">
        <motion.img key={app.slug} initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.06 }} animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }} transition={{ duration: 1.6, ease }}
          src={app.hero} alt={app.product} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <div className="grain absolute inset-0" />

      <motion.div ref={contentRef} style={{ y, opacity: op }} className="relative mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-center px-6 pt-36 md:pt-48 lg:pt-56 md:pb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white">
            <ArrowLeft size={16} weight="bold" /> All applications
          </Link>
          <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-brand-light">
            <span className="h-px w-10 bg-brand" /> {app.eyebrow}
          </p>
        </motion.div>
        <h1 className="max-w-4xl text-5xl font-extrabold leading-none tracking-tight text-white sm:text-7xl lg:text-[5.6rem]">
          <SplitText text={app.title[0]} delay={0.6} /><br />
          <SplitText text={app.title[1]} delay={0.8} className="text-white/90" /><br />
          <SplitText text={app.title[2]} delay={1.0} className="italic font-serif font-normal text-brand-light" />
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">{app.tagline}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <Btn scrollTo="colors">See colors</Btn>
          <Btn variant="ghost" scrollTo="story">Why {app.product}</Btn>
        </motion.div>
      </motion.div>

      <motion.div ref={hintRef} style={{ visibility: hideHint ? "hidden" : "visible" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50 md:left-1/2 md:-translate-x-1/2">
        <div className="relative h-10 w-px overflow-hidden bg-white/20"><motion.span animate={{ y: [-40, 40] }} transition={{ repeat: Infinity, duration: 1.6 }} className="absolute h-4 w-px bg-brand" /></div>Scroll
      </motion.div>
    </section>
  );
}

function Intro({ app }: { app: NonNullable<ReturnType<typeof getApplication>> }) {
  return (
    <section id="story" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>{app.product}</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
              <SplitText text={app.statement} />
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-5 text-ink/60 md:text-lg md:leading-relaxed">
            {app.intro.map((p, i) => (
              <Reveal key={i} delay={i * 0.12}><p>{p}</p></Reveal>
            ))}
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden bg-ink/10 lg:grid-cols-4">
          {app.specs.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group h-full bg-paper p-6 transition-colors duration-500 hover:bg-ink md:p-8">
                <s.icon size={32} weight="duotone" className="text-brand transition group-hover:text-brand-light" />
                <div className="mt-6 text-xl font-bold text-ink transition group-hover:text-white md:text-2xl">{s.value}</div>
                <div className="mt-2 text-[11px] uppercase tracking-wider text-ink/50 transition group-hover:text-white/50">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ app }: { app: NonNullable<ReturnType<typeof getApplication>> }) {
  return (
    <section className="bg-paper pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
            <SplitText text="Made for" /><br /><SplitText text="real applications." delay={0.2} className="font-serif italic font-normal" />
          </h2>
          <Reveal><p className="max-w-sm text-ink/60">Wherever your RV goes, {app.product} is built for the job.</p></Reveal>
        </div>
        <div className="grid border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {app.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden border-b border-ink/10 p-8 md:border-r md:last:border-r-0 lg:p-10">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out group-hover:scale-y-100" />
                <div className="relative">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/10 to-brand/0 text-brand ring-1 ring-brand/20 transition duration-500 group-hover:rotate-[-6deg] group-hover:from-brand group-hover:to-brand-dark group-hover:text-white group-hover:ring-brand">
                    <f.icon size={26} weight="duotone" />
                  </div>
                  <h3 className="mt-8 text-xl font-bold text-ink transition group-hover:text-white">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60 transition group-hover:text-white/60">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Banner({ app }: { app: NonNullable<ReturnType<typeof getApplication>> }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="relative h-[52vh] min-h-[340px] overflow-hidden bg-ink">
      <motion.img src={app.banner} alt={app.bannerCaption} style={{ y, scale: 1.15 }} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
        <Reveal>
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/80">
            <span className="h-px w-10 bg-brand-light" /> {app.bannerCaption}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Lifestyle({ app }: { app: NonNullable<ReturnType<typeof getApplication>> }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section className="overflow-hidden bg-stone py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative">
          <motion.div style={{ y }} className="relative aspect-[4/3] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)]">
            <img src={app.lifestyle} alt={app.lifestyleTitle} className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute -bottom-6 -right-4 hidden bg-brand px-6 py-5 text-white shadow-xl md:block">
            <div className="text-2xl font-extrabold">{app.product}</div>
            <div className="mt-1 text-[11px] uppercase tracking-widest text-white/70">{app.eyebrow}</div>
          </div>
        </div>
        <div>
          <Eyebrow>In the wild</Eyebrow>
          <h2 className="text-3xl font-extrabold leading-none tracking-tight text-ink md:text-5xl">
            <SplitText text={app.lifestyleTitle} />
          </h2>
          <Reveal delay={0.2}><p className="mt-6 leading-relaxed text-ink/60 md:text-lg">{app.lifestyleText}</p></Reveal>
          <Reveal delay={0.3}>
            <button type="button" onClick={() => scrollToId("colors")} className="group mt-8 inline-flex items-center gap-2 border-b border-brand pb-1 text-sm font-semibold text-brand">
              Browse {app.product} colors <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Colors({ app }: { app: NonNullable<ReturnType<typeof getApplication>> }) {
  return (
    <section id="colors" className="relative overflow-hidden bg-ink py-24 text-white md:py-28">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 grid items-end gap-6 md:grid-cols-2">
          <div>
            <Eyebrow light>Design & Color Options</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight md:text-6xl">
              <SplitText text="Pick your" /><br /><SplitText text="pattern." delay={0.2} className="font-serif italic font-normal text-brand-light" />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-white/60 md:ml-auto">
              {app.colors.length} authentic {app.product} finishes straight from our catalog. Select a swatch, then hover the large sample to inspect the texture up close.
            </p>
          </Reveal>
        </div>
        <SwatchViewer swatches={app.colors} thumbsPerRow={4} />
      </div>
    </section>
  );
}

function Install({ app }: { app: NonNullable<ReturnType<typeof getApplication>> }) {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <Eyebrow>Installation</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
            <SplitText text={app.install.title} />
          </h2>
        </div>
        <div>
          <Reveal><p className="text-lg leading-relaxed text-ink/60">{app.install.desc}</p></Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {app.install.tools.map((t, i) => (
              <Reveal key={t} delay={i * 0.06}>
                <span className="flex items-center gap-2 border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink">
                  <Wrench size={16} weight="duotone" className="text-brand" /> {t}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-8 text-sm">
              <WarrantyLink className="inline-flex items-center gap-2 font-semibold text-brand transition hover:text-brand-dark">
                <SealCheck size={18} weight="duotone" /> {SITE.warranty.title} <span className="font-normal text-ink/40">(PDF)</span>
              </WarrantyLink>
              <Link to="/faqs" className="inline-flex items-center gap-2 font-semibold text-ink/70 transition hover:text-ink">
                <Question size={18} weight="duotone" /> Installation & care FAQs
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Related() {
  return (
    <section className="bg-paper pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <Eyebrow>Applications</Eyebrow>
        <h2 className="mb-12 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
          <SplitText text="Explore the other" /><br /><SplitText text="applications." delay={0.2} className="font-serif italic font-normal" />
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {APPLICATIONS.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.1}>
              <Link to={`/application/${a.slug}`} className="group relative block h-72 overflow-hidden">
                <img src={a.hero} alt={a.product} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="font-mono text-xs text-white/60">0{i + 1}</div>
                  <h3 className="mt-2 text-2xl font-bold text-white">{a.product}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 border-b border-brand-light pb-1 text-sm font-semibold text-brand-light">
                    View application <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ApplicationPage() {
  const { slug } = useParams();
  const app = getApplication(slug ?? "");
  useDocumentTitle(app ? `${app.product} — ${app.navLabel} | DeckRite RV` : "DeckRite RV");
  if (!app) return <Navigate to="/" replace />;
  return (
    <>
      <Hero app={app} />
      <Intro app={app} />
      <Features app={app} />
      <Banner app={app} />
      <Lifestyle app={app} />
      <Colors app={app} />
      <Install app={app} />
      <Related />
      <CtaSection />
    </>
  );
}
