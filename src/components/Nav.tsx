import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, BookOpen, CaretDown, List, MapPin, Phone, SealCheck, X } from "@phosphor-icons/react";
import { getApplication } from "../data/applications";
import { SITE, contactLink } from "../data/site";
import WarrantyLink from "./WarrantyLink";
import SocialLinks from "./SocialLinks";
import Logo from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;
const APP_ORDER = ["interiors", "sport-utility", "ramp-deck"] as const;
const APPS = APP_ORDER.map((slug) => getApplication(slug)!);

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink to={to} className={({ isActive }) => `group relative text-sm transition ${isActive ? "text-white" : "text-white/75 hover:text-white"}`}>
      {({ isActive }) => (
        <>
          {children}
          <span className={`absolute -bottom-1 left-0 h-px bg-brand-light transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
        </>
      )}
    </NavLink>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const barRef = useRef<HTMLDivElement>(null);
  const lastPointer = useRef("mouse");
  const location = useLocation();
  const appsActive = location.pathname.startsWith("/application");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAppsOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setAppsOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const openApps = () => { window.clearTimeout(closeTimer.current); setAppsOpen(true); };
  const closeAppsSoon = () => { closeTimer.current = window.setTimeout(() => setAppsOpen(false), 180); };
  // Hover only applies to a real mouse. Touch screens emit emulated mouse-enter events
  // that would open the menu and then immediately toggle it shut on the same tap.
  const hoverOpen = (e: { pointerType: string }) => { if (e.pointerType === "mouse") openApps(); };
  const hoverClose = (e: { pointerType: string }) => { if (e.pointerType === "mouse") closeAppsSoon(); };

  // On touch, a tap anywhere outside the header closes the open menu.
  useEffect(() => {
    if (!appsOpen) return;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && barRef.current && !barRef.current.contains(e.target as Node)) setAppsOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [appsOpen]);
  const solid = scrolled || appsOpen;

  return (
    <motion.header initial={{ y: -90 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease }} className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar - collapses once the page scrolls */}
      <div className={`hidden overflow-hidden bg-ink/70 backdrop-blur-md transition-all duration-500 md:block ${scrolled ? "max-h-0 opacity-0" : "max-h-12 border-b border-white/10 opacity-100"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-white/60">
          <div className="flex items-center gap-6">
            <a href={SITE.phone.href} className="flex items-center gap-2 transition hover:text-white">
              <Phone size={14} weight="duotone" className="text-brand-light" /> Toll free
              <span className="font-semibold tracking-wide text-white/90">{SITE.phone.vanity}</span> ({SITE.phone.digits})
            </a>
            <span className="hidden items-center gap-2 lg:flex"><MapPin size={14} weight="duotone" className="text-brand-light" /> North Little Rock, Arkansas</span>
          </div>
          <div className="flex items-center gap-5">
            <WarrantyLink className="flex items-center gap-2 transition hover:text-white">
              <SealCheck size={14} weight="duotone" className="text-brand-light" /> Warranty <span className="text-white/35">PDF</span>
            </WarrantyLink>
            <Link {...contactLink("brochure")} className="flex items-center gap-2 transition hover:text-white">
              <BookOpen size={14} weight="duotone" className="text-brand-light" /> Free brochure
            </Link>
            <span className="h-3 w-px bg-white/20" />
            <SocialLinks size={14} itemClassName="text-white/50 hover:text-white" />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div ref={barRef} className={`relative z-50 transition-all duration-500 ${solid && !menuOpen ? "bg-ink/90 py-3 backdrop-blur-xl" : "py-5"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link to="/" className="block" aria-label="DeckRite RV home">
            <Logo variant="nav" />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            <div className="relative" onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={appsOpen}
                onPointerDown={(e) => { lastPointer.current = e.pointerType; }}
                onClick={(e) => (e.detail > 0 && lastPointer.current === "mouse" ? setAppsOpen(true) : setAppsOpen((v) => !v))}
                className={`group relative flex items-center gap-1.5 text-sm transition ${appsActive || appsOpen ? "text-white" : "text-white/75 hover:text-white"}`}
              >
                Applications
                <CaretDown size={12} weight="bold" className={`transition-transform duration-300 ${appsOpen ? "rotate-180" : ""}`} />
                <span className={`absolute -bottom-1 left-0 h-px bg-brand-light transition-all duration-300 ${appsActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            </div>
            <NavItem to="/who-we-are">Who We Are</NavItem>
            <NavItem to="/faqs">FAQs</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Link {...contactLink("retailer")} className="group relative overflow-hidden bg-brand px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white">
              <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">Find a Retailer</span>
            </Link>
          </div>

          <button type="button" onClick={() => setMenuOpen((v) => !v)} className="relative flex h-11 w-11 items-center justify-center text-white lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={26} /> : <List size={26} />}
          </button>
        </div>

        {/* Applications mega menu */}
        <AnimatePresence>
          {appsOpen && (
            <motion.div
              onPointerEnter={hoverOpen}
              onPointerLeave={hoverClose}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              className="absolute inset-x-0 top-full hidden pt-2 lg:block"
            >
              <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-[1fr_1fr_1fr_0.85fr] gap-3 border border-white/10 bg-[#17181b] p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
                  {APPS.map((a, i) => (
                    <motion.div key={a.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.06, duration: 0.45, ease }}>
                      <Link to={`/application/${a.slug}`} className="group relative block h-52 overflow-hidden">
                        <img src={a.banner} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <div className="text-[10px] uppercase tracking-[0.3em] text-brand-light">{a.navLabel}</div>
                          <div className="mt-1 text-lg font-bold text-white">{a.product}</div>
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-white/60 transition group-hover:text-white">
                            Explore <ArrowRight size={12} weight="bold" className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  <div className="flex flex-col justify-between p-5">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Not sure which fits?</div>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">Shield RV for rugged garages, Plank for ramps & decks, ULTRA for living areas.</p>
                    </div>
                    <Link to="/faqs" className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-light">
                      Read the FAQs <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink lg:hidden"
          >
            <div className="grain pointer-events-none absolute inset-0" />
            <div className="relative flex min-h-full flex-col px-6 pb-10 pt-36 sm:pt-44">
              <div className="text-[10px] uppercase tracking-[0.35em] text-brand-light">Applications</div>
              <div className="mt-4 grid gap-2">
                {APPS.map((a, i) => (
                  <motion.div key={a.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }}>
                    <Link to={`/application/${a.slug}`} className="flex items-center gap-4 border-b border-white/10 py-3">
                      <img src={a.colors[0].thumb} alt="" className="h-12 w-12 object-cover" />
                      <div>
                        <div className="text-xl font-bold text-white">{a.navLabel}</div>
                        <div className="text-xs text-white/50">{a.product}</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 grid gap-1">
                {[["Who We Are", "/who-we-are"], ["FAQs", "/faqs"], ["Contact", "/contact"]].map(([label, to], i) => (
                  <motion.div key={to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                    <Link to={to} className="block py-2 text-4xl font-extrabold tracking-tight text-white">{label}</Link>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap gap-3 text-sm">
                <WarrantyLink className="flex items-center gap-2 border border-white/15 px-4 py-3 text-white/80"><SealCheck size={16} weight="duotone" className="text-brand-light" /> Warranty (PDF)</WarrantyLink>
                <Link {...contactLink("brochure")} className="flex items-center gap-2 border border-white/15 px-4 py-3 text-white/80"><BookOpen size={16} weight="duotone" className="text-brand-light" /> Free brochure</Link>
              </motion.div>
              <div className="mt-auto pt-12">
                <a href={SITE.phone.href} className="block bg-brand px-6 py-5 text-center text-white">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">Toll free</div>
                  <div className="mt-1 text-2xl font-extrabold tracking-wide">{SITE.phone.vanity}</div>
                </a>
                <SocialLinks size={22} className="mt-6 justify-center gap-6" itemClassName="text-white/60 hover:text-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
