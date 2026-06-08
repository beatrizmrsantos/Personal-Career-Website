// ─── Types ────────────────────────────────────────────────────────────────────

export interface Photo {
  id: number;
  url: string;
  caption?: string;
}

export interface Stop {
  city: string;
  country: string;
  flag: string;
  days: string;
  description: string;
  photos: Photo[];
}

export interface Trip {
  id: number;
  title: string;
  subtitle: string;
  dates: string;
  summary: string;
  color: string;
  icon: string;
  stops: Stop[];
}

export interface FilmEntry {
  title: string;
  subtitle: string;
  location: string;
  year: string;
  duration: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
}

// ─── Placeholder helper (replace URLs with your own photos) ──────────────────

const ph = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ─── Travel Adventures ────────────────────────────────────────────────────────

export const TRIPS: Trip[] = [
  {
    id: 1,
    title: "European Odyssey",
    subtitle: "Backpacking across Western Europe",
    dates: "Summer 2023 · 21 days",
    summary:
      "Three weeks with a rail pass and a backpack. From the Atlantic coast of Portugal to the ancient streets of Rome — chasing golden-hour light, local cuisine, and the kind of exhaustion that only comes from truly living.",
    color: "#c4708a",
    icon: "🌍",
    stops: [
      {
        city: "Lisbon", country: "Portugal", flag: "🇵🇹", days: "Days 1–4",
        description: "Golden trams, Alfama's winding alleys at dusk, and pastel de nata for breakfast. Lisbon is where the journey began.",
        photos: [
          { id: 1, url: ph("lisbon-tram", 800, 533), caption: "Tram 28 in Alfama" },
          { id: 2, url: ph("lisbon-view", 800, 533), caption: "Alfama rooftops" },
          { id: 3, url: ph("lisbon-belem", 800, 533), caption: "Belém Tower" },
        ],
      },
      {
        city: "Madrid", country: "Spain", flag: "🇪🇸", days: "Days 5–8",
        description: "Midnight tapas, the Prado before the crowds, and a flamenco show in a basement cave that I still think about.",
        photos: [
          { id: 4, url: ph("madrid-plaza", 800, 533), caption: "Gran Vía" },
          { id: 5, url: ph("madrid-retiro", 800, 533), caption: "Retiro Park" },
          { id: 6, url: ph("madrid-tapas", 800, 533), caption: "Tapas bar in La Latina" },
        ],
      },
      {
        city: "Paris", country: "France", flag: "🇫🇷", days: "Days 9–13",
        description: "More than the Eiffel Tower. Marais bistros, Seine riverbanks at dusk, Montmartre studios at night.",
        photos: [
          { id: 7, url: ph("paris-eiffel", 800, 533), caption: "Eiffel Tower at blue hour" },
          { id: 8, url: ph("paris-seine", 800, 533), caption: "Seine riverbanks" },
          { id: 9, url: ph("paris-cafe", 800, 533), caption: "Café de Flore" },
        ],
      },
      {
        city: "Florence", country: "Italy", flag: "🇮🇹", days: "Days 14–17",
        description: "Renaissance art on every corner, Chianti in every glass. Florence makes you feel like you're living inside a painting.",
        photos: [
          { id: 10, url: ph("florence-piazza", 800, 533), caption: "Piazzale Michelangelo" },
          { id: 11, url: ph("florence-duomo", 800, 533), caption: "Il Duomo" },
          { id: 12, url: ph("florence-ponte", 800, 533), caption: "Ponte Vecchio at sunset" },
        ],
      },
      {
        city: "Rome", country: "Italy", flag: "🇮🇹", days: "Days 18–21",
        description: "The Colosseum, pasta carbonara, and genuinely getting lost in Trastevere. Rome is best without a plan.",
        photos: [
          { id: 13, url: ph("rome-colosseum", 800, 533), caption: "Colosseum at sunrise" },
          { id: 14, url: ph("rome-trevi", 800, 533), caption: "Trevi Fountain" },
          { id: 15, url: ph("rome-trastevere", 800, 533), caption: "Trastevere alley" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Japan in Bloom",
    subtitle: "Cherry blossoms & ancient temples",
    dates: "Spring 2024 · 16 days",
    summary:
      "Sixteen days chasing sakura through ancient temples, neon-lit alleys, and mountain onsens. Japan rewired my relationship with photography — every frame felt like it had been composed for centuries.",
    color: "#9b7fc4",
    icon: "🌸",
    stops: [
      {
        city: "Tokyo", country: "Japan", flag: "🇯🇵", days: "Days 1–5",
        description: "Shibuya at rush hour, Shinjuku at midnight, ramen at 3am in a 6-seat shop with no English menu. Controlled chaos.",
        photos: [
          { id: 16, url: ph("tokyo-crossing", 800, 533), caption: "Shibuya Crossing" },
          { id: 17, url: ph("tokyo-temple", 800, 533), caption: "Senso-ji Temple, Asakusa" },
          { id: 18, url: ph("tokyo-ramen", 800, 533), caption: "Ramen at midnight" },
        ],
      },
      {
        city: "Hakone", country: "Japan", flag: "🇯🇵", days: "Days 6–7",
        description: "Mt. Fuji on the horizon, an outdoor onsen with a lake view, and absolute mountain silence.",
        photos: [
          { id: 19, url: ph("hakone-fuji", 800, 533), caption: "Mt. Fuji over Lake Ashi" },
          { id: 20, url: ph("hakone-onsen", 800, 533), caption: "Traditional ryokan garden" },
        ],
      },
      {
        city: "Kyoto", country: "Japan", flag: "🇯🇵", days: "Days 8–11",
        description: "Fushimi Inari at dawn, Arashiyama bamboo forest in morning mist, and matcha everything. Kyoto is Japan's soul.",
        photos: [
          { id: 21, url: ph("kyoto-torii", 800, 533), caption: "Fushimi Inari at dawn" },
          { id: 22, url: ph("kyoto-bamboo", 800, 533), caption: "Arashiyama bamboo grove" },
          { id: 23, url: ph("kyoto-gion", 800, 533), caption: "Gion district at night" },
        ],
      },
      {
        city: "Osaka", country: "Japan", flag: "🇯🇵", days: "Days 12–14",
        description: "Dotonbori neon at night, takoyaki from a street cart, and the friendliest locals I met on the entire trip.",
        photos: [
          { id: 24, url: ph("osaka-dotonbori", 800, 533), caption: "Dotonbori at night" },
          { id: 25, url: ph("osaka-takoyaki", 800, 533), caption: "Takoyaki street food" },
          { id: 26, url: ph("osaka-castle", 800, 533), caption: "Osaka Castle at dusk" },
        ],
      },
      {
        city: "Hiroshima", country: "Japan", flag: "🇯🇵", days: "Days 15–16",
        description: "The Peace Memorial Park changed the way I see the world. Then Miyajima's floating torii at high tide took my breath away.",
        photos: [
          { id: 27, url: ph("hiroshima-peace", 800, 533), caption: "Peace Memorial" },
          { id: 28, url: ph("hiroshima-torii", 800, 533), caption: "Miyajima floating torii gate" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Southeast Asia Circuit",
    subtitle: "Temples, rice terraces & island life",
    dates: "Winter 2022 · 28 days",
    summary:
      "A month of incense-filled temples, turquoise waters, and markets that never close. Southeast Asia is where I fell in love with travel photography.",
    color: "#7fc4c0",
    icon: "🌴",
    stops: [
      {
        city: "Bangkok", country: "Thailand", flag: "🇹🇭", days: "Days 1–5",
        description: "Wat Phra Kaew at golden hour, floating markets at noon, Khao San Road at midnight. A city of a thousand layers.",
        photos: [
          { id: 29, url: ph("bangkok-temple", 800, 533), caption: "Wat Phra Kaew" },
          { id: 30, url: ph("bangkok-market", 800, 533), caption: "Floating market" },
          { id: 31, url: ph("bangkok-night", 800, 533), caption: "Night market" },
        ],
      },
      {
        city: "Chiang Mai", country: "Thailand", flag: "🇹🇭", days: "Days 6–10",
        description: "Yi Peng lantern festival, hill tribe villages at dawn, and the best khao soi I have ever tasted.",
        photos: [
          { id: 32, url: ph("chiangmai-lantern", 800, 533), caption: "Yi Peng lantern festival" },
          { id: 33, url: ph("chiangmai-doi", 800, 533), caption: "Doi Suthep temple" },
          { id: 34, url: ph("chiangmai-walls", 800, 533), caption: "Old city walls at sunset" },
        ],
      },
      {
        city: "Bali", country: "Indonesia", flag: "🇮🇩", days: "Days 11–20",
        description: "Tegallalang rice terraces at sunrise, surfing in Canggu at noon, a full moon ceremony in Ubud at night.",
        photos: [
          { id: 35, url: ph("bali-rice", 800, 533), caption: "Tegallalang rice terraces" },
          { id: 36, url: ph("bali-tanah", 800, 533), caption: "Tanah Lot temple" },
          { id: 37, url: ph("bali-surf", 800, 533), caption: "Canggu surf at sunset" },
        ],
      },
      {
        city: "Lombok", country: "Indonesia", flag: "🇮🇩", days: "Days 21–28",
        description: "Gili Islands by boat, Rinjani views from a cliffside warung, and the most pristine beaches I have ever photographed.",
        photos: [
          { id: 38, url: ph("lombok-gili", 800, 533), caption: "Gili Trawangan" },
          { id: 39, url: ph("lombok-beach", 800, 533), caption: "Pink Beach, Lombok" },
          { id: 40, url: ph("lombok-rinjani", 800, 533), caption: "Mt. Rinjani at sunrise" },
        ],
      },
    ],
  },
];

// ─── Photography Gallery ──────────────────────────────────────────────────────

export interface GalleryPhoto {
  id: number;
  url: string;
  caption: string;
  location: string;
  year: string;
}

export const TOP_PHOTOS: GalleryPhoto[] = [
  { id: 1,  url: ph("tokyo-golden-hour",   1200, 800), caption: "Golden hour over Tokyo",           location: "Tokyo, Japan",           year: "2024" },
  { id: 2,  url: ph("kyoto-gate-mist",      533, 800), caption: "Torii gates at first light",       location: "Fushimi Inari, Japan",    year: "2024" },
  { id: 3,  url: ph("bali-rice-sunrise",    533, 800), caption: "Tegallalang before the crowds",    location: "Bali, Indonesia",         year: "2022" },
  { id: 4,  url: ph("lisbon-alfama-dusk",   800, 533), caption: "Alfama at dusk",                   location: "Lisbon, Portugal",        year: "2023" },
  { id: 5,  url: ph("miyajima-hightide",    800, 533), caption: "Floating torii at high tide",      location: "Miyajima, Japan",         year: "2024" },
  { id: 6,  url: ph("florence-ponte-gold",  800, 533), caption: "Ponte Vecchio golden hour",        location: "Florence, Italy",         year: "2023" },
  { id: 7,  url: ph("hakone-fuji-still",    533, 900), caption: "Fuji-san over Lake Ashi",          location: "Hakone, Japan",           year: "2024" },
  { id: 8,  url: ph("bangkok-dawn-temple", 1200, 700), caption: "Wat Phra Kaew at dawn",            location: "Bangkok, Thailand",       year: "2022" },
  { id: 9,  url: ph("gili-longtail-boat",   800, 533), caption: "Longtail boat, turquoise sea",     location: "Gili Islands, Indonesia", year: "2022" },
  { id: 10, url: ph("osaka-neon-rain",      800, 533), caption: "Dotonbori neon reflections",       location: "Osaka, Japan",            year: "2024" },
];

// ─── Travel Films ─────────────────────────────────────────────────────────────

export const FILM: FilmEntry = {
  title: "Japan in Bloom",
  subtitle: "A short travel film",
  location: "Tokyo · Hakone · Kyoto · Osaka · Hiroshima",
  year: "2024",
  duration: "4:32",
  description:
    "Sixteen days in Japan — cherry blossoms, bullet trains, mountain silence, neon noise — distilled into four and a half minutes.",
  youtubeId: "",
  thumbnailUrl: ph("japan-film-cover", 1280, 720),
};
