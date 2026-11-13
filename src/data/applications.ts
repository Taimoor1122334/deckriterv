import {
  Drop, Ruler, Stack, Tire, Footprints, ShieldCheck, Scales, Wrench, SunHorizon, Boat,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import * as A from "../assets/images";

export type AppSpec = { icon: PhosphorIcon; value: string; label: string };
export type AppFeature = { icon: PhosphorIcon; title: string; desc: string };
export type AppColor = { name: string; group: string; thumb: string; img: string; tint: string };

export type Application = {
  slug: string;
  navLabel: string;
  product: string;
  eyebrow: string;
  title: [string, string, string];
  tagline: string;
  hero: string;
  banner: string;
  bannerCaption: string;
  lifestyle: string;
  lifestyleTitle: string;
  lifestyleText: string;
  intro: string[];
  statement: string;
  specs: AppSpec[];
  features: AppFeature[];
  colors: AppColor[];
  install: { title: string; desc: string; tools: string[] };
  relatedNote: string;
};

export const APPLICATIONS: Application[] = [
  {
    slug: "sport-utility",
    navLabel: "Sport / Utility Trailers",
    product: "Shield RV",
    eyebrow: "Sport / Utility Trailers",
    title: ["Shield RV.", "Built for the", "tough stuff."],
    tagline: "3 mm Diamond Plate or 2.15 mm Raised Coin — engineered to resist the rigors of tougher environments and applications.",
    hero: A.pageSportHero,
    banner: A.bannerSport,
    bannerCaption: "Diamond plating inside a toy hauler",
    lifestyle: A.lifeSport,
    lifestyleTitle: "Garage floors, enclosed & cargo trailers, small and micro campers.",
    lifestyleText: "Shield RV is manufactured with virgin PVC and high-tech polymeric plasticizers for long-term flexibility and performance. The PVC film is extruded onto a non-woven polyester backing that provides dimensional stability and a superior adhering substrate to wood or aluminum. Standard rolls run 102\" wide (8.5') × 100' long — shorter rolls are available on request.",
    intro: [
      "DeckRite offers the Shield RV product in a variety of colors and embossing designs. Shield RV in either 3mm Diamond Plate or 2.15mm Raised Coin is engineered to resist the rigors of tougher environments and applications.",
      "Common uses for Shield RV are on the garage floors of Toy Haulers, in Enclosed Trailers, Cargo Trailers and in Small and Micro Campers.",
    ],
    statement: "When the floor takes a beating, Shield RV takes it in stride.",
    specs: [
      { icon: Ruler, value: "3 mm / 2.15 mm", label: "Diamond / coin emboss" },
      { icon: ShieldCheck, value: "Virgin PVC", label: "Flexible & durable" },
      { icon: Stack, value: "102\" × 100'", label: "Standard rolls" },
      { icon: Footprints, value: "Slip resistant", label: "Rugged applications" },
    ],
    features: [
      { icon: Tire, title: "Toy hauler garage floors", desc: "Handles tires, tools, fuel and gear without showing the wear of a season on the trail." },
      { icon: Stack, title: "Enclosed & cargo trailers", desc: "A hard-wearing surface for work trailers that see daily loading and unloading." },
      { icon: Scales, title: "Small & micro campers", desc: "Compact campers get the same rugged protection in a lighter-duty package." },
      { icon: ShieldCheck, title: "Wood or aluminum substrate", desc: "The non-woven polyester backing adheres cleanly to wood or aluminum subfloors." },
    ],
    colors: [
      { name: "Black Diamond", group: "Diamond", thumb: A.swBlackDiamondThumb, img: A.swBlackDiamondHd, tint: "#26272a" },
      { name: "Gray Diamond", group: "Diamond", thumb: A.swGrayDiamondThumb, img: A.swGrayDiamondHd, tint: "#8d8f93" },
      { name: "Dark Gray Speckled", group: "Speckled Diamond", thumb: A.swDarkGraySpeckledDiamondThumb, img: A.swDarkGraySpeckledDiamondHd, tint: "#4a4d52" },
      { name: "Light Gray Speckled", group: "Speckled Diamond", thumb: A.swLightGraySpeckledDiamondThumb, img: A.swLightGraySpeckledDiamondHd, tint: "#b9bbbe" },
      { name: "Tan Speckled", group: "Speckled Diamond", thumb: A.swTanSpeckledDiamondThumb, img: A.swTanSpeckledDiamondHd, tint: "#a8957c" },
      { name: "Raised Black Coin", group: "Raised Coin", thumb: A.swRaisedBlackCoinThumb, img: A.swRaisedBlackCoinHd, tint: "#1d1e21" },
      { name: "Raised Gray Coin", group: "Raised Coin", thumb: A.swRaisedGrayCoinThumb, img: A.swRaisedGrayCoinHd, tint: "#77797d" },
    ],
    install: {
      title: "Simple, straight-forward installation",
      desc: "No qualified installer or unique tools required. DeckRite RV products are manufactured 102\" wide — wide enough to eliminate seaming in any RV application.",
      tools: ["Utility knife", "Straight edge", "Measuring tape", "Paint roller & handle"],
    },
    relatedNote: "Every part of the coach has its own floor. Explore the other two applications.",
  },
  {
    slug: "ramp-deck",
    navLabel: "Ramp / Deck",
    product: "DeckRite Plank",
    eyebrow: "Ramp / Deck",
    title: ["DeckRite Plank.", "The ramp that", "feels like home."],
    tagline: "A realistic wood look with the slip resistance and durability you expect — made for exterior decks and ramps.",
    hero: A.pageRampHero,
    banner: A.bannerRamp,
    bannerCaption: "A toy hauler ramp, unfolded into a patio",
    lifestyle: A.lifeRamp,
    lifestyleTitle: "From garage floor to campsite patio — one continuous design.",
    lifestyleText: "Over the years the function of toy hauler ramps has evolved to include using them as exterior decks. Plank delivers a realistic wood look for these installations and at the same time provides the slip resistance and durability you would expect from a more industrial-looking product. It reflects a more relaxing setting and truly makes you feel right at home enjoying the comfort of your deck.",
    intro: [
      "The DeckRite Plank product was created for applications on these exterior decks and ramps. Plank delivers a realistic wood look for these installations and at the same time provides the slip resistance and durability you would expect from a more industrial looking product.",
      "DeckRite Plank is available in either Gray or Brown. It is manufactured 102\" wide with standard size rolls 102' long (shorter rolls are available on request). The Plank is constructed with 80 mils of virgin PVC laminated to an 80-gram non-woven polyester backing.",
    ],
    statement: "Use Plank on the garage floor and the deck for a continuous, uninterrupted flow of design.",
    specs: [
      { icon: Ruler, value: "80 mil", label: "Virgin PVC" },
      { icon: Stack, value: "80 g polyester", label: "Backing" },
      { icon: SunHorizon, value: "Gray / Brown", label: "Color options" },
      { icon: Footprints, value: "Slip resistant", label: "Deck & ramp" },
    ],
    features: [
      { icon: SunHorizon, title: "Exterior decks & ramps", desc: "Created for toy hauler ramps folded out as exterior decks — entertaining space or a midday siesta." },
      { icon: Boat, title: "A cozy, relaxing setting", desc: "Reflects a more relaxing setting, not an industrial one — right at home on the campsite." },
      { icon: Stack, title: "Continuous design flow", desc: "Use Plank in the garage and on the deck to create the illusion of more space — well planned, not an afterthought." },
      { icon: Ruler, title: "102\" wide, no seams", desc: "Manufactured 102\" wide — wide enough to eliminate the need for seaming in any RV application." },
    ],
    colors: [
      { name: "Brown Plank", group: "DeckRite Plank", thumb: A.swBrownPlankThumb, img: A.swBrownPlankHd, tint: "#7a5c42" },
      { name: "Gray Plank", group: "DeckRite Plank", thumb: A.swGrayPlankThumb, img: A.swGrayPlankHd, tint: "#8a8578" },
    ],
    install: {
      title: "One material, inside and out",
      desc: "Running Plank from the garage floor onto the ramp or deck gives RV designers the continuous, uninterrupted flow they strive for. 102\" wide rolls mean no seaming in any RV application.",
      tools: ["Utility knife", "Straight edge", "Measuring tape", "Paint roller & handle"],
    },
    relatedNote: "Every part of the coach has its own floor. Explore the other two applications.",
  },
  {
    slug: "interiors",
    navLabel: "Interiors",
    product: "DeckRite ULTRA Woven PVC",
    eyebrow: "RV Interiors",
    title: ["ULTRA Woven PVC.", "Luxury under", "every step."],
    tagline: "Luxurious woven patterns, feet-friendly comfort and a touch of elegance for your RV investment.",
    hero: A.pageInteriorsHero,
    banner: A.bannerInteriors,
    bannerCaption: "Woven PVC through the living space",
    lifestyle: A.lifeInteriors,
    lifestyleTitle: "A living area that feels few can compare with.",
    lifestyleText: "Woven PVC flooring is changing the way consumers think of flooring in the RV and marine industries. ULTRA represents the pinnacle of innovative design and feet-friendly comfort. ULTRA-FB is engineered for applications where an attractive woven flooring is required at a comfortable price.",
    intro: [
      "DeckRite ULTRA Woven PVC flooring provides luxurious patterns that complement any RV interior décor. They are unique and comfortable and can add a touch of elegance to your RV investment.",
      "ULTRA is available in two construction options: DeckRite ULTRA is woven PVC laminated to a 5mm (1/4\"+/-) foam, or DeckRite ULTRA-FB is woven PVC laminated to an 80-gram non-woven polyester backing.",
    ],
    statement: "The living areas of your RV, with a look and feel few can compare with.",
    specs: [
      { icon: Stack, value: "Woven PVC", label: "Construction" },
      { icon: Drop, value: "5 mm foam", label: "ULTRA backing" },
      { icon: Stack, value: "80 g", label: "ULTRA-FB backing" },
      { icon: Scales, value: "8 patterns", label: "Colors & designs" },
    ],
    features: [
      { icon: Scales, title: "8 patterns", desc: "Gray Jute, Tan Jute, Hempshire, Tan Teak, Gray Teak, Colonial, Pillar Gray and Pillar Tan." },
      { icon: Drop, title: "Feet-friendly comfort", desc: "The 5mm foam-backed ULTRA is the pinnacle of comfort underfoot; ULTRA-FB hits a comfortable price." },
      { icon: SunHorizon, title: "Complements any décor", desc: "Luxurious patterns designed to work with the interior décor of towable trailers and fifth wheels alike." },
      { icon: Wrench, title: "RV & marine proven", desc: "The same woven PVC technology trusted in RVs and boats — pontoons, fishing and sport boats." },
    ],
    colors: [
      { name: "Gray Jute", group: "ULTRA Woven", thumb: A.swGrayJuteThumb, img: A.swGrayJuteHd, tint: "#8d8f93" },
      { name: "Tan Jute", group: "ULTRA Woven", thumb: A.swTanJuteThumb, img: A.swTanJuteHd, tint: "#a8957c" },
      { name: "Hempshire", group: "ULTRA Woven", thumb: A.swHempshireThumb, img: A.swHempshireHd, tint: "#9b8a70" },
      { name: "Tan Teak", group: "ULTRA Woven", thumb: A.swTanTeakThumb, img: A.swTanTeakHd, tint: "#8a6a4a" },
      { name: "Gray Teak", group: "ULTRA Woven", thumb: A.swGrayTeakThumb, img: A.swGrayTeakHd, tint: "#7d7a74" },
      { name: "Colonial", group: "ULTRA Woven", thumb: A.swColonialThumb, img: A.swColonialHd, tint: "#b0a08a" },
      { name: "Pillar Gray", group: "ULTRA Woven", thumb: A.swPillarGreyThumb, img: A.swPillarGreyHd, tint: "#96989c" },
      { name: "Pillar Tan", group: "ULTRA Woven", thumb: A.swPillarTanThumb, img: A.swPillarTanHd, tint: "#b09a7e" },
    ],
    install: {
      title: "Easy to live with, easier to clean",
      desc: "99% of maintenance is very low — a broom or a wet mop, the same effort as cleaning a kitchen floor. No qualified installer needed; 102\" wide rolls eliminate seaming.",
      tools: ["Utility knife", "Straight edge", "Measuring tape", "Paint roller & handle"],
    },
    relatedNote: "Every part of the coach has its own floor. Explore the other two applications.",
  },
];

export const getApplication = (slug: string) => APPLICATIONS.find((a) => a.slug === slug);
