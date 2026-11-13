// The five FAQs from https://deckriterv.com/faqs - questions and answers kept
// verbatim. Only two typos were corrected: "can be handle" -> "can be handled"
// and "Deckrite" -> "DeckRite".
export type FaqVisual = "products" | "retailers" | "care" | "install" | "seams";
export type Faq = { id: string; topic: string; q: string; a: string; visual: FaqVisual };

export const FAQS: Faq[] = [
  {
    id: "applications",
    topic: "Applications",
    q: "Does DeckRite RV provide flooring products for various RV applications?",
    a: "Yes. Depending on the application project you have, DeckRite RV likely has a product to meet your needs. Shield RV is great for more rugged applications that may require optimal slip resistance. DeckRite Plank is ideal for ramps, decks and inside toy hauler garages. The DeckRite Ultra products give the living areas of your RV a look and feel few can compare with.",
    visual: "products",
  },
  {
    id: "availability",
    topic: "Availability",
    q: "Who is DeckRite RV flooring supplied to?",
    a: "DeckRite RV supplies flooring to original equipment manufacturers, including coaches such as those built by Winnebago, Airstream and Rich Trailers. Online listing is limited to two authorized retailers. For specifications or an OEM program, call DeckRite toll free (888) 450-3325.",
    visual: "retailers",
  },
  {
    id: "maintenance",
    topic: "Maintenance",
    q: "Do DeckRite RV products require excessive maintenance?",
    a: "No. 99% of the maintenance requirements are very low and can be handled with a broom or possibly a wet mop. Cleaning requires the same effort you might use to clean a kitchen floor. If the clean-up requires a more aggressive approach, chances are it will still be quick and easy. Contact DeckRite for recommendations on tough clean-up projects.",
    visual: "care",
  },
  {
    id: "installation",
    topic: "Installation",
    q: "Do you need a qualified installer to apply the Product?",
    a: "No. Installing DeckRite RV products is simple and straight forward. There are no unique tools required for the installation. Tools required are a utility knife, straight edge, measuring tape and a paint roller and handle.",
    visual: "install",
  },
  {
    id: "seaming",
    topic: "Seaming",
    q: "Is there any seaming requirements for the DeckRite RV product?",
    a: "No. The DeckRite RV products are manufactured 102” wide which should be wide enough to eliminate the need for seaming in any RV application.",
    visual: "seams",
  },
];

/** Splits "Yes. rest…" into a verdict and the remaining sentence(s) - same words, styled separately. */
export function splitVerdict(a: string) {
  const m = a.match(/^(Yes|No)\.\s+(.*)$/s);
  return m ? { verdict: m[1], rest: m[2] } : { verdict: null, rest: a };
}
