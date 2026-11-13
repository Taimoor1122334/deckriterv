import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Btn, Reveal, SplitText } from "./anim";
import { SITE } from "../data/site";
import * as A from "../assets/images";

type CtaProps = {
  id?: string;
  eyebrow?: string;
  titleA?: string;
  titleB?: string;
  text?: string;
  action?: { label: string; to: string; state?: unknown };
  image?: string;
};

export default function CtaSection({
  id = "cta",
  eyebrow = "Built for OEM partners",
  titleA = "Specify the floor.",
  titleB = "We'll build it.",
  text = `DeckRite RV flooring is supplied to original equipment manufacturers. Online listing is limited to two authorized retailers. Call ${SITE.phone.pretty} to talk with our OEM team.`,
  action,
  image = A.heroDesktop,
}: CtaProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useSpring(useTransform(scrollYProgress, [0, 1], [0.85, 1]), { stiffness: 80, damping: 20 });
  const r = useTransform(scrollYProgress, [0, 1], [48, 0]);
  return (
    <section id={id} ref={ref} className="bg-paper px-0 pb-0">
      <motion.div style={{ scale: p, borderRadius: r }} className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-25"><img src={image} alt="" className="h-full w-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-brand/40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-28 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-brand-light">— {eyebrow}</p>
            <h2 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white md:text-7xl">
              <SplitText text={titleA} /><br /><SplitText text={titleB} delay={0.2} className="font-serif italic font-normal text-brand-light" />
            </h2>
            <Reveal delay={0.3}><p className="mt-6 max-w-md text-white/60">{text}</p></Reveal>
            {action && <Reveal delay={0.4} className="mt-8"><Btn to={action.to} state={action.state} variant="ghost">{action.label}</Btn></Reveal>}
          </div>
          <Reveal delay={0.4} className="md:justify-self-end">
            <a href={SITE.phone.href} aria-label={`Call ${SITE.phone.pretty}`} className="group relative flex h-48 w-48 items-center justify-center rounded-full bg-brand text-center text-sm font-bold uppercase tracking-widest text-white transition-transform duration-500 hover:scale-110">
              <svg className="spin absolute inset-0 h-full w-full" viewBox="0 0 200 200" aria-hidden="true">
                <defs><path id={`c-${id}`} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
                <text fill="rgba(255,255,255,0.6)" fontSize="11" letterSpacing="4"><textPath href={`#c-${id}`}>CALL 888-450-DECK • TOLL FREE • DECKRITE RV •</textPath></text>
              </svg>
              <span className="text-3xl transition-transform group-hover:rotate-45">↗</span>
            </a>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
