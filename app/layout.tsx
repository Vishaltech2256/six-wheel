import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const viewport: Viewport = {
  themeColor: '#05222D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'SIX WHEEL HOLIDAYS | Luxury Travel & Bespoke Journeys',
    template: '%s | SIX WHEEL HOLIDAYS',
  },
  description:
    'Private escapes, handpicked stays and seamless travel, designed around you. Journeys crafted beyond the ordinary by Six Wheel Holidays.',
  keywords: [
    'luxury holidays',
    'bespoke travel',
    'private island holidays',
    'private jet escapes',
    'luxury safari',
    'overwater villa booking',
    'sixwheel holidays',
  ],
  authors: [{ name: 'Six Wheel Holidays' }],
  creator: 'Six Wheel Holidays',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sixwheelsholidays.com',
    title: 'SIX WHEEL HOLIDAYS | Journeys, Perfectly in Motion',
    description:
      'Private escapes, handpicked stays and seamless travel, designed around you.',
    siteName: 'Six Wheel Holidays',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'SIX WHEEL HOLIDAYS Official Badge Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIX WHEEL HOLIDAYS | Journeys, Perfectly in Motion',
    description:
      'Private escapes, handpicked stays and seamless travel, designed around you.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-navy text-ivory antialiased selection:bg-amber/30 selection:text-amber-light flex flex-col font-sans">
        <CurrencyProvider>
          <WishlistProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'TravelAgency',
                  name: 'SIX WHEEL HOLIDAYS',
                  alternateName: 'Six Wheel Luxury Travel',
                  url: 'https://sixwheelsholidays.com',
                  logo: 'https://sixwheelsholidays.com/logo.png',
                  description:
                    'Private escapes, handpicked stays and seamless travel, designed around you. Journeys, Perfectly in Motion.',
                  priceRange: '$$$$',
                  openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-24:00',
                  telephone: '+91 76393 41779, +91 77083 93572',
                  email: 'concierge@sixwheelsholidays.com',
                }),
              }}
            />

            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </WishlistProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
