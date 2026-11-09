export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // multiplier against USD base
}

export type TravelStyle =
  | 'Honeymoon'
  | 'Family Escapes'
  | 'Adventure'
  | 'Wellness Retreats'
  | 'Private Islands'
  | 'Cultural Journeys'
  | 'Road & Rail Journeys'
  | 'Wildlife & Safari';

export type Region =
  | 'Indian Ocean'
  | 'Europe & Mediterranean'
  | 'Asia & Far East'
  | 'Africa'
  | 'Middle East'
  | 'Nordics & Polar';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: Region;
  heroImage: string;
  gallery: string[];
  tagline: string;
  description: string;
  bestTime: string;
  climate: string;
  highlights: string[];
  travelStyles: TravelStyle[];
  startingPrice: number; // in USD
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string[];
  stay: string;
  activities: string[];
}

export interface VillaTier {
  id: string;
  name: string;
  description: string;
  priceDiffPerNight: number; // in USD
  image: string;
  capacity: string;
  sqm: number;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number; // in USD
  perPerson: boolean;
  iconName: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  destinationId: string;
  durationDays: number;
  price: number; // in USD base
  currency: CurrencyCode;
  heroImage: string;
  gallery: string[];
  tagline: string;
  overview: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  stays: {
    hotelId: string;
    hotelName: string;
    nights: number;
    roomType: string;
  }[];
  roomTiers: VillaTier[];
  addOns: AddOn[];
  maxGuests: number;
  rating: number;
  reviewsCount: number;
  tags: string[];
  travelStyle: TravelStyle;
  featured?: boolean;
}

export interface HotelRoom {
  id: string;
  name: string;
  size: string;
  bedType: string;
  capacity: string;
  pricePerNight: number; // in USD
  image: string;
  amenities: string[];
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  destinationName: string;
  stars: number;
  location: string;
  description: string;
  amenities: string[];
  rooms: HotelRoom[];
  pricePerNight: number; // in USD
  images: string[];
  heroImage: string;
  rating: number;
  reviewsCount: number;
  highlights: string[];
  mealPlan: string;
}

export interface BookingGuestDetails {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
  dietaryPreferences?: string;
}

export interface BookingGuestCount {
  adults: number;
  children: number;
  infants: number;
}

export interface BookingDates {
  startDate: string; // ISO string
  endDate: string;
}

export interface BookingSummary {
  reference: string;
  packageId: string;
  packageTitle: string;
  destinationName: string;
  durationDays: number;
  dates: BookingDates;
  guests: BookingGuestCount;
  selectedVillaTierId?: string;
  selectedVillaTierName?: string;
  selectedAddOns: string[];
  guestDetails: BookingGuestDetails;
  pricing: {
    basePackagePrice: number;
    villaUpgradeTotal: number;
    addOnsTotal: number;
    subtotal: number;
    taxesAndConciergeFee: number;
    discountAmount: number;
    promoCodeApplied?: string;
    grandTotal: number;
    currency: CurrencyCode;
  };
  paymentMethod: {
    cardBrand: string;
    last4: string;
  };
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  tripTaken: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  trip: string;
  image: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  excerpt: string;
  sections: {
    heading?: string;
    body: string;
    image?: string;
    imageCaption?: string;
  }[];
}

export interface BespokeEnquiry {
  destinationPreferences: string[];
  travelStyle: TravelStyle[];
  datesFlexibility: string;
  estimatedDates: {
    from: string;
    to: string;
  };
  durationDays: number;
  adults: number;
  children: number;
  budgetPerPerson: string;
  celebrations: string;
  specialWishes: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    preferredContactMethod: 'email' | 'phone' | 'whatsapp';
  };
}
