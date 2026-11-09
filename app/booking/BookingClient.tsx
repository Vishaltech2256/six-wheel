'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PACKAGES } from '@/data/packages';
import { DESTINATIONS } from '@/data/destinations';
import { Package, AddOn, BookingGuestDetails, BookingGuestCount } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import {
  Calendar,
  Users,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Download,
  CalendarPlus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Plane,
  Heart,
  Tag,
  Lock,
  Printer,
  Compass,
} from 'lucide-react';

export const BookingClient: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { format } = useCurrency();

  const packageIdParam = searchParams.get('packageId') || searchParams.get('pkg') || PACKAGES[0].id;
  const initialAdults = parseInt(searchParams.get('adults') || '2', 10);
  const initialTierId = searchParams.get('tier') || '';
  const initialAddOns = searchParams.get('addons') ? searchParams.get('addons')!.split(',') : [];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPkg, setSelectedPkg] = useState<Package>(
    PACKAGES.find((p) => p.id === packageIdParam) || PACKAGES[0]
  );

  // Step 1: Dates & Guests
  const [startDate, setStartDate] = useState<string>('2026-10-15');
  const [adults, setAdults] = useState<number>(initialAdults);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [selectedTierId, setSelectedTierId] = useState<string>(
    initialTierId || selectedPkg.roomTiers[0]?.id || ''
  );

  // Step 2: Add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(initialAddOns);

  // Step 3: Guest details
  const [guestDetails, setGuestDetails] = useState<BookingGuestDetails>({
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'United Kingdom',
    specialRequests: '',
    dietaryPreferences: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Step 4: Payment details & Promo Code
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 8921');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvv, setCardCvv] = useState<string>('•••');
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  // Step 5: Confirmation Reference
  const [bookingRef, setBookingRef] = useState<string>('SWH-2026-7842');

  // Sync package changes
  useEffect(() => {
    const pkg = PACKAGES.find((p) => p.id === packageIdParam);
    if (pkg) {
      setSelectedPkg(pkg);
      if (!selectedTierId && pkg.roomTiers.length > 0) {
        setSelectedTierId(pkg.roomTiers[0].id);
      }
    }
  }, [packageIdParam, selectedTierId]);

  // Pricing calculations
  const destination = DESTINATIONS.find((d) => d.id === selectedPkg.destinationId);
  const selectedTier =
    selectedPkg.roomTiers.find((t) => t.id === selectedTierId) || selectedPkg.roomTiers[0];
  const nights = selectedPkg.durationDays - 1;
  const tierUpgradeCost = (selectedTier?.priceDiffPerNight || 0) * nights;
  const baseCost = selectedPkg.price * adults;

  const totalAddOns = selectedPkg.addOns
    .filter((a) => selectedAddOns.includes(a.id))
    .reduce((sum, a) => sum + (a.perPerson ? a.price * adults : a.price), 0);

  const subtotal = baseCost + tierUpgradeCost + totalAddOns;
  const conciergeFee = Math.round(subtotal * 0.05); // 5% luxury concierge assurance & taxes
  const grandTotal = Math.max(0, subtotal + conciergeFee - discountAmount);

  // Handle Addon Toggle
  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Promo Code Validation
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'LUXURY2026' || code === 'SIXWHEELS' || code === 'CONCIERGE') {
      setDiscountAmount(500);
      setPromoApplied(code);
    } else {
      alert('Invalid promo voucher code. Try LUXURY2026 for $500 privilege credit.');
    }
  };

  // Validate Step 3
  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (!guestDetails.firstName.trim()) errors.firstName = 'First name is required';
    if (!guestDetails.lastName.trim()) errors.lastName = 'Last name is required';
    if (!guestDetails.email.trim() || !guestDetails.email.includes('@'))
      errors.email = 'Valid email is required';
    if (!guestDetails.phone.trim()) errors.phone = 'Phone number is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      if (!validateStep3()) return;
    }
    if (currentStep === 4) {
      // Generate booking reference
      const randomRef = `SWH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(randomRef);
    }
    setCurrentStep((prev) => Math.min(5, prev + 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Calendar Export ICS trigger
  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SIX WHEELS HOLIDAYS//Luxury Trip Booking//EN
BEGIN:VEVENT
SUMMARY:${selectedPkg.title} - SIX WHEELS HOLIDAYS
DESCRIPTION:Bespoke luxury journey reference ${bookingRef}. Destination: ${destination?.name || 'Exclusive Sanctum'}.
DTSTART:${startDate.replace(/-/g, '')}T090000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${bookingRef}-itinerary.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Progress Header */}
        <div className="space-y-4 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-xs font-sans uppercase tracking-luxury">
            <WheelEmblem size={16} color="#B57C51" animate={currentStep < 5} />
            <span>Reservation Atelier</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
            {currentStep === 5 ? 'Journey Confirmed' : 'Reserve Your Journey'}
          </h1>
          <p className="text-xs sm:text-sm text-stone font-light">
            {currentStep === 5
              ? 'Your Private Travel Director is preparing your custom concierge portfolio.'
              : 'Effortless reservations backed by 24/7 dedicated travel concierge.'}
          </p>

          {/* Stepper Progress Bar */}
          <div className="pt-4">
            <div className="flex items-center justify-between max-w-xl mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-white/10 z-0" />
              <div
                className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-gold transition-all duration-500 z-0"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              />

              {[
                { step: 1, label: 'Itinerary' },
                { step: 2, label: 'Enhance' },
                { step: 3, label: 'Travelers' },
                { step: 4, label: 'Review' },
                { step: 5, label: 'Confirmed' },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex flex-col items-center gap-1.5 relative z-10 bg-navy px-2"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-serif text-xs transition-colors duration-300 border ${
                      currentStep >= s.step
                        ? 'bg-gold text-navy border-gold font-semibold'
                        : 'bg-charcoal text-stone border-white/20'
                    }`}
                  >
                    {s.step}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-sans hidden sm:block ${
                      currentStep >= s.step ? 'text-gold-light font-medium' : 'text-stone'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Step Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Active Step Form */}
          <div className="lg:col-span-8 bg-charcoal/90 border border-gold/30 rounded-refined p-6 sm:p-10 shadow-luxury-lg space-y-8">
            {/* ================= STEP 1: DATES, GUESTS & VILLA TIER ================= */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="eyebrow text-gold">Step 1 of 4</span>
                  <h2 className="font-serif text-2xl text-ivory font-light">
                    Dates & Sanctuary Selection
                  </h2>
                </div>

                {/* Package Card Summary */}
                <div className="flex flex-col sm:flex-row gap-5 p-4 rounded-subtle bg-navy-950/80 border border-white/10">
                  <div className="relative w-full sm:w-36 h-24 rounded-subtle overflow-hidden shrink-0">
                    <Image
                      src={selectedPkg.heroImage}
                      alt={selectedPkg.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gold uppercase tracking-luxury font-semibold">
                      {selectedPkg.travelStyle} • {selectedPkg.durationDays} Days
                    </span>
                    <h3 className="font-serif text-lg text-ivory font-medium">
                      {selectedPkg.title}
                    </h3>
                    <p className="text-xs text-stone line-clamp-1">{selectedPkg.tagline}</p>
                  </div>
                </div>

                {/* Departure Date Selector */}
                <div className="space-y-3">
                  <label className="text-xs text-stone uppercase tracking-wider block font-sans">
                    Preferred Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
                    <input
                      type="date"
                      value={startDate}
                      min="2026-01-01"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-subtle bg-navy-950 border border-white/15 text-xs text-ivory focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-stone">
                    Dates are 100% flexible. Your concierge confirms exact departure flight windows
                    following booking.
                  </p>
                </div>

                {/* Guests Count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-subtle bg-navy-950 border border-white/10 space-y-2">
                    <span className="text-xs text-stone uppercase tracking-wider block">
                      Adult Travelers (Ages 12+)
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg">{adults} Guests</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-subtle border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/20"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(selectedPkg.maxGuests, adults + 1))}
                          className="w-7 h-7 rounded-subtle border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/20"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-subtle bg-navy-950 border border-white/10 space-y-2">
                    <span className="text-xs text-stone uppercase tracking-wider block">
                      Children (Ages 2-11)
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg">{childrenCount} Guests</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-7 h-7 rounded-subtle border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/20"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(childrenCount + 1)}
                          className="w-7 h-7 rounded-subtle border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/20"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Villa / Suite Tier Selection */}
                {selectedPkg.roomTiers.length > 0 && (
                  <div className="space-y-4">
                    <label className="text-xs text-stone uppercase tracking-wider block font-sans">
                      Select Sanctuary Suite Tier
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedPkg.roomTiers.map((tier) => (
                        <div
                          key={tier.id}
                          onClick={() => setSelectedTierId(tier.id)}
                          className={`p-4 rounded-subtle border cursor-pointer transition-all ${
                            selectedTierId === tier.id
                              ? 'bg-gold/15 border-gold shadow-luxury-sm'
                              : 'bg-navy-950/60 border-white/10 hover:border-gold/30'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif text-base text-ivory font-medium">
                              {tier.name}
                            </h4>
                            {selectedTierId === tier.id && (
                              <CheckCircle2 size={16} className="text-gold" />
                            )}
                          </div>
                          <p className="text-xs text-stone mt-1">{tier.description}</p>
                          <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs">
                            <span className="text-stone">{tier.sqm} sqm</span>
                            <span className="text-gold-light font-medium">
                              {tier.priceDiffPerNight === 0
                                ? 'Included in Base'
                                : `+${format(tier.priceDiffPerNight * nights)} total`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= STEP 2: ENHANCE YOUR JOURNEY (ADD-ONS) ================= */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="eyebrow text-gold">Step 2 of 4</span>
                  <h2 className="font-serif text-2xl text-ivory font-light">
                    Enhance Your Experience
                  </h2>
                  <p className="text-xs text-stone font-light">
                    Tailor your journey with private air charters, master tastings, and holistic
                    wellness rituals.
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedPkg.addOns.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-5 rounded-subtle border cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                          isSelected
                            ? 'bg-gold/15 border-gold shadow-luxury-sm'
                            : 'bg-navy-950/60 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-6 h-6 rounded-subtle border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-gold border-gold text-navy'
                                : 'border-stone/40 bg-transparent'
                            }`}
                          >
                            {isSelected && <CheckCircle2 size={14} className="stroke-[3]" />}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-serif text-base text-ivory font-medium">
                              {addon.name}
                            </h4>
                            <p className="text-xs text-stone font-light leading-relaxed max-w-lg">
                              {addon.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-left sm:text-right shrink-0 pl-10 sm:pl-0">
                          <span className="font-serif text-base font-semibold text-gold-light block">
                            +{format(addon.price)}
                          </span>
                          <span className="text-[10px] text-stone uppercase tracking-wider">
                            {addon.perPerson ? 'per traveler' : 'total enhancement'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Travel Insurance Assurance Option */}
                <div className="p-5 rounded-subtle bg-navy-950 border border-gold/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-gold w-5 h-5" />
                    <span className="text-xs uppercase tracking-luxury text-gold-light font-semibold">
                      Six Wheels Comprehensive Journey Guarantee
                    </span>
                  </div>
                  <p className="text-xs text-stone leading-relaxed">
                    All journeys automatically include full ATOL bond insolvency protection and
                    complimentary rescheduling privileges up to 45 days prior to arrival.
                  </p>
                </div>
              </div>
            )}

            {/* ================= STEP 3: GUEST DETAILS ================= */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="eyebrow text-gold">Step 3 of 4</span>
                  <h2 className="font-serif text-2xl text-ivory font-light">Lead Traveler Details</h2>
                  <p className="text-xs text-stone font-light">
                    Used strictly for private transfers, customs clearances, and suite assignments.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Title */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Title
                    </label>
                    <select
                      value={guestDetails.title}
                      onChange={(e) =>
                        setGuestDetails({ ...guestDetails, title: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-subtle bg-navy-950 border border-white/15 text-xs text-ivory focus:outline-none focus:border-gold"
                    >
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                      <option value="Lady">Lady</option>
                      <option value="Lord">Lord</option>
                    </select>
                  </div>

                  {/* First Name */}
                  <div className="sm:col-span-5 space-y-1.5">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={guestDetails.firstName}
                      onChange={(e) =>
                        setGuestDetails({ ...guestDetails, firstName: e.target.value })
                      }
                      placeholder="e.g. Charlotte"
                      className={`w-full px-3.5 py-2.5 rounded-subtle bg-navy-950 border text-xs text-ivory focus:outline-none transition-colors ${
                        formErrors.firstName
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-white/15 focus:border-gold'
                      }`}
                      required
                    />
                    {formErrors.firstName && (
                      <span className="text-[10px] text-red-400">{formErrors.firstName}</span>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="sm:col-span-5 space-y-1.5">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={guestDetails.lastName}
                      onChange={(e) =>
                        setGuestDetails({ ...guestDetails, lastName: e.target.value })
                      }
                      placeholder="e.g. Montague"
                      className={`w-full px-3.5 py-2.5 rounded-subtle bg-navy-950 border text-xs text-ivory focus:outline-none transition-colors ${
                        formErrors.lastName
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-white/15 focus:border-gold'
                      }`}
                      required
                    />
                    {formErrors.lastName && (
                      <span className="text-[10px] text-red-400">{formErrors.lastName}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-6 space-y-1.5">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={guestDetails.email}
                      onChange={(e) =>
                        setGuestDetails({ ...guestDetails, email: e.target.value })
                      }
                      placeholder="charlotte.montague@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-subtle bg-navy-950 border text-xs text-ivory focus:outline-none transition-colors ${
                        formErrors.email
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-white/15 focus:border-gold'
                      }`}
                      required
                    />
                    {formErrors.email && (
                      <span className="text-[10px] text-red-400">{formErrors.email}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-6 space-y-1.5">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={guestDetails.phone}
                      onChange={(e) =>
                        setGuestDetails({ ...guestDetails, phone: e.target.value })
                      }
                      placeholder="+91 76393 41779"
                      className={`w-full px-3.5 py-2.5 rounded-subtle bg-navy-950 border text-xs text-ivory focus:outline-none transition-colors ${
                        formErrors.phone
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-white/15 focus:border-gold'
                      }`}
                      required
                    />
                    {formErrors.phone && (
                      <span className="text-[10px] text-red-400">{formErrors.phone}</span>
                    )}
                  </div>

                  {/* Country */}
                  <div className="sm:col-span-12 space-y-1.5">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      value={guestDetails.country}
                      onChange={(e) =>
                        setGuestDetails({ ...guestDetails, country: e.target.value })
                      }
                      placeholder="e.g. United Kingdom, United States, Switzerland"
                      className="w-full px-3.5 py-2.5 rounded-subtle bg-navy-950 border border-white/15 text-xs text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>

                  {/* Dietary / Special requests */}
                  <div className="sm:col-span-12 space-y-1.5">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Special Requests & Dietary Desires
                    </label>
                    <textarea
                      rows={3}
                      value={guestDetails.specialRequests}
                      onChange={(e) =>
                        setGuestDetails({ ...guestDetails, specialRequests: e.target.value })
                      }
                      placeholder="e.g. Celebrating 20th anniversary, prefer feather-free pillows, allergic to shellfish..."
                      className="w-full p-3.5 rounded-subtle bg-navy-950 border border-white/15 text-xs text-ivory focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 4: REVIEW & PAYMENT (MOCK UI) ================= */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="eyebrow text-gold">Step 4 of 4</span>
                  <h2 className="font-serif text-2xl text-ivory font-light">
                    Review & Confirmation Deposit
                  </h2>
                  <p className="text-xs text-stone font-light">
                    Mock card chamber. No live processing occurs. Your concierge verifies all terms.
                  </p>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter Promo Voucher (e.g. LUXURY2026)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-subtle bg-navy-950 border border-white/15 text-xs text-ivory uppercase focus:outline-none focus:border-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-wider"
                  >
                    Apply Code
                  </button>
                </form>

                {promoApplied && (
                  <div className="p-3 rounded-subtle bg-gold/15 border border-gold/30 text-xs text-gold-light flex items-center gap-2">
                    <Sparkles size={13} className="text-gold" />
                    <span>Promo voucher {promoApplied} applied: $500 privilege deduction.</span>
                  </div>
                )}

                {/* Luxury Mock Card UI */}
                <div className="p-6 rounded-refined bg-gradient-to-br from-charcoal via-navy-900 to-navy-950 border border-gold/40 shadow-luxury-gold space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gold">
                      <CreditCard size={20} />
                      <span className="font-serif text-sm uppercase tracking-widest text-ivory">
                        Black Centurion Reserve
                      </span>
                    </div>
                    <Lock size={14} className="text-stone" />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-stone uppercase tracking-wider block">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-subtle bg-navy-950/80 border border-white/10 text-xs text-ivory tracking-widest font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-stone uppercase tracking-wider block">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardHolder || `${guestDetails.firstName} ${guestDetails.lastName}`}
                          onChange={(e) => setCardHolder(e.target.value)}
                          placeholder="Name on Card"
                          className="w-full px-3 py-2 rounded-subtle bg-navy-950/80 border border-white/10 text-xs text-ivory uppercase"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-stone uppercase tracking-wider block">
                            Expiry
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 rounded-subtle bg-navy-950/80 border border-white/10 text-xs text-ivory text-center"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-stone uppercase tracking-wider block">
                            CVV
                          </label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-3 py-2 rounded-subtle bg-navy-950/80 border border-white/10 text-xs text-ivory text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms agreement */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 accent-gold cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-stone font-light cursor-pointer">
                    I agree to the{' '}
                    <Link href="/terms" className="text-gold-light hover:underline">
                      Six Wheels Booking Terms
                    </Link>{' '}
                    and understand this serves as a priority reservation request subject to
                    director confirmation.
                  </label>
                </div>
              </div>
            )}

            {/* ================= STEP 5: CONFIRMATION ================= */}
            {currentStep === 5 && (
              <div className="space-y-8 animate-fade-in text-center py-4">
                <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto text-gold">
                  <WheelEmblem size={36} color="#B57C51" />
                </div>

                <div className="space-y-2">
                  <span className="eyebrow text-gold text-xs">Reservation Secured</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-light">
                    Your Journey is in Motion
                  </h2>
                  <p className="text-xs sm:text-sm text-stone max-w-md mx-auto">
                    Your booking reference is{' '}
                    <strong className="text-gold font-mono">{bookingRef}</strong>. A dedicated
                    Private Concierge Director has received your dossier.
                  </p>
                </div>

                {/* Summary Voucher Card */}
                <div className="p-6 rounded-refined bg-navy-950 border border-gold/30 text-left space-y-4 max-w-lg mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="eyebrow text-gold text-[10px]">Official Booking Voucher</span>
                    <span className="text-xs text-stone font-mono">{bookingRef}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone">Journey:</span>
                      <span className="text-ivory font-medium">{selectedPkg.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone">Destination:</span>
                      <span className="text-ivory font-medium">{destination?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone">Departure Date:</span>
                      <span className="text-ivory font-medium">{startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone">Travelers:</span>
                      <span className="text-ivory font-medium">
                        {adults} Adults {childrenCount > 0 ? `, ${childrenCount} Children` : ''}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone">Sanctuary:</span>
                      <span className="text-ivory font-medium">{selectedTier?.name}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10 font-serif text-sm text-gold-light font-semibold">
                      <span>Total Reserved:</span>
                      <span>{format(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Voucher Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadCalendar}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-subtle bg-gold text-navy text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105"
                  >
                    <CalendarPlus size={14} />
                    <span>Add to Calendar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-subtle bg-white/5 hover:bg-white/10 text-ivory border border-white/15 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Printer size={14} />
                    <span>Print Voucher</span>
                  </button>
                </div>

                <div className="pt-6 border-t border-white/10 text-xs text-stone">
                  <Link href="/" className="text-gold-light hover:underline uppercase tracking-wider">
                    &larr; Return to Homepage
                  </Link>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-subtle bg-white/5 hover:bg-white/10 text-stone hover:text-ivory text-xs uppercase tracking-wider transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={currentStep === 4 && !agreeTerms}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-subtle bg-gold hover:bg-gold-hover disabled:opacity-50 text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-md transition-all hover:scale-[1.02]"
                >
                  <span>{currentStep === 4 ? 'Confirm Reservation' : 'Continue'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Persistent Live Pricing Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 sm:p-8 rounded-refined bg-charcoal border border-gold/40 shadow-luxury-gold space-y-6">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="eyebrow text-gold text-[10px] block">Live Booking Breakdown</span>
                <h3 className="font-serif text-xl text-ivory font-normal">{selectedPkg.title}</h3>
                <p className="text-xs text-stone">{destination?.name}</p>
              </div>

              <div className="space-y-2.5 text-xs text-stone">
                <div className="flex justify-between">
                  <span>Departure Date</span>
                  <span className="text-ivory">{startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="text-ivory">{selectedPkg.durationDays} Days / {nights} Nights</span>
                </div>
                <div className="flex justify-between">
                  <span>Travelers</span>
                  <span className="text-ivory">{adults} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span>Sanctuary Suite</span>
                  <span className="text-ivory truncate max-w-[150px]">{selectedTier?.name}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-stone">
                  <span>Base Package ({adults} travelers)</span>
                  <span className="text-ivory font-serif">{format(baseCost)}</span>
                </div>

                {tierUpgradeCost > 0 && (
                  <div className="flex justify-between text-stone">
                    <span>Villa Upgrade</span>
                    <span className="text-gold-light font-serif">+{format(tierUpgradeCost)}</span>
                  </div>
                )}

                {totalAddOns > 0 && (
                  <div className="flex justify-between text-stone">
                    <span>Selected Add-ons ({selectedAddOns.length})</span>
                    <span className="text-gold-light font-serif">+{format(totalAddOns)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone">
                  <span>Concierge & ATOL Bonding (5%)</span>
                  <span className="text-ivory font-serif">{format(conciergeFee)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Privilege Voucher Credit</span>
                    <span>-{format(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-3 border-t border-white/10 font-serif">
                  <span className="text-sm text-ivory font-medium">Estimated Total</span>
                  <span className="text-2xl font-semibold text-gold-light">
                    {format(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone">
                  <ShieldCheck size={14} className="text-gold" />
                  <span>Price locked upon reservation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

