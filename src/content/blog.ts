// ─── Types ────────────────────────────────────────────────────────────────────

export type Category = "tech" | "travel" | "photography" | "life" | "work" | "events";

export interface ContentBlock {
  type: "p" | "h2" | "h3" | "quote" | "img" | "ul";
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: Category;
  tags: string[];
  coverImage: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
  body: ContentBlock[];
}

// ─── Category Metadata ────────────────────────────────────────────────────────

export const CATEGORY_COLORS: Record<Category, string> = {
  tech:        "#9b7fc4",
  travel:      "#c4708a",
  photography: "#7fc4c0",
  life:        "#c4a87f",
  work:        "#7fc488",
  events:      "#c4b87f",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  tech:        "Tech",
  travel:      "Travel",
  photography: "Photography",
  life:        "Life",
  work:        "Work",
  events:      "Events",
};

// ─── Placeholder helper ───────────────────────────────────────────────────────

const ph = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ─── Posts ────────────────────────────────────────────────────────────────────

export const POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "building-a-portfolio-that-feels-like-me",
    title: "Building a Portfolio That Feels Like Me",
    subtitle: "On choosing craft over templates",
    date: "2025-05-20",
    category: "tech",
    tags: ["React", "Design", "Portfolio"],
    coverImage: ph("portfolio-code-desk", 1280, 720),
    excerpt:
      "Most developer portfolios look the same — dark mode, hero text, project grid, contact form. I wanted something that told a story. Here is how I built mine from scratch.",
    readTime: "6 min",
    featured: true,
    body: [
      { type: "p", text: "The first version of my portfolio was exactly what you'd expect: a hero with my name and title, a list of skills, a project grid, and a contact form. It was functional, professional, and completely forgettable." },
      { type: "h2", text: "The problem with templates" },
      { type: "p", text: "Templates are seductive. They promise a polished result in minutes and they deliver — but at the cost of your personality. When every engineer's portfolio looks the same, the work has to do all the talking. I wanted the medium to be part of the message." },
      { type: "quote", text: "The goal wasn't to build something impressive. It was to build something honest." },
      { type: "h2", text: "Starting from a blank canvas" },
      { type: "p", text: "I started with React, Vite, and Tailwind CSS v4. No UI component library, no template. Just a design system I built from scratch — a color palette of rose, lavender, and teal on a deep purple background. Colors chosen to feel like a late night with a good book." },
      { type: "img", url: ph("portfolio-color-palette", 800, 450), caption: "The color palette — rose, lavender, teal on #13111d" },
      { type: "h2", text: "The personal page: life outside the terminal" },
      { type: "p", text: "The most interesting decision was adding a /me page. A separate route dedicated entirely to who I am beyond the code — travel adventures with interactive route maps, a photography gallery, a travel film section. These aren't resume items. They're the things that make me, me." },
      { type: "p", text: "If you're building a portfolio and fighting the urge to add personality, stop fighting it. The work you care about most will attract the people worth working with." },
    ],
  },
  {
    id: 2,
    slug: "japan-in-16-days",
    title: "Japan in 16 Days: The Trip That Changed How I See Light",
    subtitle: "Cherry blossoms, bullet trains, and a camera always at hand",
    date: "2024-04-18",
    category: "travel",
    tags: ["Japan", "Travel", "Photography"],
    coverImage: ph("japan-cherry-blossom-path", 1280, 720),
    excerpt:
      "I went to Japan expecting temples and sushi. What I didn't expect was how the light there would permanently change how I look at everything I photograph.",
    readTime: "8 min",
    body: [
      { type: "p", text: "Sixteen days. Five cities. One camera. More than a thousand photographs, of which maybe thirty are actually good. That's the mathematics of travel photography in Japan — a country so relentlessly beautiful that even mediocre shots look cinematic." },
      { type: "h2", text: "Tokyo: controlled chaos" },
      { type: "p", text: "The first thing that hits you about Tokyo is the scale. Not just the buildings, but the density of detail — every alley has something worth photographing. Shibuya crossing at 7pm is exactly as overwhelming as everyone says, and you want to shoot it anyway." },
      { type: "img", url: ph("tokyo-shibuya-night-crossing", 800, 533), caption: "Shibuya crossing at rush hour — 500 people, one frame" },
      { type: "h2", text: "Kyoto: the light is different here" },
      { type: "p", text: "Kyoto rewired something in me. The light between the torii gates at Fushimi Inari at 6am — before the crowds, before the heat — is a specific quality of orange that I've been trying to recreate in every shoot since." },
      { type: "quote", text: "The best photographs I've ever taken were in places where I had no phone signal and no agenda." },
      { type: "h2", text: "The lesson" },
      { type: "p", text: "Japan taught me to slow down. Not just as a photographer — as a person. To sit with a bowl of ramen for twenty minutes without looking at my phone. To wait for the right light instead of shooting the available light. Patience is a creative skill." },
    ],
  },
  {
    id: 3,
    slug: "shooting-streets-of-lisbon",
    title: "What I Learned Shooting the Streets of Lisbon",
    subtitle: "My home city through a camera lens",
    date: "2024-01-10",
    category: "photography",
    tags: ["Photography", "Lisbon", "Street"],
    coverImage: ph("lisbon-tram-street-morning", 1280, 720),
    excerpt:
      "There's something strange about photographing the city you grew up in. You stop seeing it as a local and start seeing it as a traveller. And that changes everything.",
    readTime: "5 min",
    body: [
      { type: "p", text: "I've lived in Lisbon for most of my life. I know which tram makes the best sound, which miradouro is less crowded at sunset, which pastéis de nata are actually worth the queue. And for years, I barely photographed any of it." },
      { type: "h2", text: "The familiarity problem" },
      { type: "p", text: "Familiarity is the enemy of seeing. When you know a place too well, you stop noticing it. The Alfama light at 5pm is extraordinary — I walked past it for years before I ever stopped to photograph it." },
      { type: "img", url: ph("lisbon-alfama-golden-rooftop", 800, 533), caption: "Alfama, 5:30pm, February — the light I had been ignoring for years" },
      { type: "quote", text: "Pretend you're a tourist. Give yourself the permission to be obvious." },
      { type: "h2", text: "What changed" },
      { type: "p", text: "The shift happened when I started treating Lisbon the way I'd treat a foreign city: with intention, with a route, with curiosity about what's around the next corner even though I already know what's there. That deliberateness made the photographs better. It also made me a better traveller everywhere else." },
    ],
  },
  {
    id: 4,
    slug: "from-student-to-engineer",
    title: "From Engineering Student to Software Engineer: The Gap No One Prepares You For",
    subtitle: "What university doesn't teach you",
    date: "2024-11-03",
    category: "tech",
    tags: ["Career", "Engineering", "Learning"],
    coverImage: ph("graduation-lecture-hall-campus", 1280, 720),
    excerpt:
      "University teaches you to think like an engineer. Your first job teaches you to work like one. The gap between those two things is wider than anyone admits.",
    readTime: "7 min",
    body: [
      { type: "p", text: "I graduated with a Master's in Computer Science and Engineering with a 17/20. I could implement graph algorithms from memory, reason about distributed systems, and write clean proofs. None of that prepared me for my first production incident." },
      { type: "h2", text: "The things they don't teach" },
      { type: "ul", items: ["How to read a codebase you didn't write", "How to say 'I don't know' without losing credibility", "How to estimate work without perfect information", "How to write a pull request that gets merged quickly", "How to disagree with a senior engineer respectfully"] },
      { type: "h2", text: "What actually helped" },
      { type: "p", text: "The transition that helped me most wasn't a course or a book — it was my internship. Not because of the work itself, but because I was surrounded by engineers who'd been doing this for years and were willing to explain why, not just what." },
      { type: "quote", text: "Find the person on the team who asks the most questions in meetings. Sit next to them." },
      { type: "h2", text: "Two years in" },
      { type: "p", text: "Two years after joining as a junior, I spoke at my university's tech career event about the journey from student to engineer. Standing on the other side of that gap, the advice I'd give is simple: the discomfort you feel in the first year isn't a sign you're in the wrong field. It's a sign you're in the right one." },
    ],
  },
  {
    id: 5,
    slug: "bali-lombok-slow-down",
    title: "Bali, Lombok, and Learning to Slow Down",
    subtitle: "28 days in Southeast Asia without a fixed plan",
    date: "2023-02-14",
    category: "travel",
    tags: ["Bali", "Indonesia", "Travel"],
    coverImage: ph("bali-rice-terraces-dawn-mist", 1280, 720),
    excerpt:
      "I booked the first flight and the last hotel. Everything in between was up to chance. It was the best travel decision I've ever made.",
    readTime: "6 min",
    body: [
      { type: "p", text: "I'm a planner by nature. I make spreadsheets on holidays. I read every review. Southeast Asia in winter 2022 was the first time I deliberately did none of that — and it produced my best travel memories by a significant margin." },
      { type: "h2", text: "Bali: surrender to the pace" },
      { type: "p", text: "Bali moves at its own pace and resists being rushed. The rice terraces in Tegallalang are extraordinary at sunrise but require waking up at 4:30am and driving in the dark. The effort is exactly the point." },
      { type: "img", url: ph("bali-tegallalang-sunrise-fog", 800, 533), caption: "Tegallalang rice terraces, 6am — worth every minute of the 4:30am alarm" },
      { type: "h2", text: "Lombok: fewer crowds, same magic" },
      { type: "p", text: "Lombok is Bali ten years ago — less curated, less Instagrammed, more honest. The beaches on the south coast are as beautiful as anything I've seen, and I shared most of them with fewer than twenty people." },
      { type: "quote", text: "The places that are hardest to get to are the ones you'll remember most clearly." },
    ],
  },
  {
    id: 6,
    slug: "digital-detox-when-travelling",
    title: "Why I Do a Digital Detox Every Time I Travel",
    subtitle: "On being present in a hyper-connected world",
    date: "2024-09-07",
    category: "life",
    tags: ["Life", "Travel", "Mindfulness"],
    coverImage: ph("beach-sunset-phone-off", 1280, 720),
    excerpt:
      "I still bring my phone. I still use it for maps. But there are rules — and keeping them has made me a better traveller, a better photographer, and probably a better engineer.",
    readTime: "4 min",
    body: [
      { type: "p", text: "The rules are simple: no social media during the day, no emails after 7pm, no phone at dinner, no screen as the last thing I look at before sleep. I've kept these rules on every trip for the past three years." },
      { type: "h2", text: "What changes" },
      { type: "p", text: "The first thing that changes is how long time feels. A day in Japan without Instagram felt like three days — not because it was boring but because everything was registered, processed, remembered instead of scrolled past." },
      { type: "quote", text: "You can't be present in a moment and documenting it for an audience at the same time. Choose." },
      { type: "h2", text: "On photography vs. content creation" },
      { type: "p", text: "I bring a camera on every trip. I take hundreds of photographs. There is no contradiction here — photography is a form of paying attention. Doomscrolling is the opposite. The line isn't whether you're using a device; it's whether the device is using you." },
    ],
  },
  {
    id: 7,
    slug: "five-settings-travel-photography",
    title: "Five Camera Settings That Changed My Travel Photography",
    subtitle: "Technical notes from three years of shooting on the road",
    date: "2024-07-22",
    category: "photography",
    tags: ["Photography", "Camera", "Tips"],
    coverImage: ph("camera-lens-golden-hour-field", 1280, 720),
    excerpt:
      "I'm not a professional photographer. But after three years and a dozen countries, I've found a handful of settings that consistently produce the images I'm after.",
    readTime: "5 min",
    body: [
      { type: "p", text: "Most travel photography advice focuses on gear. Go mirrorless. Buy the 35mm prime. Upgrade to full frame. But the photographs that changed my work most weren't the result of new equipment — they were the result of understanding what I already had." },
      { type: "h2", text: "The five settings" },
      { type: "ul", items: ["Shoot in RAW — always, without exception", "Manual white balance set to Kelvin: 5500K for golden hour, 3200K for artificial light", "Back-button focus, AF tracking on moving subjects", "Exposure compensation: slightly underexpose, recover in post", "High-speed burst for street and movement — delete aggressively afterwards"] },
      { type: "h2", text: "The one that matters most" },
      { type: "p", text: "If I had to choose one: shoot RAW. JPEG locks in the camera's decisions about colour, contrast, and sharpness. RAW is the conversation — you make those decisions yourself, after the fact, with the luxury of time. That's where photographs become photographs." },
      { type: "quote", text: "Great photographs aren't captured. They're built — a collaboration between the moment and the edit." },
    ],
  },
];
