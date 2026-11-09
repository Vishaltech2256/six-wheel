# SIX WHEELS HOLIDAYS

> **"Journeys, Perfectly in Motion."**  
> A boutique luxury holiday booking atelier designing seamless, high-end private escapes.

---

## 1. Visual Brand & Palette Tokens

Extracted directly from Mediterranean and private island coastlines:

| Color Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Ocean Teal** | `#0C4E66` (`#05222D` dark base) | Primary background & midnight canvas |
| **Coastal Cerulean** | `#407F9E` | Secondary ocean accents, active tabs, maritime indicators |
| **Pale Shell Sand** | `#E2CACA` | Soft delicate light accents, tags, badges |
| **Warm Terracotta Sand** | `#D7A896` | Warm beach borders, card outlines, subtle dividers |
| **Golden Amber / Caramel** | `#B57C51` | Primary luxury accent, buttons, six-spoke wheel emblem |
| **Ivory** | `#FAF7F4` | Editorial heading and body text on dark backgrounds |

---

## 2. Tech Stack

- **Framework**: Next.js 14 App Router + TypeScript
- **Styling**: Tailwind CSS with custom design tokens & CSS variables
- **Typography**: Cormorant Garamond (refined serif headings) & Inter (UI/body)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Effects**: Glassmorphism, lightbox image gallery, live currency switcher, persistent wishlist
- **SEO**: Dynamic JSON-LD structured data (`TravelAgency`, `TouristTrip`), Open Graph, Twitter cards, robots.txt, dynamic sitemap.xml

---

## 3. Architecture & Project Structure

```text
├── app/
│   ├── layout.tsx                # Root layout with font imports, metadata, schema.org JSON-LD
│   ├── page.tsx                  # Home page (Hero, Trust, Sanctums, Collections, How it Works, Stats, Reviews, Journal)
│   ├── destinations/             # Filterable catalog & [slug] dynamic sanctum details
│   ├── packages/                 # Signature journeys catalog & [slug] day-by-day itineraries
│   ├── hotels/                   # Stays & palaces catalog & [slug] room tier details
│   ├── booking/                  # 5-step interactive booking engine with live summary sidebar
│   ├── plan-my-journey/          # Bespoke trip inquiry questionnaire with confirmation
│   ├── account/                  # Saved sanctums (wishlist), my bookings, traveler dossier
│   ├── journal/                  # Editorial luxury travel magazine & [slug] articles
│   ├── about/                    # Brand story, six-spoke wheel philosophy, leadership team
│   ├── contact/                  # Mayfair chambers, direct concierge hotline & message dispatch
│   ├── faq/                      # Categorized luxury travel inquiries accordion
│   ├── terms/                    # Terms & financial bonding details
│   ├── privacy/                  # Client discretion & privacy protocol
│   ├── cancellation-policy/      # 45-day flexibility & guarantee schedule
│   ├── not-found.tsx             # Custom branded 404 page
│   ├── robots.ts                 # SEO robots protocol
│   └── sitemap.ts                # Auto-generated XML sitemap across 63+ routes
├── components/
│   ├── brand/                    # WheelEmblem (SVG 6-spoke wheel), Logo variants
│   ├── cards/                    # DestinationCard, PackageCard, HotelCard, TestimonialCard
│   ├── layout/                   # Navbar (blur on scroll, mega-menu, mobile drawer), Footer
│   ├── sections/                 # HeroSection, TrustStrip, HowItWorks, CuratedCollections, ConciergeBanner
│   └── ui/                       # GlassSearchBar, LightboxGallery, StatCounter, CurrencySwitcher, WishlistButton, WhatsAppConcierge, CookieConsent
├── context/
│   ├── CurrencyContext.tsx       # Live currency converter (USD, EUR, GBP, INR)
│   └── WishlistContext.tsx       # LocalStorage synchronized saved journeys
├── data/
│   ├── destinations.ts           # 12 luxury destinations (Maldives, Alps, Kyoto, Amalfi, Serengeti, etc.)
│   ├── packages.ts               # 15+ signature packages with day-by-day itineraries & villa tiers
│   ├── hotels.ts                 # 12 handpicked five-star hotels & private island resorts
│   ├── reviews.ts                # 9 verified traveler reflections
│   ├── testimonials.ts           # Featured patron testimonials
│   ├── blog.ts                   # 3 editorial long-form articles
│   └── faqs.ts                   # Essential concierge FAQs
└── types/                        # Strongly-typed TypeScript interfaces
```

---

## 4. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Start production server
npm run start
```

The application runs at `http://localhost:3000`.

---

## 5. How to Edit Content

- **Destinations**: Add or modify destinations in `/data/destinations.ts`.
- **Packages & Itineraries**: Update day-by-day itineraries, villa tiers, or add-ons in `/data/packages.ts`.
- **Hotels**: Update rooms, amenities, and nightly prices in `/data/hotels.ts`.
- **Journal Articles**: Add new essays in `/data/blog.ts`.
- **Currencies**: Adjust exchange rates in `/lib/currency.ts`.

---

## 6. How to Connect a Real Backend

The data layer in `/data` is typed to match REST or GraphQL API responses:
1. Replace static imports in `/data/index.ts` with API fetch calls (e.g. `fetch('https://api.sixwheelsholidays.com/destinations')`).
2. Replace mock checkout in `/app/booking/BookingClient.tsx` with Stripe Elements or Adyen SDK.
3. Replace the bespoke inquiry in `/app/plan-my-journey/PlanMyJourneyClient.tsx` with a webhook endpoint (e.g. Supabase, HubSpot CRM, or Salesforce).

