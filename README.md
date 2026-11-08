// ================================================================
//  VIBEISTIC – SITE SETTINGS (edit this file, then push to GitHub)
// ================================================================

export const SITE = {
  name: 'Vibeistic',
  url: 'https://vibeistic.in',
  tagline: 'Six ways to know a city.',
  description:
    'Honest, first-hand reviews to eat, sip, travel, pray, play and stay — scored on what actually matters and searchable by your nearest station.',
  heroEyebrow: 'Honest local reviews',
  heroBefore: 'Find your',
  heroHighlight: 'vibe',
  heroAfter: 'in the city.',
  contactEmail: 'hello@vibeistic.in',
  // Newsletter form action URL (Mailchimp / MailerLite / Brevo). Leave empty for now.
  newsletterUrl: 'https://vibeistic.us7.list-manage.com/subscribe/post?u=285b800a8a4fb81d3d889e07c&amp;id=dedbb51b85&amp;f_id=00edbae4f0',
  instagram: 'https://instagram.com/_vibeistic',
  youtube: 'https://youtube.com/@vibeistic',
};

// ---------------- Google AdSense (turn on after approval) ----------------
// 1) Paste your Publisher ID in "client" (format: ca-pub-1234567890123456) and push.
//    This adds the verification tag and creates /ads.txt automatically. Then apply in AdSense.
// 2) After approval set enabled: true. Auto ads then work from your AdSense dashboard.
// 3) Optional: paste ad unit slot IDs for fixed placements.
export const ADS = {
  client: '',
  enabled: false,
  slotArticle: '', // In-article unit (placed after paragraph 3 of reviews and stories)
  slotDisplay: '', // Display unit (homepage, sidebar, lists)
};

// ---------------- The six pillars ----------------
export type PillarKey = 'eat' | 'sip' | 'travel' | 'pray' | 'play' | 'stay';

export const PILLARS: Record<PillarKey, {
  name: string; hi: string; icon: string; sub: string;
  factors: [string, string, string]; color: string; bg: string;
}> = {
  eat:    { name: 'Eat',    hi: 'Khao',    icon: '🍛', sub: 'Restaurants, thalis & street food', factors: ['Taste', 'Value', 'Hygiene'],         color: '#f2994a', bg: '#f2994a,#ff5e7e' },
  sip:    { name: 'Sip',    hi: 'Piyo',    icon: '☕', sub: 'Cafés, chai & juice bars',          factors: ['Brew', 'Vibe', 'Value'],              color: '#ff5e7e', bg: '#ff5e7e,#ffb238' },
  travel: { name: 'Travel', hi: 'Ghoomo',  icon: '🧭', sub: 'Places, getaways & treks',          factors: ['Experience', 'Access', 'Value'],      color: '#e09b14', bg: '#ffb238,#f2994a' },
  pray:   { name: 'Pray',   hi: 'Darshan', icon: '🛕', sub: 'Temples & sacred places',           factors: ['Darshan', 'Cleanliness', 'Calm'],     color: '#5b2a86', bg: '#5b2a86,#c9407a' },
  play:   { name: 'Play',   hi: 'Khelo',   icon: '⚽', sub: 'Gyms, turfs & sports',              factors: ['Facilities', 'Crowd', 'Value'],       color: '#2e9e6b', bg: '#2e9e6b,#8fd18a' },
  stay:   { name: 'Stay',   hi: 'Raho',    icon: '🏨', sub: 'Hotels & homestays',                factors: ['Room', 'Location', 'Value'],          color: '#1f6fb2', bg: '#1f6fb2,#5b2a86' },
};
export const PILLAR_KEYS = Object.keys(PILLARS) as PillarKey[];

// Footer "About" links (pages live in src/content/pages)
export const FOOTER_LINKS = [
  { label: 'About Us', href: '/about/' },
  { label: 'How We Rate', href: '/how-we-rate/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Disclaimer', href: '/disclaimer/' },
];


// ---------------- Goog****nalytics 4 ----------------
expor**const ANALYTICS = {
  gaId: 'G-WQ2VYEC1XV',
};
