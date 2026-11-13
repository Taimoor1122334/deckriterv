import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Phone, SealCheck } from "@phosphor-icons/react";
import { ADDRESS_LINE, MAPS, SITE, contactLink } from "../data/site";
import WarrantyLink from "./WarrantyLink";
import SocialLinks from "./SocialLinks";
import Logo from "./Logo";

const linkCls = "text-white/60 transition hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link to="/" className="inline-block" aria-label="DeckRite RV home"><Logo variant="footer" /></Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">Rugged, functional vinyl flooring with comfort and contemporary style for RV interiors, toy hauler garages, trailers, ramps and decks.</p>
            <div className="mt-8 space-y-3 text-sm">
              <a href={SITE.phone.href} className="flex items-center gap-3 text-white transition hover:text-brand-light">
                <Phone size={18} weight="duotone" className="text-brand-light" />
                <span className="text-lg font-bold tracking-wide">{SITE.phone.vanity}</span> <span className="text-white/50">({SITE.phone.digits})</span>
              </a>
              <a href={MAPS.directions} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition hover:text-white">
                <MapPin size={18} weight="duotone" className="mt-0.5 shrink-0 text-brand-light" />
                <span>{SITE.company}<br />{ADDRESS_LINE}</span>
              </a>
            </div>
            <SocialLinks size={20} className="mt-8 gap-5" itemClassName="text-white/50 hover:text-white" />
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <span className="mb-1 text-xs uppercase tracking-widest text-white/35">Applications</span>
              <Link to="/application/interiors" className={linkCls}>Interiors</Link>
              <Link to="/application/sport-utility" className={linkCls}>Sport / Utility Trailers</Link>
              <Link to="/application/ramp-deck" className={linkCls}>Ramp / Deck</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="mb-1 text-xs uppercase tracking-widest text-white/35">Company</span>
              <Link to="/who-we-are" className={linkCls}>Who We Are</Link>
              <Link to="/faqs" className={linkCls}>FAQs</Link>
              <Link to="/contact" className={linkCls}>Contact Us</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="mb-1 text-xs uppercase tracking-widest text-white/35">Support</span>
              <WarrantyLink className={`${linkCls} inline-flex items-center gap-2`}>
                <SealCheck size={15} weight="duotone" className="text-brand-light" /> Warranty <span className="text-white/30">PDF</span>
              </WarrantyLink>
              <Link {...contactLink("brochure")} className={linkCls}>Free PDF Brochure</Link>
              <Link {...contactLink("oem")} className={linkCls}>OEM Inquiry</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-8 text-xs md:flex-row">
          <span>© {new Date().getFullYear()} {SITE.company}. All rights reserved.</span>
          <span className="flex gap-6">
            {SITE.sister.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition hover:text-white">
                {s.name} <ArrowUpRight size={12} />
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
