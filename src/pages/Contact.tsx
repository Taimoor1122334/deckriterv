import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, ArrowsClockwise, BookOpen, ChatCircleDots, ChatText, CircleNotch, Lightning, MapPin,
  NavigationArrow, PaperPlaneTilt, Phone, Question, SealCheck, Factory, WarningCircle, type Icon,
} from "@phosphor-icons/react";
import * as A from "../assets/images";
import { ADDRESS_LINE, MAPS, SITE, type ContactTopic } from "../data/site";
import { Btn, Eyebrow, Reveal, SplitText, ease } from "../components/anim";
import WarrantyLink from "../components/WarrantyLink";
import SocialLinks from "../components/SocialLinks";
import { scrollToId, useDocumentTitle } from "../lib/utils";

type Topic = { id: ContactTopic; label: string; icon: Icon; title: string; blurb: string; cta: string; tip: string };
const TOPICS: Topic[] = [
  {
    id: "oem", label: "OEM inquiry", icon: Factory, title: "OEM inquiry", cta: "Contact OEM sales",
    blurb: "Specifications, samples and flooring programs for RV manufacturers.",
    tip: `Call toll free ${SITE.phone.pretty}, or send the coach type and application — toy hauler ramp, deck, garage or interior.`,
  },
  {
    id: "product", label: "Product question", icon: ChatCircleDots, title: "Product question", cta: "Ask a question",
    blurb: "Applications, colors, installation or a tough clean-up project.",
    tip: "Tell us what you are working on (interior, garage, ramp or deck) and which product you have in mind.",
  },
  {
    id: "warranty", label: "Warranty", icon: SealCheck, title: "Warranty", cta: "Ask about warranty",
    blurb: "DeckRite RV membranes are backed by a 2-year limited warranty.",
    tip: "Include your RV description and date of purchase. The full terms, conditions and limitations are in the warranty PDF.",
  },
  {
    id: "brochure", label: "Free brochure", icon: BookOpen, title: "Free PDF brochure", cta: "Request brochure",
    blurb: "Every DeckRite RV product, in one free download.",
    tip: "Just your name and email address and we will send the free DeckRite RV PDF brochure your way.",
  },
  {
    id: "other", label: "Something else", icon: ChatText, title: "Something else", cta: "Get in touch",
    blurb: "", tip: "Whatever it is, the DeckRite RV team is one message away.",
  },
];
const topicOf = (id: ContactTopic) => TOPICS.find((t) => t.id === id)!;
const BROCHURE_MSG = "Please send me the free DeckRite RV PDF brochure.";

/* ------------------------------------------------------------------ hero -- */
const FLOATERS = [
  { img: A.swTanJuteThumb, cls: "right-[7%] top-[16%] w-44 rotate-[8deg]", depth: 36, dur: 7 },
  { img: A.swRaisedBlackCoinThumb, cls: "right-[27%] top-[26%] w-32 -rotate-[10deg]", depth: 18, dur: 6 },
  { img: A.swGrayPlankThumb, cls: "right-[13%] top-[48%] w-40 -rotate-[4deg]", depth: 48, dur: 8 },
  { img: A.swColonialThumb, cls: "right-[33%] top-[58%] w-24 rotate-[14deg]", depth: 14, dur: 5.5 },
  { img: A.swBlackDiamondThumb, cls: "right-[3%] top-[70%] w-28 rotate-[18deg]", depth: 26, dur: 6.5 },
  { img: A.swBrownPlankThumb, cls: "right-[22%] top-[14%] w-24 -rotate-[16deg]", depth: 12, dur: 7.5 },
];

function Floater({ f, mx, my, i }: { f: (typeof FLOATERS)[number]; mx: MotionValue<number>; my: MotionValue<number>; i: number }) {
  const x = useTransform(mx, (v) => v * f.depth);
  const y = useTransform(my, (v) => v * f.depth);
  return (
    <motion.div style={{ x, y }} className={`absolute ${f.cls}`}>
      <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
        transition={{ opacity: { delay: 0.6 + i * 0.12, duration: 0.8 }, scale: { delay: 0.6 + i * 0.12, duration: 0.8, ease }, y: { duration: f.dur, repeat: Infinity, ease: "easeInOut" } }}
        className="aspect-square w-full overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <img src={f.img} alt="" className="h-full w-full object-cover" />
      </motion.div>
    </motion.div>
  );
}

function Chars({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.06em] ${className}`}>
      {text.split("").map((c, i) => (
        <motion.span key={i} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: delay + i * 0.04, duration: 0.7, ease }} className="inline-block">{c}</motion.span>
      ))}
    </span>
  );
}

function Hero() {
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <section onMouseMove={onMove} className="relative overflow-hidden bg-ink pb-24 pt-36 md:pb-28 md:pt-48 lg:min-h-[100svh] lg:pt-56">
      <div className="grain absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-brand/25 blur-[150px]" />
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {FLOATERS.map((f, i) => <Floater key={i} f={f} mx={mx} my={my} i={i} />)}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/70">
          <span className="h-px w-10 bg-brand" /> Contact Us
        </motion.p>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
          <SplitText text="Let's talk" delay={0.5} /><br />
          <SplitText text="about your" delay={0.65} className="text-white/90" /> <SplitText text="floors." delay={0.8} className="font-serif italic font-normal text-brand-light" />
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
          Specifying a floor, choosing a product or checking a warranty? The DeckRite RV team in North Little Rock, Arkansas works directly with OEM partners.
        </motion.p>

        <a href={SITE.phone.href} className="group mt-12 inline-block" aria-label={`Call toll free ${SITE.phone.pretty}`}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="block text-[11px] uppercase tracking-[0.35em] text-white/50">Call toll free</motion.span>
          <span className="mt-2 flex flex-wrap items-baseline text-[2.6rem] font-extrabold leading-none tracking-tight text-white sm:text-7xl lg:text-[6.5rem]">
            <Chars text="888-450-" delay={1.15} />
            <Chars text="DECK" delay={1.5} className="font-serif font-normal italic text-brand-light" />
          </span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="mt-4 flex items-center gap-3 text-sm text-white/55">
            <span className="h-px w-10 bg-brand transition-all duration-500 group-hover:w-24" /> {SITE.phone.pretty} · tap to call
          </motion.span>
        </a>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <Btn scrollTo="form">Send a message</Btn>
          <Btn variant="ghost" href={MAPS.directions} external>Get directions</Btn>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- path cards -- */
function Paths({ topic, onChoose }: { topic: ContactTopic; onChoose: (t: ContactTopic) => void }) {
  return (
    <section className="relative z-10 bg-paper px-6 pt-16 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TOPICS.filter((t) => t.id !== "other").map((t, i) => (
          <motion.button key={t.id} type="button" onClick={() => onChoose(t.id)}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.1, duration: 0.8, ease }}
            className={`group relative overflow-hidden bg-white p-7 text-left shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)] transition ${topic === t.id ? "ring-2 ring-brand" : "ring-1 ring-ink/5"}`}>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out group-hover:scale-y-100" />
            <span className="relative block">
              <span className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/20 transition duration-500 group-hover:rotate-[-6deg] group-hover:bg-brand group-hover:text-white">
                  <t.icon size={24} weight="duotone" />
                </span>
                <span className="font-mono text-xs text-ink/30 transition group-hover:text-white/40">0{i + 1}</span>
              </span>
              <span className="mt-8 block text-xl font-bold text-ink transition group-hover:text-white">{t.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-ink/55 transition group-hover:text-white/60">{t.blurb}</span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:text-brand-light">
                {t.cta} <ArrowRight size={14} weight="bold" className="transition group-hover:translate-x-1" />
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ form -- */
type Values = { name: string; email: string; phone: string; message: string; company: string };
const EMPTY: Values = { name: "", email: "", phone: "", message: "", company: "" };
const newCaptcha = () => ({ a: 1 + Math.floor(Math.random() * 9), b: 1 + Math.floor(Math.random() * 9) });

async function submitForm(topic: ContactTopic, v: Values) {
  const brochure = topic === "brochure";
  const endpoint = brochure ? SITE.forms.brochureEndpoint : SITE.forms.contactEndpoint;
  // Field names mirror the live site's handlers (contact-handler.php / sidebar-handler.php).
  const body = new FormData();
  body.append("wwd", brochure ? "brochure" : "send");
  body.append("name", v.name.trim());
  body.append("email", v.email.trim());
  if (!brochure) {
    body.append("phone", v.phone.trim());
    body.append("message", `[${topicOf(topic).label}] ${v.message.trim()}`);
  }
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 900));
    console.info("[DeckRite RV] Demo mode: set SITE.forms endpoints to deliver this submission.", Object.fromEntries(body));
    return;
  }
  const res = await fetch(endpoint, { method: "POST", body });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

function Field({ id, label, value, onChange, error, required, textarea, type = "text", autoComplete, inputMode }: {
  id: keyof Values; label: string; value: string; onChange: (v: string) => void; error?: string; required?: boolean; textarea?: boolean;
  type?: string; autoComplete?: string; inputMode?: "text" | "email" | "tel";
}) {
  const common = {
    id, name: id, value, placeholder: " ", autoComplete,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    "aria-invalid": !!error, "aria-describedby": error ? `${id}-err` : undefined, "aria-required": required,
    className: `peer block w-full resize-none border-0 border-b-2 bg-transparent px-0 pb-3 pt-7 text-base text-ink outline-none transition ${error ? "border-brand" : "border-ink/15 hover:border-ink/30"}`,
  };
  return (
    <div>
    <div className="relative">
      {textarea ? <textarea rows={5} {...common} /> : <input type={type} inputMode={inputMode} {...common} />}
      <label htmlFor={id}
        className="pointer-events-none absolute left-0 top-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50 transition-all duration-300
          peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink/45
          peer-focus:top-1 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-brand">
        {label}{required && <span className="text-brand"> *</span>}
      </label>
      <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-ink transition-transform duration-500 peer-focus:scale-x-100" />
    </div>
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs font-medium text-brand">{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm({ topic, setTopic }: { topic: ContactTopic; setTopic: (t: ContactTopic) => void }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [answer, setAnswer] = useState("");
  const [captcha, setCaptcha] = useState(newCaptcha);
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const brochure = topic === "brochure";

  useEffect(() => {
    if (status === "sent") cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  useEffect(() => {
    if (brochure && !values.message.trim()) setValues((v) => ({ ...v, message: BROCHURE_MSG }));
    if (!brochure && values.message === BROCHURE_MSG) setValues((v) => ({ ...v, message: "" }));
  }, [brochure]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k: keyof Values) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e: Partial<Record<keyof Values | "captcha", string>> = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = "Please enter a valid email address.";
    if (!brochure) {
      if (values.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a phone number we can reach you on.";
      if (values.message.trim().length < 5) e.message = "Please tell us a little about your question.";
    }
    if (Number(answer) !== captcha.a + captcha.b) e.captcha = "That answer isn't quite right. Try again.";
    return e;
  };
  const errors = tried ? validate() : {};

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setTried(true);
    const e = validate();
    const first = Object.keys(e)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    if (values.company) { setStatus("sent"); return; } // honeypot filled: quietly drop bots
    setStatus("sending");
    try {
      await submitForm(topic, values);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(EMPTY); setAnswer(""); setCaptcha(newCaptcha()); setTried(false); setStatus("idle");
  };
  const firstName = values.name.trim().split(/\s+/)[0] || "there";

  return (
    <div ref={cardRef} className="relative bg-white p-7 shadow-[0_50px_100px_-50px_rgba(0,0,0,0.45)] ring-1 ring-ink/5 sm:p-10 xl:p-12">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
            className="flex min-h-[560px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
            <svg viewBox="0 0 80 80" className="h-24 w-24" aria-hidden="true">
              <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#9b1c1f" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }} />
              <motion.path d="M25 41 l10 10 l20 -22" fill="none" stroke="#9b1c1f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.5, ease }} />
            </svg>
            <h3 className="mt-8 text-3xl font-extrabold text-ink">Thanks, {firstName}!</h3>
            <p className="mt-3 max-w-sm text-ink/60">{brochure ? "Your request for the free DeckRite RV brochure is on its way." : "Your message is on its way to the DeckRite RV team."}</p>
            <a href={SITE.phone.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand"><Phone size={16} weight="duotone" /> Prefer to talk? Call {SITE.phone.vanity}</a>
            <button type="button" onClick={reset} className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-ink/45 transition hover:text-ink">Send another message</button>
          </motion.div>
        ) : (
          <motion.form key="form" ref={formRef} onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-9">
            <fieldset>
              <legend className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/45">What can we help with?</legend>
              <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Topic">
                {TOPICS.map((t) => {
                  const on = topic === t.id;
                  return (
                    <button key={t.id} type="button" role="radio" aria-checked={on} onClick={() => setTopic(t.id)}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${on ? "text-white" : "text-ink/70 ring-1 ring-ink/15 hover:text-ink hover:ring-ink/40"}`}>
                      {on && <motion.span layoutId="topicPill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                      <t.icon size={16} weight="duotone" className={`relative ${on ? "text-brand-light" : "text-brand"}`} />
                      <span className="relative">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <Field id="name" label="Full name" value={values.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
            <div className="grid gap-9 sm:grid-cols-2">
              <Field id="email" label="Email" type="email" inputMode="email" value={values.email} onChange={set("email")} error={errors.email} required autoComplete="email" />
              <Field id="phone" label={brochure ? "Phone (optional)" : "Phone"} type="tel" inputMode="tel" value={values.phone} onChange={set("phone")} error={errors.phone} required={!brochure} autoComplete="tel" />
            </div>
            <Field id="message" label={brochure ? "Message (optional)" : "How can we help?"} textarea value={values.message} onChange={set("message")} error={errors.message} required={!brochure} />

            {/* honeypot - hidden from people, tempting for bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={(e) => set("company")(e.target.value)} />
            </div>

            <div>
              <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
                <label htmlFor="captcha" className="pb-2 text-sm font-semibold text-ink">
                  Quick check: <span className="font-mono text-brand">{captcha.a} + {captcha.b}</span> =
                </label>
                <input id="captcha" inputMode="numeric" value={answer} onChange={(e) => setAnswer(e.target.value.replace(/[^\d]/g, ""))} placeholder="?"
                  aria-invalid={!!errors.captcha} aria-describedby={errors.captcha ? "captcha-err" : undefined}
                  className={`w-20 border-0 border-b-2 bg-transparent px-0 pb-2 text-center text-lg font-bold text-ink outline-none transition focus:border-ink ${errors.captcha ? "border-brand" : "border-ink/15"}`} />
                <button type="button" onClick={() => { setCaptcha(newCaptcha()); setAnswer(""); }} className="inline-flex items-center gap-1.5 pb-2 text-xs font-semibold uppercase tracking-wider text-ink/45 transition hover:text-ink">
                  <ArrowsClockwise size={14} weight="bold" /> New question
                </button>
              </div>
              {errors.captcha && <p id="captcha-err" className="mt-2 text-xs font-medium text-brand">{errors.captcha}</p>}
            </div>

            {status === "error" && (
              <div className="flex items-start gap-3 border-l-2 border-brand bg-brand/5 p-4 text-sm text-ink/80" role="alert">
                <WarningCircle size={20} weight="duotone" className="shrink-0 text-brand" />
                Something went wrong sending your message. Please try again, or call us toll free at {SITE.phone.pretty}.
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-5 border-t border-ink/10 pt-8">
              <p className="text-xs text-ink/45">Fields marked <span className="text-brand">*</span> are required.</p>
              <button type="submit" disabled={status === "sending"} className="group relative inline-flex items-center gap-3 overflow-hidden bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition disabled:opacity-70">
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
                {status === "sending"
                  ? <CircleNotch size={18} weight="bold" className="relative animate-spin" />
                  : <PaperPlaneTilt size={18} weight="duotone" className="relative transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                <span className="relative">{status === "sending" ? "Sending…" : brochure ? "Send me the brochure" : "Send message"}</span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormSection({ topic, setTopic }: { topic: ContactTopic; setTopic: (t: ContactTopic) => void }) {
  const t = topicOf(topic);
  return (
    <section id="form" className="bg-paper py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Send a message</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
            <SplitText text="Drop us" /><br /><SplitText text="a line." delay={0.2} className="font-serif italic font-normal" />
          </h2>

          <AnimatePresence mode="wait">
            <motion.div key={topic} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease }}
              className="mt-10 border-l-2 border-brand bg-white p-6 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand"><Lightning size={14} weight="fill" /> Tip · {t.label}</div>
              <p className="mt-3 leading-relaxed text-ink/70">{t.tip}</p>
              {topic === "oem" && <a href={SITE.phone.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand"><Phone size={16} weight="duotone" /> Call {SITE.phone.pretty}</a>}
              {topic === "warranty" && <WarrantyLink className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand"><SealCheck size={16} weight="duotone" /> View the warranty (PDF)</WarrantyLink>}
            </motion.div>
          </AnimatePresence>

          <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            <div className="flex items-start gap-4 py-5">
              <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white"><Phone size={18} weight="duotone" /><span className="sr-only">Phone</span></dt>
              <dd>
                <a href={SITE.phone.href} className="text-lg font-bold tracking-wide text-ink transition hover:text-brand">{SITE.phone.vanity}</a>
                <div className="text-sm text-ink/50">{SITE.phone.pretty} · toll free</div>
              </dd>
            </div>
            <div className="flex items-start gap-4 py-5">
              <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white"><MapPin size={18} weight="duotone" /><span className="sr-only">Address</span></dt>
              <dd>
                <div className="font-bold text-ink">{SITE.company}</div>
                <div className="text-sm text-ink/60">{SITE.address.street}<br />{SITE.address.city}, {SITE.address.region} {SITE.address.zip}</div>
                <button type="button" onClick={() => scrollToId("visit")} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">See the map <ArrowRight size={13} weight="bold" /></button>
              </dd>
            </div>
            <div className="flex items-center gap-4 py-5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/45">Follow</dt>
              <dd><SocialLinks size={20} className="gap-4" itemClassName="text-ink/50 hover:text-brand" /></dd>
            </div>
          </dl>
        </div>

        <Reveal><ContactForm topic={topic} setTopic={setTopic} /></Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- map -- */
function MapSection() {
  return (
    <section id="visit" className="relative h-[78vh] min-h-[560px] overflow-hidden bg-ink">
      <iframe title={`Map showing ${SITE.company}, ${ADDRESS_LINE}`} src={MAPS.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="map-dark absolute inset-0 h-full w-full border-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink to-transparent" />
      <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl items-center px-6">
        <Reveal className="pointer-events-auto w-full max-w-md">
          <div className="bg-ink/85 p-8 text-white ring-1 ring-white/10 backdrop-blur-xl md:p-10">
            <Eyebrow light>Find us</Eyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{SITE.company}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">{SITE.address.street}<br />{SITE.address.city}, {SITE.address.region} {SITE.address.zip}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={MAPS.directions} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 overflow-hidden bg-brand px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white">
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
                <NavigationArrow size={16} weight="fill" className="relative" /><span className="relative">Directions</span>
              </a>
              <a href={SITE.phone.href} className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white">
                <Phone size={16} weight="duotone" /> Call
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- resources -- */
function Resources() {
  const card = "group relative block h-full overflow-hidden border border-ink/10 bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]";
  const inner = (icon: Icon, title: string, text: string, cta: string, ext?: boolean) => {
    const I = icon;
    return (
      <>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/20 transition group-hover:bg-brand group-hover:text-white"><I size={24} weight="duotone" /></span>
        <span className="mt-8 block text-xl font-bold text-ink">{title}</span>
        <span className="mt-2 block text-sm leading-relaxed text-ink/55">{text}</span>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
          {cta} {ext ? <ArrowUpRight size={14} weight="bold" /> : <ArrowRight size={14} weight="bold" className="transition group-hover:translate-x-1" />}
        </span>
      </>
    );
  };
  return (
    <section className="bg-paper py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Before you write</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight text-ink md:text-5xl"><SplitText text="Your answer may" /><br /><SplitText text="already be here." delay={0.2} className="font-serif italic font-normal" /></h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal><Link to="/faqs" className={card}>{inner(Question, "FAQs", "Applications, availability, maintenance, installation and seaming, answered.", "Read the FAQs")}</Link></Reveal>
          <Reveal delay={0.1}><WarrantyLink className={card}>{inner(SealCheck, SITE.warranty.title, "The full DeckRite RV warranty terms, conditions and limitations.", `View PDF · ${SITE.warranty.meta.replace("PDF · ", "")}`, true)}</WarrantyLink></Reveal>
          <Reveal delay={0.2}><Link to="/application/interiors" className={card}>{inner(BookOpen, "Explore the products", "ULTRA Woven PVC, Shield RV and DeckRite Plank, with every color option.", "View applications")}</Link></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page -- */
const topicFromParam = (v: string | null): ContactTopic | null => {
  if (v === "retailer" || v === "oem") return "oem";
  return v && TOPICS.some((t) => t.id === v) ? (v as ContactTopic) : null;
};

export default function Contact() {
  useDocumentTitle("Contact Us | DeckRite RV");
  const [params] = useSearchParams();
  const param = params.get("topic");
  const [topic, setTopic] = useState<ContactTopic>(topicFromParam(param) ?? "product");
  useEffect(() => {
    const next = topicFromParam(param);
    if (next) setTopic(next);
  }, [param]);
  const choose = (t: ContactTopic) => { setTopic(t); scrollToId("form"); };
  return (
    <>
      <Hero />
      <Paths topic={topic} onChoose={choose} />
      <FormSection topic={topic} setTopic={setTopic} />
      <MapSection />
      <Resources />
    </>
  );
}
