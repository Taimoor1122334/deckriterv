import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { Link } from "react-router-dom";
import { scrollToId } from "../lib/utils";

export const ease = [0.22, 1, 0.36, 1] as const;

export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom leading-none pt-[0.06em] pb-[0.16em] mr-[0.25em]">
          <motion.span className="inline-block" initial={{ y: "110%" }} animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}>{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, ease, delay }}>{children}</motion.div>
  );
}

type BtnProps = {
  children: ReactNode;
  variant?: "red" | "ghost" | "light" | "dark";
  /** Router path (e.g. "/faqs") */
  to?: string;
  state?: unknown;
  /** Section id on the current page */
  scrollTo?: string;
  /** External, tel: or mailto: URL */
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Btn({ children, variant = "red", to, state, scrollTo, href, external, onClick, className = "" }: BtnProps) {
  const s = { red: "bg-brand text-white", ghost: "border border-white/40 text-white", light: "border border-ink/20 text-ink", dark: "bg-ink text-white" }[variant];
  const cls = `group relative inline-flex items-center gap-3 overflow-hidden px-7 py-4 text-sm font-semibold tracking-wide uppercase ${s} ${className}`;
  const inner = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
      <span className="relative">{children}</span>
      <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
    </>
  );
  if (to) return <Link to={to} state={state} onClick={onClick} className={cls}>{inner}</Link>;
  if (scrollTo) return <button type="button" onClick={() => { scrollToId(scrollTo); onClick?.(); }} className={cls}>{inner}</button>;
  return (
    <a href={href} onClick={onClick} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <Reveal>
      <p className={`mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] ${light ? "text-brand-light" : "text-brand"}`}>
        <span className="h-px w-10 bg-brand" /> {children}
      </p>
    </Reveal>
  );
}
