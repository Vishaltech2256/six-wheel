export type PackageIcon =
  | 'pin'
  | 'clock'
  | 'cal'
  | 'phone'
  | 'chat'
  | 'check'
  | 'bus'
  | 'cup'
  | 'sun'
  | 'compass'
  | 'fork'
  | 'flame'
  | 'back'
  | 'moon'
  | 'waves'
  | 'sparkles'
  | 'users'
  | 'trees';

export interface PackageInfoItem {
  icon: PackageIcon;
  label: string;
  value: string;
}

export interface PackageStop {
  num: string;
  icon: PackageIcon;
  title: string;
  description: string;
  highlights?: string[];
  chip?: {
    icon: PackageIcon;
    label: string;
  };
}

export interface CustomerPackageData {
  id: string;
  headerSubtitle: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  lead: string;
  infoItems: PackageInfoItem[];
  itineraryKicker: string;
  itineraryTitle: string;
  itinerarySubtitle: string;
  roadStartLabel: string;
  roadFinishLabel: string;
  stops: PackageStop[];
  inclusions: string[];
  ctaKicker: string;
  ctaTitle: string;
  ctaSubtitle: string;
  phones: string[];
  whatsappNumber: string;
  whatsappMessage: string;
}

export const CUSTOMER_PACKAGES: Record<string, CustomerPackageData> = {
  munnar: {
    id: 'munnar',
    headerSubtitle: 'One Day in Munnar • Day Excursion',
    eyebrow: 'Day Excursion Package',
    titlePrefix: 'One Day in ',
    titleHighlight: 'Munnar',
    lead: 'A thoughtfully planned day in the Western Ghats: jeep safari through misty hills and tea country, curated meals, and an evening fire camp, with comfortable pickup and drop from Coimbatore.',
    infoItems: [
      { icon: 'pin', label: 'Destination', value: 'Munnar' },
      { icon: 'bus', label: 'Pickup', value: 'Coimbatore' },
      { icon: 'cal', label: 'Duration', value: 'One Day' },
      { icon: 'back', label: 'Drop', value: 'Coimbatore' },
    ],
    itineraryKicker: 'Itinerary',
    itineraryTitle: 'Your Road Map',
    itinerarySubtitle: 'Follow the route from Coimbatore up into the hills and back, stop by stop.',
    roadStartLabel: 'Depart Coimbatore',
    roadFinishLabel: 'Arrive Coimbatore',
    stops: [
      {
        num: '01',
        icon: 'bus',
        title: 'Travel to Munnar',
        description: 'Pickup from Coimbatore and a scenic drive up to the hills.',
      },
      {
        num: '02',
        icon: 'cup',
        title: 'Morning Refreshment',
        description: 'Tea or coffee to begin the day.',
      },
      {
        num: '03',
        icon: 'sun',
        title: 'Breakfast',
        description: 'A hearty breakfast before the sightseeing begins.',
      },
      {
        num: '04',
        icon: 'compass',
        title: 'Jeep Ride',
        description: 'Explore Munnar’s viewpoints and tea landscapes by jeep.',
        chip: { icon: 'clock', label: '10 AM – 6 PM' },
      },
      {
        num: '05',
        icon: 'fork',
        title: 'Lunch',
        description: 'Served on the way, along the route.',
      },
      {
        num: '06',
        icon: 'flame',
        title: 'Fire Camp',
        description: 'An evening bonfire in the cool mountain air.',
      },
      {
        num: '07',
        icon: 'fork',
        title: 'Dinner',
        description: 'A warm dinner to close out the day.',
      },
      {
        num: '08',
        icon: 'back',
        title: 'Return to Coimbatore',
        description: 'A comfortable drop back to Coimbatore.',
      },
    ],
    inclusions: [
      'Pickup & Drop – Coimbatore',
      'Morning Refreshment',
      'Breakfast',
      'Jeep Ride (10 AM – 6 PM)',
      'Lunch on the way',
      'Fire Camp',
      'Dinner',
    ],
    ctaKicker: 'Reservations',
    ctaTitle: 'Plan Your Munnar Day Trip',
    ctaSubtitle:
      'Speak directly with Mohan to confirm availability, dates and customized group arrangements.',
    phones: ['+91 76393 41779'],
    whatsappNumber: '917639341779',
    whatsappMessage:
      'Hi Mohan, I would like to book the One Day Munnar Excursion Package. Please share the available dates and details.',
  },
  wonderla: {
    id: 'wonderla',
    headerSubtitle: 'Vagamon, Varkala & Wonderla • 3 Days College IV',
    eyebrow: 'College IV • 3 Days Program',
    titlePrefix: 'Vagamon, Varkala & ',
    titleHighlight: 'Wonderla',
    lead: 'An unforgettable 3-day College IV adventure with pickup right at your College — misty Vagamon jeep safari & DJ campfire, Varkala mangrove kayaking & beaches, Cochin stay, and full-day thrills at Wonderla.',
    infoItems: [
      { icon: 'users', label: 'Purpose', value: 'College IV' },
      { icon: 'pin', label: 'Program', value: 'Vagamon, Varkala & Wonderla' },
      { icon: 'bus', label: 'Pickup', value: 'At College' },
      { icon: 'cal', label: 'Duration', value: '3 Days Program' },
    ],
    itineraryKicker: '3 Days Program • Itinerary',
    itineraryTitle: 'Your Road Map',
    itinerarySubtitle:
      'Follow the complete 3-day College IV journey from pickup at College to Vagamon, Varkala, Cochin, and Wonderla back to Coimbatore.',
    roadStartLabel: 'Pickup at College',
    roadFinishLabel: 'Return Coimbatore · Trip End',
    stops: [
      {
        num: '01',
        icon: 'bus',
        title: 'Day 01 · Vagamon Arrival',
        description: 'Hotel Check-in, refreshment, and a hearty Breakfast before hill exploration.',
        highlights: ['Pickup at College', 'Hotel Check in & Refreshment', 'Breakfast'],
        chip: { icon: 'cal', label: 'Day 01 · Vagamon' },
      },
      {
        num: '02',
        icon: 'trees',
        title: 'Pine Forest, Meadows & Lunch',
        description: 'Explore Vagamon’s towering Pine Forest and lush green Meadows, followed by Lunch.',
        highlights: ['Pine Forest', 'Meadows', 'Lunch'],
        chip: { icon: 'sun', label: 'Day 01 · Morning & Lunch' },
      },
      {
        num: '03',
        icon: 'compass',
        title: 'Vagamon Jeep Ride Safari',
        description: 'Exciting 4x4 Jeep Ride covering 4 scenic Vagamon viewpoints:',
        highlights: [
          '1. Ulluponni Tunnel',
          '2. Idukki Dam View Point',
          '3. Kottapara View Point',
          '4. Suicide Point',
        ],
        chip: { icon: 'compass', label: 'Day 01 · 4 Jeep Points' },
      },
      {
        num: '04',
        icon: 'flame',
        title: 'Dinner, Campfire with DJ & Night Stay',
        description: 'Warm Dinner, high-energy Campfire with DJ music, and Night Stay at Vagamon.',
        highlights: ['Dinner', 'Campfire with DJ', 'Night Stay at Vagamon'],
        chip: { icon: 'moon', label: 'Day 01 · Night Stay' },
      },
      {
        num: '05',
        icon: 'waves',
        title: 'Day 02 · Travel to Varkala & Kayaking',
        description:
          'Refreshment & travel to Varkala. Breakfast followed by Mangrove Forest and Kayaking.',
        highlights: ['Refreshment & Travel to Varkala', 'Breakfast', 'Mangrove Forest'],
        chip: { icon: 'clock', label: 'Kayaking · 2 to 3 Hrs' },
      },
      {
        num: '06',
        icon: 'sun',
        title: 'Lunch & Varkala Coastal Tour',
        description: 'Lunch followed by an unforgettable circuit across Varkala’s famous shores:',
        highlights: [
          'Lunch',
          'Kappil Beach',
          'Black Sand Beach',
          'Light House',
          'Varkala Cliff Beach',
        ],
        chip: { icon: 'pin', label: 'Day 02 · 4 Beaches & Cliff' },
      },
      {
        num: '07',
        icon: 'moon',
        title: 'Dinner & Night Stay at Cochin',
        description:
          'Evening Dinner after coastal sunset, followed by night travel to Cochin and Night Stay at Cochin.',
        highlights: ['Dinner', 'Night Travel to Cochin', 'Night Stay at Cochin'],
        chip: { icon: 'cal', label: 'Day 02 · Night Stay Cochin' },
      },
      {
        num: '08',
        icon: 'sparkles',
        title: 'Day 03 · Wonderla Theme Park',
        description:
          'Energizing Breakfast before an action-packed full day at Wonderla Theme Park.',
        highlights: ['Breakfast', 'Wonderla Theme Park'],
        chip: { icon: 'sparkles', label: 'Day 03 · Full Day Thrills' },
      },
      {
        num: '09',
        icon: 'back',
        title: 'Dinner & Return to Coimbatore',
        description: 'Warm Dinner after the park and overnight bus return back to Coimbatore.',
        highlights: ['Dinner', 'Night Travel Return to Coimbatore'],
        chip: { icon: 'back', label: 'Trip End · Coimbatore' },
      },
    ],
    inclusions: [
      'Bus Rent, Toll, Parking & Taxes',
      '3 Days Food (Veg / Non-Veg)',
      'Hotel Rent (Vagamon & Cochin)',
      'Jeep Ride (Vagamon Safari)',
    ],
    ctaKicker: 'Thank You for Contacting Sixwheel Holidays',
    ctaTitle: 'Book Your 3-Day Vagamon, Varkala & Wonderla IV',
    ctaSubtitle:
      'Contact Mohan and the Sixwheel Holidays desk for group pricing, available dates, and custom College IV bus scheduling.',
    phones: ['+91 76393 41779', '+91 77083 93572'],
    whatsappNumber: '917639341779',
    whatsappMessage:
      'Hi Mohan, I would like to book the 3 Days College IV Package (Vagamon, Varkala & Wonderla). Please share package rates and details.',
  },
};
