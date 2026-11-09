import { BlogPost } from '@/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'the-art-of-unhurried-travel',
    title: 'The Art of Unhurried Travel: Why Slowness is the Ultimate Luxury',
    subtitle: 'In an era of relentless velocity, the true connoisseur chooses stillness, depth and immaculate rhythm.',
    author: {
      name: 'Aurelia Sinclair',
      role: 'Editor-at-Large & Cultural Critic',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishDate: 'February 14, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85',
    tags: ['Philosophy', 'Slow Travel', 'Editorial', 'Discretion'],
    excerpt:
      'True luxury is never measured in miles crossed or destinations checked off a frantic itinerary. It is discovered when time itself seems to expand, allowing moments of sublime stillness to resonate forever.',
    sections: [
      {
        heading: 'The Illusion of Haste',
        body:
          'Modern travel has frequently succumbed to an aggressive tempo—a checklist mentality driven by digital urgency. Yet the discerning traveler recognizes that velocity dilutes wonder. When you race through six cities in seven days, you have not seen the world; you have merely survived its transit corridors. The greatest journey begins when the watch is quietly put away, and the day is allowed to unfold like a classical overture.',
      },
      {
        heading: 'The Sovereign Rhythm of Movement',
        body:
          'At Six Wheels Holidays, our philosophy of "Journeys, Perfectly in Motion" does not denote frantic speed. Rather, it signifies mechanical and logistical harmony—an effortless gliding motion akin to a vintage grand tourer humming over alpine passes or a private wooden dhoni tracing calm lagoon ripples at dawn.',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'The majestic stillness of the Swiss Engadin valley under winter dawn light.',
      },
      {
        heading: 'The Luxury of Unscripted Hours',
        body:
          'Consider the afternoon spent in a moss garden in northern Kyoto, where no appointment awaits and the only sound is the gentle click of a bamboo water pipe. Or the hours spent adrift on a Riva yacht in Positano, letting the sun warm your skin while conversation ebbs and flows like the tide. When travel is engineered with absolute precision behind the scenes, you are liberated to be entirely present in the moment.',
      },
    ],
  },
  {
    id: 'post-2',
    slug: 'behind-closed-temple-doors-kyoto',
    title: 'Behind Closed Temple Doors: A Private Audience with Kyoto’s Living Masters',
    subtitle: 'How multi-generational trust opens Kyoto’s most sacred and private Zen courtyards.',
    author: {
      name: 'Kenzo Takahashi',
      role: 'Kyoto Cultural Emissary',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishDate: 'January 28, 2026',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
    tags: ['Kyoto', 'Heritage', 'Zen', 'Culture'],
    excerpt:
      'In Kyoto, true privilege cannot simply be bought with a credit card; it is earned through decades of mutual reverence, discretion, and an understanding of sacred Japanese traditions.',
    sections: [
      {
        heading: 'The Gates of Kennin-ji Before Dawn',
        body:
          'At 5:30 in the morning, mist still clings to the ancient cedar rafters of Kennin-ji, the oldest Zen temple in Kyoto. The heavy wooden gates are firmly barred against the public world. Yet a small side lattice door slides soundlessly open. For Six Wheels travelers, the senior monk bows gently and ushers you across centuries-old polished hinoki wood verandas toward the sacred dry landscape garden.',
      },
      {
        heading: 'The Way of Tea as Sacred Architecture',
        body:
          'Sitting on tatami woven by imperial craftspeople, you witness the Chanoyu tea ritual orchestrated by a 15th-generation tea master. Every movement—the angle of the bamboo whisk, the turn of the 400-year-old Raku bowl—is an exercise in radical mindfulness and seasonal reverence.',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'The meditative balance of stone and moss in an ancient Kyoto temple garden.',
      },
      {
        heading: 'Preserving Intangible Cultural Heritage',
        body:
          'By curating private audiences that directly sustain these historic temples and artisan dynasties, we ensure that these fragile centuries-old lineages continue to flourish for future generations.',
      },
    ],
  },
  {
    id: 'post-3',
    slug: 'private-skies-and-sacred-savannas',
    title: 'Private Skies & Sacred Savannas: The Future of Conservation Safaris',
    subtitle: 'How private concessions in the Serengeti are redefining the balance of wildlife preservation and ultra-luxury.',
    author: {
      name: 'Dr. Evelyn Montgomery',
      role: 'African Wildlife Biologist & Conservationist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    publishDate: 'December 19, 2025',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85',
    tags: ['Wildlife', 'Conservation', 'Serengeti', 'Eco-Luxury'],
    excerpt:
      'When you look out across 350,000 acres of pristine African grassland and see not a single other vehicle, you begin to grasp what conservation-driven luxury truly achieves.',
    sections: [
      {
        heading: 'The Power of Low-Impact Concessions',
        body:
          'For decades, standard safaris have suffered from vehicle congestion along popular river crossings. In contrast, private conservation concessions limit human presence to a minute fraction of land area. At Singita Grumeti, an expanse greater than many national parks is protected for wildlife and reserved exclusively for a handful of discerning guests.',
      },
      {
        heading: 'The Quiet Magic of Dawn',
        body:
          'Ascending at dawn in a hot air balloon, the golden savanna stretches unbroken to the curved horizon. Below, thousands of wildebeest and zebra sweep across the plains like living ink. The silence is profound, broken only by the occasional gentle hiss of the burner.',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Sunrise over the sweeping acacia plains of the Serengeti-Mara ecosystem.',
      },
      {
        heading: 'A Legacy That Protects the Land',
        body:
          'Every stay directly funds elite anti-poaching canine units, local community scholarships, and indigenous wildlife reintroduction programs. This is not merely travel; it is active stewardship of our planet’s greatest natural wonders.',
      },
    ],
  },
];
