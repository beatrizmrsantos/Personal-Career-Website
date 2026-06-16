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
  subtitle: "On choosing creativity, interaction, and personality over templates",
  date: "2026-06-15",
  category: "tech",
  tags: ["React", "Design", "Portfolio", "Frontend"],
  coverImage: ph("portfolio-code-desk", 1280, 720),
  excerpt:
    "Most developer portfolios follow a predictable formula. I wanted mine to feel intentional — something that reflects not only what I build and my professional carreer, but also my personality.",
  readTime: "10 min",
  featured: true,
  body: [
    {
      type: "p",
      text:
        "The first version of my portfolio looked exactly like most others: a hero section with my name and role, a skills overview, a project grid, and a contact form. It was clean, functional, and technically complete — but it didn’t feel like me."
    },
    { type: "h2", text: "The problem with templates" },
    {
      type: "p",
      text:
        "Templates are efficient and often well-designed, but they tend to produce similar outcomes. When every developer portfolio follows the same structure, individuality gets lost in consistency. I wanted my portfolio to communicate more than just experience — I wanted it to express me."
    },
    {
      type: "quote",
      text:
        "The goal was never to impress through complexity, but to communicate through creativity and interaction."
    },
    { type: "h2", text: "Starting from a blank canvas" },
    {
      type: "p",
      text:
        "I rebuilt everything using React, Vite, and Tailwind CSS v4, intentionally avoiding UI libraries and pre-made templates. Instead, I focused on designing a small, cohesive design system from scratch, including a custom color palette built around rose, lavender, and purple tones on a deep dark background. This reflects both my feminine side and my computer science mindset, bringing together two seemingly opposite parts of my identity into a unified visual expression."
    },
    {
      type: "img",
      url: ph("portfolio-color-palette", 800, 450),
      caption: "Custom design system — rose, lavender, and purple on a deep black background"
    },
    { type: "h2", text: "The beginner of the ideia" },
    {
      type: "p",
      text:
        "One of the core ideas behind this portfolio was, from the very beginning, travel. Traveling is one of my biggest passions, and I wanted that to be immediately visible in the way the site is experienced. This is where the concept of an interactive globe came from — a space where users can explore my journey on their own, discovering experiences I’ve had across different locations in the exact places where they happened. Instead of presenting a static timeline, I wanted to create something exploratory and spatial, closer to how I actually experience the world."
    },
    {
      type: "p",
      text:
        "Under the hood, the globe is built entirely from scratch using Three.js — a WebGL-based 3D graphics library — with no pre-made globe component. The sphere itself uses a SphereGeometry with 64 subdivisions rendered with MeshPhongMaterial to simulate depth and light realistically. A latitude/longitude grid is drawn on top as LineSegments, and continent and country outlines are decoded at runtime from real TopoJSON world data, then projected onto the sphere surface by converting geographic coordinates to 3D Cartesian vectors. Each career marker is a composite of four Three.js objects: an invisible hit sphere for raycasting, a coloured dot, a flat ring, and a soft outer glow — all positioned by converting real-world latitude/longitude into their exact point on the sphere. Mouse and touch interaction is handled by a Raycaster that runs on every animation frame, and globe rotation responds to drag velocity tracked directly from pointer events. The entire scene — globe, atmosphere glow, star field, and markers — runs in a requestAnimationFrame loop rendered to a transparent WebGL canvas mounted inside the React component tree."
    },
    {
      type: "p",
      text:
        "From there, the rest of the homepage evolved around my professional journey. Each section was designed with the same intent: to communicate experience in a simple, interactive, and dynamic way, while consistently tying everything back to the travel theme. Subtle details, like an airplane moving along my educational path, were added to reinforce this narrative and make the experience feel cohesive rather than purely informational. The goal of this first page was to present my professional background clearly, while also reflecting my personality and my ambition to build an international career."
    },
    { type: "h2", text: "Continuing the Idea" },
    {
      type: "p",
      text:
        "Later, I created the Beyond Code page — a space without constraints, focused entirely on personal expression. Here, I wanted to showcase not only my favorite hobbies, such as photography and videography, but also my most meaningful travel experiences. Instead of simply listing destinations or routes, I aimed to immerse the user in each journey through visual storytelling, combining curated photos with an interactive exploration of each place."
    },
    {
      type: "p",
      text:
        "Finally, the blog was created as a way to express what visuals alone cannot fully capture. This space allows me to go deeper into my thoughts — to articulate aspirations, reflections, and ideas that sit between technology, creativity, and personal growth. It is where I write about the technical side of engineering, but also about curiosity, ambition, and the evolving relationship I have with the things I build and the direction I want my career to take. It became the most honest layer of the portfolio — a place where design and interactivity give way to narrative and introspection."
    },
    { type: "h2", text: "Conclusion" },
    {
      type: "p",
      text:
        "If you're building a portfolio and hesitate to include personality, consider this: the most interesting opportunities rarely come from perfect presentations — they come from authentic ones."
    }
  ]
  },
  {
  id: 2,
  slug: "six-months-across-asia-reflection",
  title: "Six Months Across Asia",
  subtitle: "On perspective, culture, and learning there is more than one way to live",
  date: "2026-05-10",
  category: "life",
  tags: ["Travel", "Reflection", "Growth", "Culture"],
  coverImage: ph("asia-travel-map", 1280, 720),
  excerpt:
    "What started as a six-month trip across Asia became one of the most transformative experiences of my life, changing the way I think about success, happiness, relationships, and the future I want to build.",
  readTime: "10 min",
  body: [
    {
      type: "p",
      text:
        "Six months ago, I decided to step away from my routine and travel across Asia. What started as a childhood dream of visiting ten countries became something much bigger than travel itself. It became an opportunity to disconnect from daily life, challenge my assumptions, and gain a new perspective on both my personal and professional future."
    },

    { type: "h2", text: "An eye-opening experience" },

    {
      type: "p",
      text:
        "The biggest impact of this journey was not the places I visited, but the way it changed how I see the world. For the first time, I was constantly surrounded by cultures, traditions, and ways of thinking completely different from my own. Every day became an opportunity to learn, question, and reflect."
    },

    {
      type: "p",
      text:
        "Of course, there were the obvious cultural differences. The food was often much simpler than I expected, yet incredibly flavourful and almost (or always) spicy. And then there was durian — a fruit I had heard about countless times but was still completely unprepared for. Its smell alone deserves its own story. The languages, clothing, architecture, and daily routines all reminded me that there is no single way to live."
    },

    { type: "h2", text: "Different views on life" },

    {
      type: "p",
      text:
        "What fascinated me most, however, were the differences that are not immediately visible. The way people think about work, family, friendship, success, and happiness often felt very different from what I was used to. In many places, I met people who owned very little by Western standards yet seemed genuinely fulfilled. Having enough food to eat, somewhere safe to sleep, and people they loved around them was often considered enough."
    },

    {
      type: "p",
      text:
        "It made me question the mindset many of us grow up with — the constant pressure to achieve more, earn more, own more, and always look towards the next milestone. For the first time, I started to consider that sometimes what we already have may be enough. What struck me most was that many of the people I met had significantly less than what most of us in the West take for granted, yet often seemed happier and more content with their lives. It made me reflect on how easily we fall into the habit of comparing ourselves to those who have more, focusing on what we lack rather than appreciating what we already have. In many ways, we have more opportunities, comfort, and security than ever before, yet we often feel dissatisfied because our definition of “enough” keeps moving further away."
    },

    {
      type: "p",
      text:
        "I also met people with dreams they knew they might never be able to achieve because of financial limitations or restrictions imposed by the governments of their countries. Many of them worked incredibly hard, often spending twelve hours a day working simply to earn enough to support themselves and their families. Despite this, they remained optimistic, grateful, and hopeful. I spoke to people whose dream was simply to travel, to see Europe, or to experience places they had only ever seen online, knowing that such opportunities might realistically remain out of reach. Their resilience, humility, and ability to find joy despite circumstances that many of us would consider difficult left a lasting impression on me and made me appreciate just how fortunate I am."
    },

    { type: "h2", text: "Faith, spirituality, and meaning" },

    {
      type: "p",
      text:
        "Another aspect that deeply influenced me was religion and spirituality. Growing up in Europe, I was familiar with a particular way of understanding faith. Throughout Asia, I encountered beliefs and philosophies that often focused more on mindfulness, kindness, inner peace, family, and the positive impact individuals can have on the world around them."
    },

    {
      type: "p",
      text:
        "I was fascinated by how present spirituality felt in everyday life. Ideas such as karma, balance, respect for nature, gratitude, and the connection between past and present generations appeared repeatedly across different cultures and religions."
    },

    {
      type: "p",
      text:
        "One concept that particularly stayed with me was the relationship many families maintain with their ancestors. In several countries, family members who have passed away continue to play an important role in traditions, celebrations, and even major family decisions. It was a beautiful reminder that our relationships do not necessarily end when life does."
    },

    {
    type: "p",
    text:
      "Another idea that fascinated me was the presence of spirits in everyday life. In many places, spirits were not seen as distant or abstract concepts, but as beings that coexist alongside us and remain connected to the physical world. Small shrines could be found outside homes, businesses, and even skyscrapers, with offerings made to bring protection, harmony, and good fortune. Whether or not one shares these beliefs, it was remarkable to see how naturally they were woven into daily life. It made me reflect on the different ways cultures seek meaning, connection, and comfort in things that cannot always be explained."
    },
    
    { type: "h2", text: "Beauty through a different lens" },

    {
      type: "p",
      text:
        "Even beauty standards challenged many assumptions I had unconsciously accepted. In countries such as China, South Korea and Japan, ideals often centred around fair skin, youthful features, and a delicate appearance. Avoiding sun exposure was taken seriously, with umbrellas, masks, and long-sleeved clothing being common even on extremely hot days."
    },

    {
      type: "p",
      text:
        "Makeup was often used very differently from what I was accustomed to seeing in the West. Rather than dramatically changing someone's appearance, it was frequently applied to subtly enhance features such as bright skin, larger-looking eyes, soft blush tones, and an overall youthful look. It was a reminder that beauty standards are deeply cultural and far less universal than we often assume."
    },

    { type: "h2", text: "Returning home"},

    {
      type: "p",
      text:
        "As the journey came to an end, I realised that what I was bringing home was far more valuable than photographs, souvenirs, or passport stamps. I returned with a renewed appreciation for my family, my friends, my routine, and the comfort of having a place to call home."
    },

    {
      type: "p",
      text:
        "At the same time, I returned with a clearer understanding of the future I want to build. Traveling through ten countries made me more adaptable, independent, resilient, and open-minded. It strengthened my communication skills, my ability to navigate uncertainty, and my confidence in unfamiliar situations."
    },

    {
      type: "p",
      text:
        "Most importantly, it taught me that there is no single definition of success, happiness, or fulfilment. We are all shaped by different cultures, beliefs, experiences, and circumstances. Seeing that diversity firsthand was one of the greatest gifts this journey gave me."
    },

    {
      type: "quote",
      text:
        "The greatest thing travel gave me was not memories, but perspective."
    }
  ]
  }
];
