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
  pricePerHead?: string;
  groupCount?: string;
  programDate?: string;
  selfSwitchLabel?: string;
  alternatePackageId?: string;
  alternateLabel?: string;
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

  'vagamon-1day': {
    id: 'vagamon-1day',
    headerSubtitle: '1 Day Vagamon • 75 Members Group Tour',
    eyebrow: '1 Day Group Excursion',
    titlePrefix: 'One Day in ',
    titleHighlight: 'Vagamon',
    lead: 'An energizing one-day hill excursion from Coimbatore to Vagamon featuring hotel refreshment, Pine Forest, Photo Point, an off-road Jeep Safari across four iconic viewpoints, and Veg/Non-Veg meals.',
    pricePerHead: '₹2,100',
    groupCount: '75 Members',
    infoItems: [
      { icon: 'pin', label: 'Program', value: '1 Day Vagamon' },
      { icon: 'bus', label: 'Pickup', value: 'Coimbatore (Night Travel)' },
      { icon: 'users', label: 'Group Count', value: '75 Members' },
      { icon: 'cal', label: 'Per Head', value: '₹2,100' },
    ],
    itineraryKicker: '1 Day Program • Itinerary',
    itineraryTitle: 'Your Road Map',
    itinerarySubtitle:
      'Night travel from Coimbatore up into Vagamon’s misty peaks and back after dinner.',
    roadStartLabel: 'Pickup Coimbatore · Night Travel',
    roadFinishLabel: 'Return Coimbatore · Trip End',
    stops: [
      {
        num: '01',
        icon: 'bus',
        title: 'Night Travel, Check-in & Breakfast',
        description:
          'Overnight journey from Coimbatore to Vagamon, followed by Hotel Check-in, Refreshment, and Breakfast.',
        highlights: ['Night Travel to Vagamon', 'Hotel Check in & Refreshment', 'Breakfast'],
        chip: { icon: 'cal', label: 'Day 01 · Morning Arrival' },
      },
      {
        num: '02',
        icon: 'trees',
        title: 'Pine Forest & Photo Point',
        description:
          'Walk beneath towering misty pines in the Vagamon Pine Forest and capture group memories at Photo Point.',
        highlights: ['Pine Forest', 'Photo Point'],
      },
      {
        num: '03',
        icon: 'fork',
        title: 'Lunch',
        description: 'Wholesome Veg & Non-Veg Lunch served before the afternoon off-road safari.',
        chip: { icon: 'fork', label: '1 Day Food · Veg / Non-Veg' },
      },
      {
        num: '04',
        icon: 'compass',
        title: 'Vagamon Jeep Ride Safari',
        description: 'Thrilling off-road 4x4 Jeep Ride exploring four famous Vagamon viewpoints:',
        highlights: [
          '1. Ulluponni Tunnel',
          '2. Idukki Dam View Point',
          '3. Kottapara View Point',
          '4. Suicide Point',
        ],
        chip: { icon: 'compass', label: '4 Iconic Jeep Points' },
      },
      {
        num: '05',
        icon: 'fork',
        title: 'Dinner',
        description: 'Warm group Dinner in the cool mountain evening before heading back.',
      },
      {
        num: '06',
        icon: 'back',
        title: 'Night Travel Return to Coimbatore',
        description: 'Comfortable overnight coach return back to Coimbatore.',
        chip: { icon: 'back', label: 'Trip End · Coimbatore' },
      },
    ],
    inclusions: [
      'Bus Rent, Toll, Parking & Taxes',
      '1 Day Food (Veg / Non-Veg)',
      'Hotel Rent (Check-in & Refreshment)',
      'Jeep Ride (Vagamon Sightseeing)',
    ],
    ctaKicker: 'Thank You for Contacting Sixwheel Holidays',
    ctaTitle: 'Book Your 1-Day Vagamon Group Trip',
    ctaSubtitle:
      'Rate ₹2,100 per head for 75 members. Contact Sixwheel Holidays to reserve dates and coach seating.',
    phones: ['+91 76393 41779', '+91 77083 93572'],
    whatsappNumber: '917639341779',
    whatsappMessage:
      'Hi Mohan, I would like to book the 1 Day Vagamon Package (₹2,100/head, 75 Members, Coimbatore pickup). Please share details.',
  },

  wonderla: {
    id: 'wonderla',
    headerSubtitle: 'Vagamon, Varkala & Wonderla • 3 Days College IV',
    eyebrow: 'College IV • 3 Days Program',
    titlePrefix: 'Vagamon, Varkala & ',
    titleHighlight: 'Wonderla',
    lead: 'An unforgettable 3-day College IV adventure with pickup right at your College — misty Vagamon jeep safari & DJ campfire, Varkala mangrove kayaking & beaches, Cochin stay, and full-day thrills at Wonderla.',
    selfSwitchLabel: 'Route 1: Vagamon · Varkala · Wonderla',
    alternatePackageId: 'vagamon-kochin-wonderla',
    alternateLabel: 'Route 2: Vagamon · Kochin · Wonderla (₹3,650)',
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
        description:
          'Explore Vagamon’s towering Pine Forest and lush green Meadows, followed by Lunch.',
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
        description:
          'Warm Dinner, high-energy Campfire with DJ music, and Night Stay at Vagamon.',
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

  'vagamon-kochin-wonderla': {
    id: 'vagamon-kochin-wonderla',
    headerSubtitle: 'Vagamon, Kochin & Wonderla • 3 Days College IV',
    eyebrow: 'College IV • 3 Days Program',
    titlePrefix: 'Vagamon, Kochin & ',
    titleHighlight: 'Wonderla',
    lead: 'Complete 3-day College IV package with Pickup at College — featuring Vagamon Pine Forest, Meadows, Jeep Ride & DJ Campfire, full-day Kochin sightseeing with DJ Boating & Lulu Mall, and Wonderla Theme Park.',
    pricePerHead: '₹3,650',
    groupCount: '19 Students + 2 Staffs',
    selfSwitchLabel: 'Route 2: Vagamon · Kochin · Wonderla (₹3,650)',
    alternatePackageId: 'wonderla',
    alternateLabel: 'Route 1: Vagamon · Varkala · Wonderla',
    infoItems: [
      { icon: 'users', label: 'Purpose · Count', value: 'College IV · 19 Students + 2 Staffs' },
      { icon: 'pin', label: 'Program', value: 'Vagamon, Kochin & Wonderla' },
      { icon: 'bus', label: 'Pickup', value: 'At College' },
      { icon: 'cal', label: 'Per Head · Days', value: '₹3,650 · 3 Days' },
    ],
    itineraryKicker: '3 Days Program • Itinerary',
    itineraryTitle: 'Your Road Map',
    itinerarySubtitle:
      'Follow the complete 3-day College IV program from College pickup across Vagamon hills, Kochin city & DJ boating, and Wonderla back to Coimbatore.',
    roadStartLabel: 'Pickup at College',
    roadFinishLabel: 'Return Coimbatore · Trip End',
    stops: [
      {
        num: '01',
        icon: 'bus',
        title: 'Day 01 · Vagamon Arrival & Breakfast',
        description:
          'Pickup at College and scenic climb to Vagamon for Hotel Check-in, Refreshment, and Breakfast.',
        highlights: ['Pickup at College', 'Hotel Check in & Refreshment', 'Breakfast'],
        chip: { icon: 'cal', label: 'Day 01 · Vagamon' },
      },
      {
        num: '02',
        icon: 'trees',
        title: 'Pine Forest, Meadows & Lunch',
        description:
          'Morning exploration of Vagamon’s Pine Forest and scenic Meadows, followed by Lunch.',
        highlights: ['Pine Forest', 'Meadows', 'Lunch'],
      },
      {
        num: '03',
        icon: 'compass',
        title: 'Vagamon Jeep Ride Safari',
        description: '4x4 off-road Jeep Ride exploring four signature Vagamon viewpoints:',
        highlights: [
          '1. Ulluponni Tunnel',
          '2. Idukki Dam View Point',
          '3. Kottapara View Point',
          '4. Suicide Point',
        ],
        chip: { icon: 'compass', label: 'Day 01 · Jeep Safari' },
      },
      {
        num: '04',
        icon: 'flame',
        title: 'Dinner, Campfire with DJ & Night Stay',
        description:
          'Warm evening Dinner followed by Campfire with DJ music and Night Stay at Vagamon.',
        highlights: ['Dinner', 'Campfire with DJ', 'Night Stay at Vagamon'],
        chip: { icon: 'moon', label: 'Day 01 · Stay at Vagamon' },
      },
      {
        num: '05',
        icon: 'sun',
        title: 'Day 02 · Kochin Heritage & Temple',
        description:
          'Refreshment and Breakfast before visiting Chottanikkara Temple and historic Fort Kochin.',
        highlights: ['Refreshment', 'Breakfast', 'Chottanikkara Temple', 'Fort Kochin'],
        chip: { icon: 'cal', label: 'Day 02 · Kochin' },
      },
      {
        num: '06',
        icon: 'waves',
        title: 'Lunch, Marine Drive & DJ Boating',
        description:
          'Satisfying Lunch followed by Kochin Marine Drive stroll and lively harbour DJ Boating.',
        highlights: ['Lunch', 'Marine Drive', 'DJ Boating'],
        chip: { icon: 'waves', label: 'Harbour & DJ Cruise' },
      },
      {
        num: '07',
        icon: 'moon',
        title: 'Vypin Beach, Lulu Mall & Night Stay',
        description:
          'Evening breeze at Vypin Beach, Lulu Mall hangouts, Dinner, and comfortable Night Stay.',
        highlights: ['Vypin Beach', 'Lulu Mall', 'Dinner', 'Night Stay'],
      },
      {
        num: '08',
        icon: 'sparkles',
        title: 'Day 03 · Wonderla Theme Park',
        description:
          'Hearty Breakfast followed by a thrilling full day of rides & water slides at Wonderla.',
        highlights: ['Breakfast', 'Wonderla Theme Park'],
        chip: { icon: 'sparkles', label: 'Day 03 · Full Day Thrills' },
      },
      {
        num: '09',
        icon: 'back',
        title: 'Dinner & Return to Coimbatore',
        description:
          'Evening Dinner after park thrills and safe overnight return travel to Coimbatore.',
        highlights: ['Dinner', 'Night Travel Return to Coimbatore'],
        chip: { icon: 'back', label: 'Trip End · Coimbatore' },
      },
    ],
    inclusions: [
      'Bus Rent, Toll, Parking & Taxes',
      '3 Days Food (Veg / Non-Veg)',
      'Hotel Rent',
      'Jeep Ride',
    ],
    ctaKicker: 'Thank You for Contacting Sixwheel Holidays',
    ctaTitle: 'Book College IV · Vagamon, Kochin & Wonderla',
    ctaSubtitle:
      'Rate ₹3,650 per head for 19 Students + 2 Staffs. Speak with our team to finalize College IV schedules.',
    phones: ['+91 76393 41779', '+91 77083 93572'],
    whatsappNumber: '917639341779',
    whatsappMessage:
      'Hi Mohan, I would like to book the 3 Days College IV Package (Vagamon, Kochin & Wonderla - ₹3,650/head, 19 Students + 2 Staffs).',
  },

  'wonderla-1day': {
    id: 'wonderla-1day',
    headerSubtitle: 'Wonderla & Lulu Mall • 1 Day Kochin Program',
    eyebrow: '1 Day Program · 19 Members',
    titlePrefix: 'One Day in ',
    titleHighlight: 'Wonderla',
    lead: 'An action-packed one-day excursion from Coimbatore to Kochin — featuring full-day thrills at Wonderla Theme Park and evening hangouts at Lulu Mall, complete with Refreshment, Breakfast, Dinner, and luxury transit.',
    groupCount: '19 Members',
    infoItems: [
      { icon: 'pin', label: 'Program', value: 'Wonderla & Lulu Mall' },
      { icon: 'bus', label: 'Pickup', value: 'Coimbatore · Travel to Kochin' },
      { icon: 'cal', label: 'Duration', value: '1 Day Program' },
      { icon: 'users', label: 'Group Count', value: '19 Members' },
    ],
    itineraryKicker: '1 Day Program • Itinerary',
    itineraryTitle: 'Your Road Map',
    itinerarySubtitle:
      'From Coimbatore pickup to full-day Wonderla thrills and Lulu Mall shopping in Kochin.',
    roadStartLabel: 'Pickup Coimbatore · To Kochin',
    roadFinishLabel: 'Return Coimbatore · Trip End',
    stops: [
      {
        num: '01',
        icon: 'bus',
        title: 'Pickup & Travel to Kochin',
        description: 'Pickup at Coimbatore and smooth private coach journey toward Kochin.',
        highlights: ['Pickup at Coimbatore', 'Travel to Kochin'],
      },
      {
        num: '02',
        icon: 'cup',
        title: 'Refreshment & Breakfast',
        description:
          'Morning stop for fresh tea/coffee refreshment and Breakfast before park gates open.',
        highlights: ['Refreshment', 'Breakfast'],
        chip: { icon: 'sun', label: 'Day 01 · Morning Start' },
      },
      {
        num: '03',
        icon: 'sparkles',
        title: 'Wonderla Theme Park',
        description:
          'Full day of high-adrenaline land rides, water slides, and wave pool fun at Wonderla Kochin.',
        chip: { icon: 'sparkles', label: 'Full Day Amusement & Water Park' },
      },
      {
        num: '04',
        icon: 'fork',
        title: 'Dinner',
        description: 'Delicious Veg & Non-Veg Dinner served after an unforgettable day at the park.',
      },
      {
        num: '05',
        icon: 'pin',
        title: 'Lulu Mall',
        description:
          'Evening visit to Kochin’s grand Lulu Mall for shopping, food court treats, and group hangouts.',
        chip: { icon: 'clock', label: 'Evening Leisure Stop' },
      },
      {
        num: '06',
        icon: 'back',
        title: 'Night Travel Return to Coimbatore',
        description: 'Relaxing overnight coach drive returning safely back to Coimbatore.',
        chip: { icon: 'back', label: 'Trip End · Coimbatore' },
      },
    ],
    inclusions: ['Bus Rent, Toll, Parking & Taxes', '1 Day Food (Veg / Non-Veg)'],
    ctaKicker: 'Thank You for Contacting Sixwheel Holidays',
    ctaTitle: 'Book Your 1-Day Wonderla & Lulu Mall Trip',
    ctaSubtitle:
      'Planned for 19-member group travel with private coach transit and meals from Coimbatore. Call or WhatsApp Mohan to reserve your date.',
    phones: ['+91 76393 41779', '+91 77083 93572'],
    whatsappNumber: '917639341779',
    whatsappMessage:
      'Hi Mohan, I would like to book the 1 Day Wonderla & Lulu Mall Package (19 Members, Coimbatore pickup). Please share pricing and availability.',
  },

  'vagamon-2days': {
    id: 'vagamon-2days',
    headerSubtitle: '2 Days Vagamon • 2 Days 1 Night Program',
    eyebrow: '2 Days 1 Night • Dates 13, 14',
    titlePrefix: 'Two Days in ',
    titleHighlight: 'Vagamon',
    lead: 'A complete 2-Day / 1-Night Vagamon mountain escape from Coimbatore for 25 members — covering Pine Forest, Photo Point, 4x4 Jeep Safari, DJ Campfire, Meadows, Thangalpara, and the Adventure Park Glass Bridge.',
    pricePerHead: '₹3,600',
    groupCount: '25 Members',
    programDate: 'Date: 13, 14',
    infoItems: [
      { icon: 'cal', label: 'Dates · Duration', value: '13, 14 · 2 Days 1 Night' },
      { icon: 'bus', label: 'Pickup', value: 'Coimbatore (Night Travel)' },
      { icon: 'users', label: 'Group Count', value: '25 Members' },
      { icon: 'pin', label: 'Per Head', value: '₹3,600' },
    ],
    itineraryKicker: '2 Days 1 Night • Itinerary',
    itineraryTitle: 'Your Road Map',
    itinerarySubtitle:
      'Follow the complete 2-day mountain itinerary from Coimbatore up to Vagamon’s peaks, Glass Bridge, and back.',
    roadStartLabel: 'Pickup Coimbatore · Night Travel',
    roadFinishLabel: 'Return Coimbatore · Trip End',
    stops: [
      {
        num: '01',
        icon: 'bus',
        title: 'Day 01 · Night Travel & Check-in',
        description:
          'Night travel from Coimbatore to Vagamon, followed by morning Hotel Check-in, Refreshment & Breakfast.',
        highlights: ['Night Travel to Vagamon', 'Hotel Check in & Refreshment', 'Breakfast'],
        chip: { icon: 'cal', label: 'Day 01 · Morning Arrival' },
      },
      {
        num: '02',
        icon: 'trees',
        title: 'Pine Forest, Photo Point & Lunch',
        description:
          'Morning walk inside the famous Vagamon Pine Forest and scenic Photo Point, followed by Lunch.',
        highlights: ['Pine Forest', 'Photo Point', 'Lunch'],
      },
      {
        num: '03',
        icon: 'compass',
        title: 'Vagamon Jeep Ride Safari',
        description: '4x4 off-road Jeep Ride exploring all four panoramic Vagamon viewpoints:',
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
        description:
          'Savory Dinner followed by lively Campfire with DJ music and cozy Night Stay at Vagamon.',
        highlights: ['Dinner', 'Campfire with DJ', 'Night Stay at Vagamon'],
        chip: { icon: 'moon', label: 'Day 01 · Night Stay' },
      },
      {
        num: '05',
        icon: 'sun',
        title: 'Day 02 · Breakfast, Meadows & Thangalpara',
        description:
          'Morning Breakfast followed by scenic walks across Vagamon Meadows and mist-draped Thangalpara.',
        highlights: ['Breakfast', 'Meadows', 'Thangalpara'],
        chip: { icon: 'cal', label: 'Day 02 · Morning Hills' },
      },
      {
        num: '06',
        icon: 'sparkles',
        title: 'Lunch & Adventure Park (Glass Bridge)',
        description:
          'Hearty Lunch followed by thrilling activities and the skywalk at Vagamon Adventure Park Glass Bridge.',
        highlights: ['Lunch', 'Adventure Park (Glass Bridge)'],
        chip: { icon: 'sparkles', label: 'Glass Bridge Experience' },
      },
      {
        num: '07',
        icon: 'back',
        title: 'Dinner & Night Travel Return',
        description:
          'Closing Dinner before overnight return coach travel back home to Coimbatore.',
        highlights: ['Dinner', 'Night Travel Return to Coimbatore'],
        chip: { icon: 'back', label: 'Trip End · Coimbatore' },
      },
    ],
    inclusions: [
      'Bus Rent, Toll, Parking & Taxes',
      '2 Days Food (Veg / Non-Veg)',
      'Hotel Rent (Night Stay at Vagamon)',
      'Jeep Ride (Vagamon Sightseeing)',
    ],
    ctaKicker: 'Thank You for Contacting Sixwheel Holidays',
    ctaTitle: 'Book Your 2-Day Vagamon Tour (Dates 13, 14)',
    ctaSubtitle:
      'Tariff ₹3,600 per head for 25 members including hotel stay, meals, jeep ride, and bus transport from Coimbatore.',
    phones: ['+91 76393 41779', '+91 77083 93572'],
    whatsappNumber: '917639341779',
    whatsappMessage:
      'Hi Mohan, I would like to book the 2 Days Vagamon Package (₹3,600/head, 25 Members, Dates 13 & 14). Please share details.',
  },

  'munnar-kochin': {
    id: 'munnar-kochin',
    headerSubtitle: 'Munnar & Kochin • 3 Days Program (Pickup Sathy)',
    eyebrow: '3 Days Program · 20 Members',
    titlePrefix: 'Munnar & ',
    titleHighlight: 'Kochin',
    lead: 'A grand 3-day hill-to-harbour holiday starting from Sathy — featuring Munnar’s Mattupetty Dam, Tea Factory, Elephant Ride, Eco Point & Top Station, plus Chottanikkara Temple, Fort Kochin, Marine Drive DJ Boating, Vypin Beach & Lulu Mall.',
    pricePerHead: '₹4,700',
    groupCount: '20 Members',
    infoItems: [
      { icon: 'pin', label: 'Program', value: 'Munnar & Kochin' },
      { icon: 'bus', label: 'Pickup & Drop', value: 'Sathy (Sathyamangalam)' },
      { icon: 'users', label: 'Duration · Count', value: '3 Days · 20 Members' },
      { icon: 'cal', label: 'Per Head', value: '₹4,700' },
    ],
    itineraryKicker: '3 Days Program • Itinerary',
    itineraryTitle: 'Your Road Map',
    itinerarySubtitle:
      'Follow your 3-day journey from Sathy across misty Munnar tea valleys to vibrant Kochin and back.',
    roadStartLabel: 'Pickup Sathy · To Munnar',
    roadFinishLabel: 'Return Sathy · Trip End',
    stops: [
      {
        num: '01',
        icon: 'bus',
        title: 'Day 01 · Night Travel & Munnar Arrival',
        description:
          'Pickup at Sathy and night travel up to Munnar, arriving for Hotel Check-in & Refreshment.',
        highlights: ['Pickup at Sathy', 'Night Travel to Munnar', 'Hotel Check in & Refreshment'],
        chip: { icon: 'cal', label: 'Day 01 · Munnar' },
      },
      {
        num: '02',
        icon: 'trees',
        title: 'Photo Point, Elephant Ride & Mattupetty',
        description:
          'Explore Munnar’s signature attractions from tea gardens to elephant trails and dam vistas:',
        highlights: [
          'Photo Point',
          'Elephant Ride (Entry Ticket Only)',
          'Mattupetty Tea Manufacturing Factory Visit',
          'Mattupetty Dam Visit',
        ],
        chip: { icon: 'compass', label: 'Tea Factory & Dam Tour' },
      },
      {
        num: '03',
        icon: 'sun',
        title: 'Lunch, Boating, Eco Point & Top Station',
        description:
          'Lunch followed by Sun Moon Valley Boating, Eco Point echoes, and sweeping Top Station views before Munnar stay.',
        highlights: [
          'Lunch',
          'Sun Moon Valley Boating Point',
          'Eco Point',
          'Top Station View Point',
          'Night Stay at Munnar',
        ],
        chip: { icon: 'moon', label: 'Day 01 · Night Stay Munnar' },
      },
      {
        num: '04',
        icon: 'cal',
        title: 'Day 02 · Travel to Kochin & Chottanikkara',
        description:
          'Morning Breakfast in Munnar, scenic drive to Kochin, visit Chottanikkara Temple & Fort Kochin.',
        highlights: ['Breakfast', 'Travel to Kochin', 'Chottanikkara Temple', 'Fort Kochin'],
        chip: { icon: 'pin', label: 'Day 02 · Kochin' },
      },
      {
        num: '05',
        icon: 'waves',
        title: 'Lunch, Marine Drive & DJ Boating',
        description:
          'Delicious Lunch followed by Kochin Marine Drive walkway and exciting harbour DJ Boating.',
        highlights: ['Lunch', 'Marine Drive', 'DJ Boating'],
        chip: { icon: 'waves', label: 'Harbour DJ Cruise' },
      },
      {
        num: '06',
        icon: 'moon',
        title: 'Vypin Beach, Lulu Mall & Night Stay',
        description:
          'Coastal breeze at Vypin Beach, shopping at Lulu Mall, Dinner, and relaxing Night Stay at Kochin.',
        highlights: ['Vypin Beach', 'Lulu Mall', 'Dinner', 'Night Stay at Kochin'],
        chip: { icon: 'moon', label: 'Day 02 · Night Stay Kochin' },
      },
      {
        num: '07',
        icon: 'back',
        title: 'Day 03 · Refreshment, Breakfast & Return',
        description:
          'Morning Refreshment and Breakfast in Kochin before comfortable return travel back to Sathy.',
        highlights: ['Refreshment', 'Breakfast', 'Return Travel to Sathy'],
        chip: { icon: 'back', label: 'Trip End · Sathy' },
      },
    ],
    inclusions: [
      'Bus Rent, Toll, Parking & Taxes',
      '3 Days Food (Veg / Non-Veg)',
      'Hotel Rent (Munnar & Kochin)',
      'Jeep Ride',
    ],
    ctaKicker: 'Thank You for Contacting Sixwheel Holidays',
    ctaTitle: 'Book Your 3-Day Munnar & Kochin Package',
    ctaSubtitle:
      'Rate ₹4,700 per head for 20 members including Pickup & Return at Sathy, stays, meals, and sightseeing.',
    phones: ['+91 76393 41779', '+91 77083 93572'],
    whatsappNumber: '917639341779',
    whatsappMessage:
      'Hi Mohan, I would like to book the 3 Days Munnar & Kochin Package (₹4,700/head, 20 Members, Pickup at Sathy). Please share availability.',
  },
};
