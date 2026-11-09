import { FacebookLogo, InstagramLogo, XLogo } from "@phosphor-icons/react";
import { SITE } from "../data/site";

const ICONS = { Facebook: FacebookLogo, "X (Twitter)": XLogo, Instagram: InstagramLogo } as const;

export default function SocialLinks({ size = 18, className = "", itemClassName = "" }: { size?: number; className?: string; itemClassName?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SITE.social.map((s) => {
        const Icon = ICONS[s.name];
        return (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`DeckRite RV on ${s.name}`} className={`transition ${itemClassName}`}>
            <Icon size={size} weight="fill" />
          </a>
        );
      })}
    </div>
  );
}
