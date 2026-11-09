export interface FAQItem {
  question: string;
  answer: string;
  category: 'booking' | 'concierge' | 'bespoke' | 'cancellation' | 'travel';
}

export const FAQS: FAQItem[] = [
  {
    category: 'concierge',
    question: 'What does the Six Wheels dedicated 24/7 Concierge provide?',
    answer:
      'From the moment of initial inquiry through to your return home, a dedicated Private Concierge Director is assigned to your journey. They manage VIP tarmac meet-and-greets, handle private aviation and yacht charters, secure tables at fully-booked Michelin restaurants, and arrange discreet medical or personal security accompaniments worldwide.',
  },
  {
    category: 'bespoke',
    question: 'Can any journey or package be completely customized?',
    answer:
      'Yes, all journeys featured on our site serve as immaculate blueprints. Every itinerary can be lengthened, re-routed, paired with private aviation, or tailored to include private family celebrations, multi-generational villas, or specialized academic and culinary masters.',
  },
  {
    category: 'booking',
    question: 'How does payment and reservation security work?',
    answer:
      'Reservations require a 25% confirmation deposit upon itinerary sign-off, with the balance due 60 days prior to departure. All funds are held in ring-fenced client trust accounts with comprehensive financial bonding and ATOL/IATA accreditation.',
  },
  {
    category: 'cancellation',
    question: 'What is your cancellation and flexibility policy?',
    answer:
      'We offer generous flexibility: journeys may be rescheduled or cancelled without penalty up to 45 days prior to arrival for full travel credit or refund minus unrecoverable lodge/charter deposits. Comprehensive luxury cancellation insurance is available with all packages.',
  },
  {
    category: 'travel',
    question: 'Do you arrange private aviation and helicopter connections?',
    answer:
      'Yes. Through our preferred aviation partnerships, we provide seamless point-to-point private jet charters (Citation, Gulfstream, Global Express) as well as private twin-engine helicopter transfers directly to lodge helipads and yacht decks.',
  },
  {
    category: 'bespoke',
    question: 'How far in advance should we begin planning a journey?',
    answer:
      'For peak seasons (Christmas/New Year in the Swiss Alps, cherry blossom season in Kyoto, or the Great Migration in Tanzania), we recommend curating your journey 6 to 12 months in advance to secure the most coveted suites and private concessions.',
  },
];
