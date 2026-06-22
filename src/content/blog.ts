// ─── Types ────────────────────────────────────────────────────────────────────

export type Category = "tech" | "travel" | "photography" | "life" | "work" | "events";

export interface GalleryItem {
  url: string;
  caption?: string;
}

export interface ContentBlock {
  type: "p" | "h2" | "h3" | "quote" | "img" | "ul" | "gallery";
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
  photos?: GalleryItem[];
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
  events:      "#7f9ec4",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  tech:        "Tech",
  travel:      "Travel",
  photography: "Photography",
  life:        "Life",
  work:        "Work",
  events:      "Events",
};

import { img as ph } from "@/content/cloudinary";

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
  coverImage: ph("website_wovdv7", 1280, 720),
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
        "I rebuilt everything using React, Vite, and Tailwind CSS v4, intentionally avoiding UI libraries and pre-made templates. Instead, I focused on designing a small, cohesive design system from scratch, including a custom color palette built around rose and lavender on a dark purple background. This reflects both my feminine side and my computer science mindset, bringing together two seemingly opposite parts of my identity into a unified visual expression."
    },
    {
      type: "img",
      url: ph("colorPallet_nnw4qo", 1280, 720),
      caption: "Custom design system — rose, and lavender on a dark purple background"
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
  category: "travel",
  tags: ["Travel", "Reflection", "Growth", "Culture"],
  coverImage: ph("plain_gzst5i", 1280, 720),
  excerpt:
    "What started as a six-month trip across Asia became one of the most transformative experiences of my life, changing the way I think about success, happiness, relationships, and the future I want to build.",
  readTime: "10 min",
  body: [
    {
      type: "p",
      text:
        "Six months ago, I decided to step away from my routine and travel across Asia. Over the following 6 months, I explored Thailand, Japan, Indonesia, South Korea, China, Vietnam, Cambodia, Laos, Singapore, and Hong Kong. What started as a childhood dream of exploring Asia became something much bigger than travel itself. It became an opportunity to disconnect from daily life, challenge my assumptions, and gain a new perspective on both my personal and professional future."
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
        "Every country introduced me to new ways of living, eating, communicating, celebrating, and understanding the world. The languages, clothing, architecture, religions, social norms, and everyday routines were often completely different from what I had grown up with. Yet despite those differences, there was something remarkably familiar about people everywhere: the importance of family, community, friendship, and finding meaning in daily life."
    },

    {
      type: "p",
      text:
        "What fascinated me most was how deeply culture could influence things I had always considered universal. Even simple activities such as sharing a meal, greeting someone, expressing gratitude, or spending free time could look completely different depending on where I was. The more countries I visited, the more I realized there is no single 'correct' way to live."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("neckVillage_umpbuo", 900, 600), caption: "Long Neck Karen Weaver - Northern Thailand" },
        { url: ph("floatingVillage_fkvrh0", 600, 400), caption: "Floating Market - Thailand" },
        { url: ph("musicJapan_jdeyxq", 600, 400), caption: "Bamboo Grove Musician - Japan" },
        { url: ph("northVietnameDressing_hlhybq", 1200, 600), caption: "Traditional Dress - Northern Vietnam" },
      ],
    },

    { type: "h2", text: "A Journey Through Food" },

    {
      type: "p",
      text:
        "If there was one thing that immersed me in local cultures faster than anything else, it was food. Every destination introduced me to new ingredients, flavours, cooking techniques, and traditions. Some meals felt comfortingly familiar, while others challenged every expectation I had."
    },

    {
      type: "p",
      text:
        "One of the most memorable discoveries was durian. Before arriving in Southeast Asia, I had heard countless stories about the fruit famous for its incredibly strong smell. What I did not realize was how important it is culturally throughout the region. In countries such as Thailand, and Vietnam, durian is often referred to as the 'King of Fruits' and is celebrated almost as a national treasure. It appeared everywhere: in markets, street stalls, desserts, ice creams, cakes, candies, and even coffee. People would travel specifically to try famous varieties, discuss their favourites with surprising passion, and proudly introduce visitors to their country's best durian."
    },

    {
      type: "p",
      text:
        "The smell was every bit as powerful as people claim. In fact, many hotels, public transport systems, and indoor spaces explicitly ban bringing durian inside. Yet once I managed to overcome the initial shock, I understood why so many people loved it. Its flavour was unlike anything I had ever tasted before: sweet, creamy, complex, and impossible to compare to any fruit I knew."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("durian_cfwijd", 900, 600), caption: "Durian, the 'King of Fruits' of Southeast Asia" },
      ],
    },

    {
      type: "p",
      text:
        "Southeast Asia also introduced me to foods I had never imagined seeing outside of documentaries. Night markets frequently displayed trays filled with fried crickets, grasshoppers, larvae, silkworm pupae, scorpions, and even snakes. In some regions, crocodile and rat were also considered normal sources of protein. What initially felt shocking quickly became another reminder of how strongly food is shaped by geography, history, and available resources. The experience taught me that many of our ideas about what is 'normal' to eat are simply the result of where and how we grow up."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("scorpians_qnzsvk", 600, 400), caption: "Insect & Scorpion Skewers - Thailand Night Market" },
        { url: ph("crocodiles_of8ol7", 600, 400), caption: "Crocodile BBQ Stand - Thailand Night Market" },
        { url: ph("insetcs_gmu9yh", 600, 400), caption: "Fried Insect Market Stall - Thailand" },
      ],
    },

    {
      type: "p",
      text:
        "Beyond the unusual ingredients, I quickly learned that spicy food in Asia operates on a completely different scale. Nowhere was this more obvious than in China and South Korea. Many dishes that locals considered only mildly spicy were already beyond my limits. There were moments when I genuinely felt unable to try what seemed like 95% of the menu."
    },

    {
      type: "p",
      text:
        "In some Sichuan restaurants, I could smell the chilli and peppercorns before even entering the building. Walking past food stalls was enough to feel the spice in the air. While I gradually built some tolerance, I never quite reached local standards."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("koreanMarket_xcqg99", 600, 400), caption: "Korean Street Food Stall" },
        { url: ph("spicy_ai7sbb", 600, 400), caption: "Sichuan Spice Market - China" },
        { url: ph("koreanSpice_urgq3h", 600, 400), caption: "Myeongdong Tteokbokki Street Cart - South Korea" },
      ],
    },

    {
      type: "p",
      text:
        "What surprised me most was the incredible diversity of flavours. Southeast Asian cuisine often felt simple yet remarkably fresh. Meals frequently revolved around rice, vegetables, herbs, grilled meats, seafood, and ingredients sourced locally. Despite using relatively few components, the resulting flavours were often vibrant and memorable."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("baliFood_thhs4f", 600, 400), caption: "Indonesian Warung Lunch - Bali" },
        { url: ph("vietnameErbs_cwfjzu", 600, 400), caption: "Vietnamese Noodle Soup Feast" },
        { url: ph("vietnameFood_aqjo7o", 600, 400), caption: "Vietnamese Street Lunch" },
      ],
    },

    {
      type: "p",
      text:
        "As I travelled further north, particularly through Japan, South Korea, and China, I encountered increasingly complex culinary traditions. Dishes often involved intricate preparation methods, carefully balanced flavours, countless seasonings, and centuries of refinement. It felt less like eating and more like experiencing a craft that had been perfected over generations."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("bowls_yirwp7", 600, 400), caption: "Sichuan Noodle Bowls - China" },
        { url: ph("koreanBarbecue_ahss70", 600, 400), caption: "Korean Barbecue - South Korea" },
        { url: ph("curry_rcf4zk", 600, 400), caption: "Tonkatsu Curry Rice - Japan" },
        { url: ph("ramen_wj8bjj", 600, 400), caption: "Tonkotsu Ramen - Japan" },
        { url: ph("chineseDish_kpxhia", 600, 400), caption: "Chinese Restaurant Set Meal" },
      ],
    },

    {
      type: "p",
      text:
        "And then there was rice. Rice was everywhere. Breakfast, lunch, dinner, snacks, desserts — it seemed impossible to escape. Whenever rice was absent, noodles usually took its place. Noodle soups appeared at every hour of the day, including breakfast. Seeing people happily eating steaming bowls of noodles and broth at 8 a.m. in temperatures above 30°C initially seemed bizarre to me, but eventually it became part of the rhythm of daily life."
    },

    {
      type: "p",
      text:
        "The fruit was equally unforgettable. Markets overflowed with mangoes, dragon fruit, mangosteen, lychees, rambutan, jackfruit, papaya, and countless varieties I had never seen before. Everything tasted fresher, sweeter, and more vibrant than what I was accustomed to finding in Europe."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("fruit_f6nfsa", 600, 400), caption: "Tropical Fruit Plate & Mango Smoothie" },
        { url: ph("chineseFruit_jgfitq", 600, 400), caption: "Fruit Vendor - China" },
        { url: ph("coconut_qoz0du", 600, 400), caption: "Fresh Coconut" },
      ],
    },

    {
      type: "p",
      text:
        "Looking back, food became far more than something I ate during my travels. It became one of the most direct ways of understanding local culture. Every ingredient, flavour, cooking method, and dining custom told a story about geography, history, climate, trade, family traditions, and the people who called those places home."
    },

    { type: "h2", text: "Adventures and Unforgettable Places" },

    {
      type: "p",
      text:
        "While every moment of this journey left a mark on me, there were certain adventures and places that truly took my breath away. They pushed me out of my comfort zone, filled me with awe, and reminded me how vast, wild, and beautiful this world is. Some challenged me physically, others emotionally, but all of them became memories I will carry for the rest of my life."
    },

    {
      type: "p",
      text:
        "Some of the most magical experiences happened in nature. In Indonesia, I snorkelled through crystal-clear waters surrounded by vibrant coral reefs that looked like underwater gardens. I swam alongside sea turtles, watched rays glide effortlessly beneath me, and explored the famous underwater Nest statues in the Gili Islands. It felt like entering a completely different world, one that was peaceful, colourful, and full of life."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("jonyTurtle_obcquh", 900, 600), caption: "Snorkelling with turtles" },
        { url: ph("coral1_yg608e", 600, 400), caption: "Coral Reef - Gili Air" },
        { url: ph("turtle_ikb5tt", 600, 400), caption: "Turtle" },
        { url: ph("coral2_bukcue", 1200, 600), caption: "Coral Reef - Gili Air" },
        { url: ph("manta_vmixsz", 1200, 600), caption: "Manta Rays - Nusa Penida" },
      ],
    },

    {
      type: "p",
      text:
        "Indonesia was also home to the most spectacular waterfalls I encountered during my six months across Asia. Hidden deep within lush jungles and surrounded by dramatic landscapes, each one felt more impressive than the last. Some required trekking through dense forests, crossing rivers, and descending steep paths, but the reward was always worth the effort. Standing beneath towering cascades, feeling the cool mist in the air, and listening to the thunderous sound of water crashing into emerald pools created moments that were impossible to forget. These waterfalls became some of my favourite experiences in Indonesia and a reminder of how extraordinary nature can be when you venture beyond the usual tourist trail."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("cascata9_pl1mgy", 1200, 600), caption: "Waterfall - Indonesia" },
        { url: ph("cascata6_pnsti0", 900, 600), caption: "Waterfall - Indonesia" },
        { url: ph("cascata5_nmndr9", 600, 400), caption: "Waterfall - Indonesia" },
        { url: ph("cascata4_szmhh9", 600, 400), caption: "Waterfall - Indonesia" },
        { url: ph("cascata1_ghub84", 1200, 600), caption: "Waterfall - Indonesia" },
      ],
    },

    {
      type: "p",
      text:
        "One of the highlights of the entire journey was the Ha Giang Loop in northern Vietnam. For four days, I travelled through some of the most stunning mountain landscapes I have ever seen, riding along winding roads surrounded by towering peaks, deep valleys, and endless rice terraces. Beyond the scenery, what made the experience special were the interactions with local communities, sharing meals, learning about their traditions, and witnessing daily life in villages far removed from the modern world."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("mountains_oq6gjn", 1200, 600), caption: "Karst Mountain Valley - Ha Giang, Vietnam" },
        { url: ph("road_zkkn4m", 900, 600), caption: "Motorbiking the Ha Giang Loop - Vietnam" },
        { url: ph("village_nskicv", 600, 400), caption: "Mountain Village Pit Stop - Ha Giang, Vietnam" },
        { url: ph("vietnamiteBoy_gvcvs5", 600, 400), caption: "Young Khèn Player - Vietnam" },
        { url: ph("drinking_ekvinq", 1200, 600), caption: "Dinner - Vietnam" },
      ],
    },

    {
      type: "p",
      text:
        "In Laos, adventure took a completely different form. Floating high above Vang Vieng in a hot air balloon at sunrise allowed me to see rivers, mountains, and forests stretching endlessly towards the horizon. Later, paramotoring above the countryside offered an entirely new perspective on the landscape below. Yet one of my favourite memories in Laos was much slower. During a three-day boat journey along the Mekong River from Thailand to Luang Prabang, life seemed to pause. We travelled through silence, passing remote villages, fishermen casting their nets, children playing in the river, elephants wandering along the banks, and landscapes that felt untouched by time."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("barcoLaos_z5lkcx", 600, 400), caption: "Mekong River Cruise - Laos" },
        { url: ph("paramoturingLaos_vjd7cd", 900, 600), caption: "Paramotoring Over Vang Vieng - Laos" },
        { url: ph("baloesArQuente_zemncn", 1200, 600), caption: "Hot Air Balloons Over Vang Vieng - Laos" },
        { url: ph("laosRiver_vccnmk", 600, 400), caption: "Mekong River - Laos" },
        { url: ph("laosPeople_ngy6t1", 1200, 600), caption: "Local People by the Mekong - Laos" },
      ],
    },

    {
      type: "p",
      text:
        "Thailand was home to some of the most beautiful islands and beaches I visited during the journey. Crystal-clear turquoise waters, colourful tropical fish, and dramatic limestone mountains covered in lush rainforest created landscapes that often felt unreal. Whether snorkelling among vibrant marine life or simply taking in the views from the shore, the natural beauty of southern Thailand constantly exceeded expectations."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("krabi_mbpx2l", 600, 400), caption: "Railay Beach Longtail Boats - Krabi, Thailand" },
        { url: ph("blueWaters_aiq7sw", 900, 600), caption: "Crystal Waters - Thailand" },
        { url: ph("Island_dqdu84", 1200, 600), caption: "Koh Tao Coastline - Thailand" },
      ],
    },

    {
      type: "p",
      text:
        "One of the highlights of the country was Khao Sok National Park. Surrounded by towering limestone cliffs and emerald waters, I spent nights in floating bungalows on the lake, waking up to mist drifting across the mountains. I explored the area by boat, weaving between spectacular rock formations, paddled along peaceful rivers by canoe, and joined sunrise wildlife safaris where the jungle slowly came to life as the first light appeared over the landscape."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("khaoSok_ltolk8", 600, 400), caption: "Khao Sok National Park - Thailand" },
        { url: ph("boat_xzfbal", 900, 600), caption: "Cheow Lan Lake - Khao Sok, Thailand" },
        { url: ph("kaiaque_ffsnn9", 1200, 600), caption: "Kayaking Cheow Lan Lake - Khao Sok, Thailand" },
        { url: ph("bangalow_jsqv2w", 600, 400), caption: "Floating Bungalow - Khao Sok, Thailand" },
      ],
    },

    {
      type: "p",
      text:
        "Another unforgettable experience was spending time with rescued elephants, helping feed them and even joining them in the water for a bath. Thailand was also where I celebrated New Year's Eve on a beach island surrounded by travellers from all over the world. As midnight approached, thousands of lanterns carrying wishes and hopes floated into the night sky while fireworks exploded continuously along the entire shoreline, often just metres away from us. It was chaotic, loud, and unforgettable — one of those moments that perfectly captured the energy and spontaneity of long-term travel."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("elephant_cipuzo", 900, 600), caption: "Elephant Sanctuary Encounter - Thailand" },
        { url: ph("elephants_o5lv3a", 600, 400), caption: "Elephant Family - Thailand" },
        { url: ph("newYear_rju6tp", 1200, 600), caption: "New Year's Fireworks on the Beach - Thailand" },
        { url: ph("lantern_kw5ktm", 600, 400), caption: "Releasing a Sky Lantern in New Year's - Thailand" },
      ],
    },

    {
      type: "p",
      text:
        "Cambodia offered some of the most remarkable historical and cultural experiences of the entire journey. Visiting Angkor Wat and the surrounding temple complex was unforgettable, not only because of its beauty but because of its immense scale and the sense of history that seemed to surround every stone. Walking through these vast structures, it was impossible not to be amazed by the sophistication, wealth, and ambition of the civilisation that built them centuries ago. What made the experience even more special was seeing how nature had slowly reclaimed many of the temples. Deep within the jungle, enormous tree roots and towering trunks grew through ancient walls and rooftops, creating scenes that felt almost surreal. Some temples appeared to be slowly disappearing back into the forest, offering a striking contrast between human achievement and the power of nature. Cambodia also introduced me to floating villages, where entire communities spend much of the year living directly on the water. Families build their own wooden houses using highly durable timber from the surrounding flooded forests, creating homes, schools, and businesses that rise and fall with the changing water levels. One of the most unique experiences was taking a small wooden boat through a flooded forest, gliding between partially submerged trees while surrounded by water in every direction. Being in the middle of what felt like an underwater woodland was unlike anything I had ever seen before and offered a fascinating glimpse into a way of life shaped entirely by the natural environment."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("AnkorWatSunrise_iweqlp", 900, 600), caption: "Sunrise Silhouette at Angkor Wat - Cambodia" },
        { url: ph("AnkorWat_vbauyk", 600, 400), caption: "Ta Prohm Temple Towers - Angkor, Cambodia" },
        { url: ph("ankorWatNature_o75mvs", 1200, 600), caption: "Tree Roots Engulfing Ta Prohm - Cambodia" },
        { url: ph("floatingVillage_oipmyv", 600, 400), caption: "Stilted Houses on Tonle Sap Floating Village - Cambodia" },
        { url: ph("riverCamboja_mwklis", 600, 400), caption: "Boat Ride Through the Flooded Forest - Cambodia" },
      ],
    },

    {
      type: "p",
      text:
        "Indonesia was also home to one of the most beautiful and unique sunrises of the entire journey. Before dawn, I stood overlooking a landscape of active volcanoes as the first light slowly illuminated the mountains and valleys below. Watching smoke rise from their craters while the sky changed colour created a scene unlike anything I had ever seen. Afterwards, I crossed a vast volcanic desert by jeep, driving across black sand and dunes formed by centuries of eruptions. The adventure culminated with a climb to the rim of an active crater, where I was able to look directly into the volcano and watch smoke emerge from deep within the earth. Standing on the edge of a living volcano, surrounded by dramatic volcanic landscapes stretching to the horizon, was one of the most extraordinary experiences of the entire trip."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("vulcanos_isgjfo", 900, 600), caption: "Sunrise Over Mount Bromo's Volcanic Range - Indonesia" },
        { url: ph("vulcano_oszmqc", 600, 400), caption: "Gazing Over the Crater - Mount Bromo, Indonesia" },
        { url: ph("vulcanoEruption_z3x2hu", 1200, 600), caption: "Smoking Crater - Mount Bromo, Indonesia" },
        { url: ph("JeepRide_mx3sra", 600, 400), caption: "Jeep Convoy Across the Sea of Sand - Bromo, Indonesia" },
        { url: ph("Jeep_o5cr9a", 600, 400), caption: "Jeep Adventure - Mount Bromo Indonesia" },
      ],
    },

    {
      type: "p",
      text:
        "China brought several lifelong dreams to reality. Walking along the Great Wall of China and visiting the Terracotta Army were both unforgettable experiences, not only because of their scale but because of the immense weight of history they carry. Standing in front of these monumental achievements, it was impossible not to feel a deep sense of admiration for the generations that built and preserved them so remarkably well over thousands of years. The level of preservation was extraordinary, allowing a real connection with the past that felt both powerful and humbling."
    },

    {
      type: "p",
      text:
        "Visiting Zhangjiajie National Forest Park, the inspiration behind the floating mountains in Avatar, was especially meaningful since Avatar is my favourite film, which made the experience feel like I was stepping into the movie in real life. The landscapes were surreal, with towering stone pillars rising through mist and dense forest, creating scenes that felt almost unreal. I also visited Tianmen Mountain National Park, where I saw the famous Heaven’s Gate, a massive natural arch at the top of a mountain with a waterfall flowing through it, long believed to be a gateway to heaven. Walking along cliffside pathways suspended thousands of metres above the ground, surrounded by dramatic mountain views, made the experience even more unforgettable."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("chinaWall_zepzr8", 900, 600), caption: "Great Wall of China" },
        { url: ph("terracotaWarriors_cg554t", 600, 400), caption: "Terracotta Army" },
        { url: ph("avatar_tdmby6", 1200, 600), caption: "Zhangjiajie National Forest Park" },
        { url: ph("chinaNature_kruv3q", 600, 400), caption: "Tianmen Mountain National Park" },
        { url: ph("chinaNature2_hxtxm9", 600, 400), caption: "Heaven’s Gat - Tianmen Mountain National Park" },
      ],
    },

    {
      type: "p",
      text:
        "At the same time, China’s modern cities were some of the most impressive I have ever seen. Futuristic skylines filled with endless skyscrapers, neon lights, and cutting-edge architecture created a completely different atmosphere from the historical and natural sites. Nighttime in particular was unforgettable, with massive light shows and high-tech displays transforming entire districts into immersive visual experiences. I also watched large-scale performances that blended traditional Chinese culture with extremely modern production techniques, featuring some of the most impressive staging, choreography, and visual effects I have ever seen. These shows felt like world-class productions on an enormous scale, combining cultural storytelling with cutting-edge technology. What stood out most was the contrast between old and new: ancient temples and traditions existing side by side with ultra-modern infrastructure and technology-driven cities. This blend of heritage and innovation was present throughout the country and made China one of the most visually and culturally dynamic places of the entire journey."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("citySunset_hxhssu", 900, 600), caption: "Chongqing city sunset" },
        { url: ph("xangai_pakffr", 600, 400), caption: "Shanghai skyline" },
        { url: ph("chinaCity_arnd0b", 1200, 600), caption: "Hongya Cave - Chongqing" },
        { url: ph("chinaShow_gypxiw", 600, 400), caption: "Emperor Banquet Show - Biejing" },
        { url: ph("chinaTemple_rmhjx3", 600, 400), caption: "Ciyun Temple - Chongqing" },
      ],
    },

    {
      type: "p",
      text:
        "Japan offered many of the most personal moments of the trip. Seeing Mount Fuji completely free of clouds is something even many locals never experience, making the moment feel particularly special. Walking through snowy forests to observe the famous snow monkeys bathing in hot springs created one of the most unique wildlife encounters of my life. I also explored the famous bamboo forests, where towering green stalks surrounded narrow paths and created an atmosphere that felt almost silent and surreal. At the same time, Japan allowed me to embrace my inner child through visits to both Disney parks and Universal Studios, countless claw machines, photo booths, and more shopping than I care to admit. The country balanced natural beauty, tradition, and modern entertainment in a way unlike anywhere else."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("mountFuji_yjxfnb", 900, 600), caption: "Mount Fuji - Japan" },
        { url: ph("bambu_qof0hg", 600, 400), caption: "Bamboo Forest - Japan" },
        { url: ph("snowMonkey_fwudtb", 1200, 600), caption: "Snow Monkey - Jigokudani Snow Monkey Park" },
        { url: ph("disney_eygtqh", 600, 400), caption: "Disneyland - Tokyo" },
        { url: ph("clawMachine_g6igeu", 600, 400), caption: "Claw Machines - Japan" },
      ],
    },

    {
      type: "p",
      text:
        "South Korea, especially Seoul, offered a deeply immersive cultural experience. One of the highlights was wearing traditional hanbok while visiting the royal palaces, which made exploring the city feel like stepping back in time. I spent long days walking through Seoul, discovering viewpoints near ancient walls that revealed endless layers of the city. The atmosphere was a constant contrast between tradition and modern life, with countless cafés serving matcha in every variation imaginable, and street food stalls spread across every corner of the city. Entire markets were filled with rows of small stands, each offering dishes I had never seen before, often completely unfamiliar yet incredibly inviting. The only common thread was the excitement of eating outdoors, surrounded by the energy of the city and its people."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("tradicionalDressing_fs4p6t", 900, 600), caption: "Traditional Hanbok at Gyeongbokgung Palace - Seoul" },
        { url: ph("gards_qzxntv", 600, 400), caption: "Royal Guard Ceremony - Gyeongbokgung Palace, Seoul" },
        { url: ph("skylineWall_stgkvr", 1200, 600), caption: "Seoul City Wall with Skyline View" },
        { url: ph("market2_xroz3k", 600, 400), caption: "Covered Market - Seoul" },
        { url: ph("market1_guhwka", 600, 400), caption: "Bindaetteok Stall at Gwangjang Market - Seoul" },
      ],
    },

    {
      type: "p",
      text:
        "Throughout the broader journey, nature consistently revealed some of its most impressive forms. From countless viewpoints overlooking mountains, coastlines, forests, and cities, each landscape offered a new perspective on scale and beauty. I also explored several vast and complex cave systems, some so large that entire rivers flowed through them, creating underground worlds that felt almost surreal. Walking through these natural formations, surrounded by silence, water, and rock shaped over millions of years, became some of the most memorable and humbling moments of the entire trip."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("viewpoint3_egcc4b", 900, 600), caption: "Ang Thong Marine Park Viewpoint - Thailand" },
        { url: ph("viewpoint1_vkreyv", 600, 400), caption: "Flag on a Royal Enfield - Vang Vieng, Laos" },
        { url: ph("viewpoint4_irorbb", 1200, 600), caption: "Sunset View Over Seoul - South Korea" },
        { url: ph("cave1_si0cmk", 600, 400), caption: "Exploring a Limestone Cave - Laos" },
        { url: ph("cave2_p5jt6l", 600, 400), caption: "Inside Phong Nha Cave - Vietnam" },
      ],
    },

    {
      type: "p",
      text:
        "Throughout Southeast Asia, much of the journey unfolded on two wheels, riding motorbikes through a wide variety of landscapes that constantly shifted between chaos and calm. From well-worn coastal roads to remote island tracks in Thailand and endless paths cutting through rice fields in Vietnam and Indonesia, every ride offered a sense of freedom and direct connection to the environment. I also visited several isolated islands where life moved at an entirely different pace, with almost no cars, untouched beaches, and quiet villages that felt deeply authentic and far removed from modern noise. Along the way, I travelled through winding rivers by boat, including the traditional Vietnamese basket boats, which added a unique cultural layer to the experience. These moments were complemented by hands-on workshops in local crafts and professions, where I was able to engage directly with communities and learn from traditional ways of life."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("basketBoats_fz3d1m", 900, 600), caption: "Basket Boats Among Nipa Palms - Hoi An, Vietnam" },
        { url: ph("remoteIsland_ni2fmi", 600, 400), caption: "Palm-Lined Beach - remote island in Southeast Asia" },
        { url: ph("riverRide_dmwym2", 600, 400), caption: "Trang An Boat Dock - Ninh Binh, Vietnam" },
        { url: ph("motobike_ebuz1h", 1200, 600), caption: "Scooter Selfie - Southeast Asia" },
        { url: ph("workshop_j5wc9b", 600, 400), caption: "Traditional Mat Weaving Workshop - Vietnam" },
      ],
    },

    {
      type: "p",
      text:
        "The wildlife encounters alone could fill an entire article, as they became one of the most surprising and fulfilling parts of the journey. Across Southeast Asia and beyond, I experienced a wide variety of animals in both wild and semi-wild environments. I saw different species of monkeys in jungles and temples, elephants moving through natural landscapes, and turtles and rays in clear coastal waters. In China, I visited panda reserves, and in Japan I spent time around wild deer that would bow their heads when being fed as a simple gesture of acknowledgment. On remote islands, stray dogs and cats were part of everyday life, moving freely between villages and beaches, blending naturally into their surroundings. One of the more unexpected moments came in Vietnam, where I ended up becoming the ‘leader’ of a group of ducks, casually following them as they moved together through paths and open spaces. These experiences, from larger wildlife sightings to small everyday interactions, offered a quiet reminder of how varied and interconnected life can be when you slow down enough to observe it."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("deers_hk4qgf", 1200, 600), caption: "Feeding the Deer of Nara - Japan" },
        { url: ph("monkey_jurh2q", 900, 600), caption: "Monkey in the Jungle - Southeast Asia" },
        { url: ph("panda_zyjbok", 600, 400), caption: "Giant Panda - China" },
        { url: ph("elephant_my2sce", 600, 400), caption: "Elephant by the River - Thailand" },
        { url: ph("duckLeader_jmzloj", 600, 400), caption: "Feeding as Duck Leader - Vietnam" },
      ],
    },

    {
      type: "p",
      text:
        "Looking back, what made these experiences so meaningful was not only their beauty, but the contrast and variety that defined the entire journey. From calm, reflective moments in nature to more intense and adventurous experiences, each place offered something different, shaped by its landscapes, wildlife, and rhythm of life. I witnessed how nature changes dramatically from country to country, from dense jungles and volcanic landscapes to quiet islands, rivers, and open coastlines, each with its own ecosystems and animals living in balance with their environment. Beyond nature, I learned a great deal from the people I met along the way — through local traditions, cultural performances, religious practices, and hands-on workshops that offered a deeper understanding of daily life in each place. These experiences often revealed a simpler, more grounded way of living, shaped by history, community, and respect for tradition. Together, they created a journey that moved between stillness and intensity, observation and participation, leaving me with a broader perspective on both the world and the way people choose to live within it."
    },

    { type: "h2", text: "Different views on life" },

    {
      type: "p",
      text:
        "What fascinated me most, however, were the differences that are not immediately visible. The way people think about work, family, friendship, success, and happiness often felt very different from what I was used to. In many places, I met people who owned very little by Western standards yet seemed genuinely fulfilled. Having enough food to eat, somewhere safe to sleep, and people they loved around them was often considered enough."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("cambojaVillage_atlp7s",   600, 400),  caption: "Camboja Village" },
        { url: ph("laosHouse_bqc25s",  900, 600),  caption: "Laos House" },
        { url: ph("cambojaKids_iglm6s",  600, 400),  caption: "Camboja School" },
      ],
    },

    {
      type: "p",
      text:
        "It made me question the mindset many of us grow up with — the constant pressure to achieve more, earn more, own more, and always look towards the next milestone. For the first time, I started to consider that sometimes what we already have may be enough. What struck me most was that many of the people I met had significantly less than what most of us in the West take for granted, yet often seemed happier and more content with their lives. It made me reflect on how easily we fall into the habit of comparing ourselves to those who have more, focusing on what we lack rather than appreciating what we already have. In many ways, we have more opportunities, comfort, and security than ever before, yet we often feel dissatisfied because our definition of “enough” keeps moving further away."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("workingLady_bbwl8y",   600, 400),  caption: "Village Road - Laos" },
        { url: ph("thailandWeaver_pq3vgs",  900, 600),  caption: "Traditional Backstrap Weaving - Northern Thailand" },
        { url: ph("vietnameKids_mnpsf9",  600, 400),  caption: "Hmong Girls with Flower Baskets - Northern Vietnam" },
        { url: ph("vietnameWorkerd_fy5moc",  600, 400),  caption: "Street Vendor in Hanoi's Old Quarter" },
      ],
    },
    
    {
      type: "p",
      text:
        "I also met people with dreams they knew they might never be able to achieve because of financial limitations or restrictions imposed by the governments of their countries. Many of them worked incredibly hard, often spending twelve hours a day working simply to earn enough to support themselves and their families. Despite this, they remained optimistic, grateful, and hopeful. I spoke to people whose dream was simply to travel, to see Europe, or to experience places they had only ever seen online, knowing that such opportunities might realistically remain out of reach. Their resilience, humility, and ability to find joy despite circumstances that many of us would consider difficult left a lasting impression on me and made me appreciate just how fortunate I am."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("mama_m5djhb",   600, 400),  caption: "Local Vietnamese Grandmother" },
        { url: ph("cambojaLady_sgakm4",  900, 600),  caption: "Boat Rider - Cambodia" },
        { url: ph("thailandMan_csadsp",  600, 400),  caption: "Floating Market Vendor - Thailand" },
      ],
    },

    { type: "h2", text: "Faith, spirituality, and meaning" },

    {
      type: "p",
      text:
        "Another aspect that deeply influenced me was religion and spirituality. Growing up in Europe, I was familiar with a particular way of understanding faith. Throughout Asia, I encountered beliefs and philosophies that often focused more on mindfulness, kindness, inner peace, family, and the positive impact individuals can have on the world around them."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("monksCamboja_x0criz",   900, 600),  caption: "Monks on the Royal Palace - Cambodia" },
        { url: ph("templeDourado_blxxei",  600, 400),  caption: "Wat Pho Temple Complex - Thailand" },
        { url: ph("camboja_pdufsr",  600, 400),  caption: "Ta Prohm Temple - Angkor, Cambodia" },
        { url: ph("templeThailand_ld9tae",  600, 400),  caption: "Wat Chiang Man - Thailand)" },
        { url: ph("buda_wutjnz",  600, 400),  caption: "Golden Buddha Shrine - China" },
      ],
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

    {
      type: "gallery",
      photos: [
        { url: ph("monks_fm5skz",   900, 600),  caption: "Monks in Prayer - Laos" },
        { url: ph("japanPray_tbsskz",  600, 400),  caption: "Jizo Statues Shrine - Japan" },
        { url: ph("chinaPray_k2tqif",  600, 400),  caption: " Incense Offering at a Buddhist Temple - China" },
      ],
    },

    { type: "h2", text: "Beauty through a different lens" },

    {
      type: "p",
      text:
        "Even beauty standards challenged many assumptions I had unconsciously accepted. In countries such as China, South Korea and Japan, ideals often centred around fair skin, youthful features, and a delicate appearance. Avoiding sun exposure was taken seriously, with umbrellas, masks, and long-sleeved clothing being common even on extremely hot days."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("mask_l21vs5",    900, 600),  caption: "Chinese woman shielding her face from the sun" },
      ],
    },

    {
      type: "p",
      text:
        "Makeup was often used very differently from what I was accustomed to seeing in the West. Rather than dramatically changing someone's appearance, it was frequently applied to subtly enhance features such as bright skin, larger-looking eyes, soft blush tones, and an overall youthful look. It was a reminder that beauty standards are deeply cultural and far less universal than we often assume."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("makeup_xx9hze",    900, 600),  caption: "Chinese makeup application" },
        { url: ph("chineseGirls_oust6a",    900, 600),  caption: "Chinese girls wearing traditional clothing" },
      ],
    },

    { type: "h2", text: "Returning home" },

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
      type: "p",
      text:
        "Beyond that, the sheer scale of nature, the diversity of religions and traditions, the variety of animals, and the richness of local cuisines completely reshaped my perspective. These experiences offered a kind of richness that cannot be measured in money, as they changed the way I see the world and what I value in life. What I gained was a deeper sense of perspective, connection, and appreciation for the incredible complexity of life across different places and cultures."
    },

    {
      type: "quote",
      text:
        "The greatest thing travel gave me was not memories, but perspective."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("backpacking_j1brib",    900, 600),  caption: "Returning home" },
      ],
    },
  ]
  },
  {
  id: 3,
  slug: "returning-to-fct-nova-as-a-speaker",
  title: "Returning to FCT NOVA as a Speaker",
  subtitle: "From student to software engineer — and the responsibility of giving back",
  date: "2025-03-12",
  category: "events",
  tags: ["Career", "Speaker","Software Engineering", "Opensoft", "FCT NOVA", "Growth"],
  coverImage: ph("opensoftTalk_b6cmka", 1280, 720),
  excerpt:
    "Returning to my former university as a speaker at JORTEC 2025 was a deeply meaningful moment — sharing my journey, reflecting on my growth, and hopefully helping students who are now where I once was.",
  readTime: "7 min",
  body: [
    {
      type: "p",
      text:
        "I had the pleasure — and honestly, the honour — of returning to my former university, NOVA School of Science and Technology (FCT NOVA), this time not as a student, but as a speaker representing Opensoft at JORTEC 2025."
    },
    {
      type: "p",
      text:
        "JORTEC is a dynamic 3-day event organized by the university, where students get the opportunity to connect with companies, explore different career paths, and experience the tech industry from a more practical perspective."
    },

    { type: "h2", text: "A deeply personal full-circle moment" },

    {
      type: "p",
      text:
        "Being back on that campus brought back a flood of memories. It honestly felt surreal to stand there, not as someone attending the talks, but as someone sharing their own journey. Just a short time ago, I was in their exact position — sitting in those same rooms, listening, taking notes, and trying to understand what my future in tech could look like."
    },
    {
      type: "p",
      text:
        "Sharing my path — from student to intern, and now full-time Software Engineer — made me reflect on how much can change in such a short period of time. It reminded me that progress often feels invisible while you’re in it, but becomes clear when you look back."
    },

    { type: "h2", text: "Giving back what I once needed" },

    {
      type: "p",
      text:
        "One of the most meaningful parts of this experience was the opportunity to speak directly with students who are now going through the same uncertainty I once had. I remember clearly how many questions I had at that stage — about internships, first jobs, how to prepare, what really matters, and what doesn’t."
    },
    {
      type: "p",
      text:
        "Being able to answer those same questions from a different perspective felt incredibly rewarding. In a way, it felt like I was closing a loop — offering clarity, reassurance, and honesty to people who are just starting their journey."
    },
    {
      type: "p",
      text:
        "I truly hope I was able to help at least a few students feel a bit more confident about their next steps, or simply less alone in their doubts. Sometimes, just hearing that someone else went through the same uncertainty can make a real difference."
    },

    { type: "h2", text: "Gratitude and responsibility" },

    {
      type: "p",
      text:
        "I felt genuinely honoured to have been invited back in this role. Opportunities like this carry a certain weight — not just to represent a company, but to represent a path that others are still trying to figure out."
    },
    {
      type: "p",
      text:
        "I’m very grateful to FCT NOVA and the organizers of JORTEC for the invitation, and to Opensoft for trusting me to represent them in such a meaningful context."
    },

    {
      type: "p",
      text:
        "More than anything, this experience reinforced something I’ve been feeling for a while: that sharing your journey is not just about storytelling — it’s about connection. And if even one student left feeling more certain, more inspired, or more reassured, then it was already worth it."
    }
  ]
},
{
  id: 4,
  slug: "48-hours-building-connections",
  title: "48 Hours Building Connections",
  subtitle: "What a hackathon taught me about innovation, teamwork, and solving real human problems",
  date: "2024-05-13",
  category: "events",
  tags: ["Hackathon", "Mobile Development", "AI", "Teamwork", "Innovation"],
  coverImage: ph("hackathon_lmryi9", 1280, 720),
  excerpt:
    "A 48-hour hackathon challenged us to transform an idea into a working product. What started as a competition became a lesson in teamwork, creativity, and building technology that brings people together.",
  readTime: "9 min",
  body: [
    {
      type: "p",
      text:
        "Recently, I had the opportunity to participate in the Spring Hackathon hosted by NINF at NOVA School of Science and Technology, with the support of Deloitte, Sky, and Crossjoin. For 48 intense hours, my team and I immersed ourselves in one of the most challenging and rewarding experiences of our academic journey."
    },

    {
      type: "p",
      text:
        "Hackathons are often described as coding competitions, but this experience felt like much more than that. It was a unique opportunity to transform an idea into a tangible product under extreme time constraints, while collaborating closely with talented people who shared the same passion for technology and innovation."
    },

    { type: "h2", text: "Finding a Real Problem Worth Solving" },

    {
      type: "p",
      text:
        "Rather than building something purely technical, we wanted to tackle a problem that many of us had personally experienced. Despite living in a world that is more connected than ever, meeting new people and building meaningful friendships can be surprisingly difficult, especially in adulthood or when moving to a new city."
    },

    {
      type: "p",
      text:
        "Large cities are full of opportunities, events, and communities, yet discovering them often feels fragmented. Information is scattered across countless websites, social media platforms, and local groups. Even when interesting events exist, finding the right ones and connecting with people who share similar interests can be challenging."
    },

    {
      type: "p",
      text:
        "As university students ourselves, we had experienced this problem firsthand. We often felt that amazing events, communities, and opportunities existed around us, but finding them required significant effort. At the same time, meeting new people outside our existing circles became increasingly difficult as we grew older. We believed technology could help bridge that gap."
    },

    { type: "h2", text: "The Idea: A Social Network Built Around Experiences" },

    {
      type: "p",
      text:
        "Together with two teammates, we developed a mobile application designed to help people and companies connect through events and shared interests."
    },

    {
      type: "p",
      text:
        "We often described it as 'Tinder for friendships and experiences rather than dating'. Instead of matching people based on romantic compatibility, our platform focused on bringing together individuals through activities, hobbies, networking opportunities, and events."
    },

    {
      type: "p",
      text:
        "Users could create or join events, whether they were organized by individuals, communities, or companies. Before deciding to participate, they could see which friends had already attended previous editions or were planning to attend upcoming events, creating a stronger sense of trust and community."
    },

    {
      type: "p",
      text:
        "To make discovery more personalized, we incorporated an AI-powered recommendation system. By analyzing profile attributes, interests, previous event participation, and engagement patterns, the platform could suggest events that were likely to be genuinely relevant to each user."
    },

    {
      type: "p",
      text:
        "We also introduced reviews, ratings, comments, and photo galleries from past events. This allowed users to make more informed decisions while helping organizers build credibility and showcase the quality of their experiences."
    },

    {
      type: "p",
      text:
        "Our goal was not simply to help people find events, but to help them find connections. We wanted to create a platform where someone moving to a new city, starting university, or simply looking to meet people with similar interests could discover experiences that felt relevant and welcoming."
    },

    { type: "h2", text: "48 Hours of Learning" },

    {
      type: "p",
      text:
        "Building an application from scratch in just two days required much more than technical skills. Every decision had to be deliberate. We constantly balanced ambition with feasibility, deciding which features would create the most value while remaining achievable within the limited timeframe."
    },

    {
      type: "p",
      text:
        "There were moments of excitement when features finally worked, moments of frustration when unexpected problems appeared, and moments where creativity became just as important as programming. More than anything, the experience taught me how quickly a motivated team can move when everyone is aligned around a shared goal."
    },

    {
      type: "p",
      text:
        "One aspect of this experience that I am particularly proud of is that we did not stop at the idea itself. Beyond identifying the problem, validating the concept, and defining how the platform would work, we also managed to implement most of the mobile application's frontend within the 48-hour timeframe."
    },

    {
      type: "p",
      text:
        "At the time, AI coding assistants were not yet available to accelerate development, which meant that every screen, interaction, user flow, and design decision was created entirely by us. Looking back, it is easy to underestimate how much work that required. We were simultaneously acting as product managers, designers, developers, and presenters, all while racing against the clock."
    },

    {
      type: "p",
      text:
        "Having a functional and visually engaging prototype made our final demonstration significantly more dynamic. Rather than asking the judges to imagine how the platform would work, we could actually show them. Seeing an idea evolve from sketches and discussions into a real product in such a short amount of time remains one of the accomplishments I am most proud of from my university years."
    },

    { type: "h2", text: "The Final Pitch" },

    {
      type: "p",
      text:
        "After 48 hours of development, brainstorming, testing, and refining, we had the opportunity to present our project to a panel of judges from Deloitte, Sky, and Crossjoin."
    },

    {
      type: "p",
      text:
        "Standing in front of industry professionals and explaining not only what we built, but why we built it, was one of the most rewarding parts of the experience. We weren't simply presenting features or technical decisions; we were presenting a solution to a problem we genuinely believed existed."
    },

    {
      type: "p",
      text:
        "The experience also strengthened my confidence as both an engineer and a communicator. Developing a product under pressure is one challenge; presenting it clearly, defending design decisions, and conveying the vision behind it is another entirely."
    },

    { type: "h2", text: "What I Took Away" },

    {
      type: "p",
      text:
        "Looking back, what I value most is not the application itself, but everything that happened along the way. The experience strengthened my ability to work under pressure, communicate ideas clearly, collaborate effectively, and transform abstract concepts into tangible solutions."
    },

    {
      type: "p",
      text:
        "It also reminded me why I enjoy building software in the first place. Technology is at its best when it helps people. Whether through improving public services, enabling new opportunities, or simply helping someone find a community where they belong, the most meaningful products often solve deeply human problems."
    },

    {
      type: "p",
      text:
        "Most importantly, the hackathon taught me that innovation is not only about technology. It is about understanding people, identifying real frustrations, and having the determination to build something that can make a difference. Those 48 hours were exhausting, intense, and occasionally chaotic — but they were also some of the most exciting and fulfilling hours of my academic journey."
    },

    {
      type: "quote",
      text:
        "The greatest achievement of those 48 hours wasn't building an app. It was proving that with the right team, a meaningful idea can become reality far faster than you think."
    }
  ]
},
{
  id: 5,
  slug: "building-the-app-behind-innovation-week",
  title: "Building the App Behind Innovation Week",
  subtitle: "What it feels like to build software for a community you are part of",
  date: "2024-03-20",
  category: "events",
  tags: ["React", "Mobile Development", "Innovation Week", "Frontend", "Teamwork"],
  coverImage: ph("innovationWeek_g7tqjk", 1280, 720),
  excerpt:
    "Contributing to the mobile application behind Innovation Week 2024 was more than a development project. It was the experience of building something real for a community I was part of and seeing it used by hundreds of students throughout the event.",
  readTime: "8 min",
  body: [
    {
      type: "p",
      text:
        "One of the most rewarding projects I had the opportunity to work on during university was the mobile application developed for Innovation Week 2024, organized by In-Nova. As a member of the IT team, I had the privilege of contributing to the frontend development of the application and helping bring an important part of the event experience to life."
    },

    {
      type: "p",
      text:
        "Innovation Week is one of the largest innovation and networking events at NOVA School of Science and Technology, bringing together students, companies, entrepreneurs, and industry professionals for several days of talks, workshops, competitions, networking opportunities, and discussions about technology and innovation."
    },

    { type: "h2", text: "Building a Product for a Real Event" },

    {
      type: "p",
      text:
        "Unlike many university projects that remain inside a classroom, this application had a real audience and a real purpose. Students, speakers, organizers, and company representatives would rely on it throughout the event, making every design and development decision feel significantly more meaningful."
    },

    {
      type: "p",
      text:
        "Using React, I contributed to the development of the application's frontend, helping create an intuitive and engaging experience for participants. The goal was to centralize all event information in a single platform and make navigating the event as seamless as possible."
    },

    {
      type: "p",
      text:
        "Through the application, participants could explore the complete event schedule, view upcoming talks, workshops, and activities, learn more about the companies attending the event, and discover information about the speakers and organizers involved in each session."
    },

    {
      type: "p",
      text:
        "One of the features I found particularly interesting was the check-in system. Participants could check into workshops, talks, and activities directly through the application. Beyond helping organizers monitor participation, these check-ins contributed to a gamified experience where attendees could earn rewards and prizes based on their engagement throughout the event."
    },

    { type: "h2", text: "More Than Just Code" },

    {
      type: "p",
      text:
        "What made this project special was that it wasn't simply about writing code. It was about creating a tool that would improve the experience of hundreds of people attending the event. Every screen, component, and interaction we built would eventually be used by real users navigating a real event."
    },

    {
      type: "p",
      text:
        "As developers, we often spend hours building features without immediately seeing their impact. This project was different. We knew exactly who our users were, what problems they faced, and how the application could help solve them."
    },

    { type: "h2", text: "Seeing It Come to Life" },

    {
      type: "p",
      text:
        "The most memorable part of the experience came during Innovation Week itself. After weeks of development, testing, and preparation, I finally had the opportunity to see people actively using something we had built."
    },

    {
      type: "p",
      text:
        "Walking around the event and seeing fellow students checking schedules, exploring company profiles, registering for activities, and using the features we had developed was incredibly satisfying. What had started as lines of code on a screen had become a product that was genuinely helping people navigate the event."
    },

    {
      type: "p",
      text:
        "There is a unique feeling that comes from seeing your work move beyond development and into the hands of real users. It transforms software from a technical exercise into something tangible. Every successful check-in, every student finding the right room for a talk, and every interaction with the application became a reminder that the effort invested behind the scenes had a real impact."
    },

    { type: "h2", text: "A Proud Moment" },

    {
      type: "p",
      text:
        "Looking back, I feel incredibly proud not only of the final product but also of the collaboration that made it possible. Working alongside the talented team at In-Nova taught me valuable lessons about teamwork, communication, and developing software for real-world users and constraints."
    },

    {
      type: "p",
      text:
        "The success of the application showed me something important: software becomes most meaningful when it solves problems for a community you genuinely care about. As both a developer and a participant in the university ecosystem, being able to contribute to an event that helps students connect with opportunities made the experience even more rewarding."
    },

    {
      type: "p",
      text:
        "Most importantly, this project gave me one of my first opportunities to experience the full lifecycle of a product: from development and testing to deployment and real-world adoption. Seeing hundreds of students use the application during the event reinforced my passion for creating digital products and reminded me why I chose software engineering in the first place."
    },

    {
      type: "quote",
      text:
        "Few moments are more rewarding than seeing something you built become part of other people's experience."
    }
  ]
},
{
  id: 6,
  slug: "supporting-portugals-first-digital-election",
  title: "Supporting Portugal's First Digital Election",
  subtitle: "A reminder that technology can strengthen democracy when people trust it",
  date: "2024-06-10",
  category: "work",
  tags: ["IT Support", "European Parliament", "Elections", "Public Service", "Technology"],
  coverImage: ph("eleicoes_europeias_dbxvjl", 1280, 720),
  excerpt:
    "Participating in the first deployment of digital electoral registers in Portugal during the European Parliament Elections was one of the most meaningful experiences of my career, combining technology, public service, and civic responsibility.",
  readTime: "7 min",
  body: [
    {
      type: "p",
      text:
        "Throughout my academic and professional journey, I have worked on many projects that challenged me technically. However, few experiences felt as meaningful as participating in the European Parliament Elections of 2024 as an IT Support Technician during the first deployment of digital electoral registers in Portugal."
    },

    {
      type: "p",
      text:
        "Unlike many technology projects where the impact can feel distant or abstract, this was an opportunity to contribute directly to an event that affects millions of citizens and plays a fundamental role in democracy itself."
    },

    { type: "h2", text: "Being Part of a Historic Moment" },

    {
      type: "p",
      text:
        "When I first learned that I would be participating in the deployment of Portugal's new digital electoral registration system, I immediately understood the significance of the responsibility. This was not simply another software platform or another IT project. It was part of a historic modernization effort that would influence how citizens interacted with the electoral process."
    },

    {
      type: "p",
      text:
        "I felt genuinely honoured to contribute, even in a small way, to such an important milestone. Being involved in the country's first digital election infrastructure deployment gave me the feeling of witnessing a moment of transformation, where technology was being used to improve accessibility, efficiency, and reliability in a process that is central to democratic participation."
    },

    { type: "h2", text: "Preparing for the Responsibility" },

    {
      type: "p",
      text:
        "One aspect that made the experience even more meaningful was the preparation that preceded it. Before election day, I received extensive training provided through the European Union's electoral support framework, covering not only the technical aspects of the systems but also the procedures, protocols, and responsibilities involved."
    },

    {
      type: "p",
      text:
        "The training reinforced something that became increasingly clear throughout the experience: technology alone is never enough. For critical systems to work successfully, people need to understand them, trust them, and know how to use them effectively."
    },

    {
      type: "p",
      text:
        "That understanding shaped much of my role. Beyond validating systems and ensuring everything functioned correctly, a significant part of my work involved supporting and training election staff, helping them feel confident using the new tools and addressing any questions or concerns they might have."
    },

    { type: "h2", text: "Helping People Through Technology" },

    {
      type: "p",
      text:
        "What I remember most vividly is not the technology itself, but the people. Throughout the process, I had the opportunity to assist election workers, answer questions, solve technical issues, and provide reassurance whenever uncertainties arose."
    },

    {
      type: "p",
      text:
        "There is something uniquely rewarding about using technical knowledge to help others accomplish something important. In many engineering roles, the end users remain invisible. Here, I could see firsthand the people benefiting from the support being provided."
    },

    {
      type: "p",
      text:
        "Every issue resolved, every question answered, and every successful validation contributed to a much larger objective: ensuring that citizens could exercise one of their most fundamental democratic rights smoothly and confidently."
    },

    { type: "h2", text: "Technology in Service of Society" },

    {
      type: "p",
      text:
        "The experience also changed the way I think about the role of technology in society. As software engineers and IT professionals, we often focus on innovation, efficiency, and technical complexity. Yet some of the most impactful systems are not necessarily the most sophisticated ones. They are the ones that support essential public services and improve people's lives in meaningful ways."
    },

    {
      type: "p",
      text:
        "For the first time, I felt that my technical skills were contributing directly to something larger than a product, a company, or a project. They were contributing to a process that helps uphold democratic participation and civic engagement."
    },

    { type: "h2", text: "A Lasting Memory" },

    {
      type: "p",
      text:
        "Looking back, what stays with me most is a sense of gratitude. Gratitude for the trust placed in me, for the training I received, and for the opportunity to contribute to such an important initiative at a relatively early stage of my career."
    },

    {
      type: "p",
      text:
        "It reminded me that technology can be much more than a profession. At its best, it becomes a tool for enabling opportunities, supporting communities, and strengthening the systems that society relies upon every day."
    },

    {
      type: "p",
      text:
        "Being part of Portugal's first deployment of digital electoral registers was not only a valuable professional experience. It was a powerful reminder that even small individual contributions can play a role in something much bigger than ourselves."
    },

    {
      type: "quote",
      text:
        "Some projects teach you technical skills. Others remind you why those skills matter in the first place."
    }
  ]
},
{
  id: 7,
  slug: "why-gender-balance-in-tech-matters",
  title: "Why Gender Balance in Tech Matters",
  subtitle: "Reflections from volunteering at the EUGAIN Final Conference",
  date: "2024-04-15",
  category: "events",
  tags: ["Women in Tech", "Diversity", "EUGAIN", "Informatics", "Personal Growth"],
  coverImage: ph("EUGAIN_hvefbx", 1280, 720),
  excerpt:
    "Volunteering at the EUGAIN Final Conference gave me the opportunity to engage with researchers, policymakers, and industry leaders working to improve gender balance in informatics. As a woman in software engineering, it was an experience that felt both personal and inspiring.",
  readTime: "10 min",
  body: [
    {
      type: "p",
      text:
        "In April 2024, I had the opportunity to volunteer at the EUGAIN Final Conference, organized by EUGAIN and the Order of the Engineers of Portugal. The conference brought together researchers, policymakers, educators, and industry representatives from across Europe with a shared objective: understanding and addressing the gender imbalance that continues to exist in informatics and engineering."
    },

    {
      type: "p",
      text:
        "While I initially joined as a volunteer, I quickly realized that the experience would leave a much deeper impact on me than I had anticipated. As a woman pursuing a career in software engineering, the themes discussed throughout the conference were not abstract concepts or statistics. They were realities that I had personally experienced."
    },

    { type: "h2", text: "A Topic That Feels Personal" },

    {
      type: "p",
      text:
        "Throughout my academic journey and early professional experiences, there have been moments where I felt that being a woman influenced how others perceived my technical abilities. Sometimes it was subtle. Sometimes it was more direct."
    },

    {
      type: "p",
      text:
        "There were occasions when I felt people assumed I would not be as technically capable as my male colleagues before they had even seen my work. There were comments from people who seemed genuinely surprised that I enjoyed programming, engineering, or technology. Others questioned whether I would be successful in such a technical field, as if it were somehow unexpected for a woman to pursue it."
    },

    {
      type: "p",
      text:
        "Even today, it is not unusual to find myself as the only woman in a meeting, technical event, or room full of engineers. While these situations rarely prevent women from succeeding, they can create a feeling of constantly having to prove that you belong. Fortunately, I have also met incredible mentors, colleagues, professors, and friends who judged me solely on my abilities and supported me throughout my journey. However, the fact that these experiences still happen demonstrates that there is work left to do."
    },

    { type: "h2", text: "Looking Beyond the Symptoms" },

    {
      type: "p",
      text:
        "What impressed me most about the conference was that the discussions did not focus only on the visible outcomes of the problem, such as representation numbers or salary differences. Instead, many participants were focused on understanding the root causes behind these disparities."
    },

    {
      type: "p",
      text:
        "The more I listened, the more I realized how early many of these influences begin. From childhood, boys and girls are often encouraged in different directions. Boys are more frequently given toys that promote construction, experimentation, problem-solving, and engineering-oriented thinking, such as building blocks, science kits, and technical games."
    },

    {
      type: "p",
      text:
        "Girls, on the other hand, are often encouraged towards activities that emphasize appearance, caregiving, or social roles. Even the compliments children receive can differ. Girls are frequently told they are beautiful, elegant, or delicate. Boys are often praised for being strong, clever, adventurous, or intelligent."
    },

    {
      type: "p",
      text:
        "None of these individual interactions seem significant on their own. However, when repeated thousands of times throughout childhood, they can quietly influence how young people see themselves, what they believe they are capable of achieving, and which careers they consider to be 'for people like them'."
    },

    {
      type: "p",
      text:
        "Another factor that resonated strongly with me was the discussion around role models. When young girls grow up, they rarely see women represented as software engineers, computer scientists, startup founders, or technology leaders to the same extent that they see men. It is difficult to imagine yourself in a role when you rarely see people who look like you occupying it."
    },

    {
      type: "p",
      text:
        "Representation alone does not solve the problem, but it plays a powerful role in shaping aspirations. Seeing women succeed in technology sends an important message: you belong here too. It challenges the idea that engineering is somehow a 'male profession' and helps normalize the presence of women in technical leadership and innovation."
    },

    {
      type: "p",
      text:
        "Looking back, I realize how valuable it would have been to see more female engineers while I was growing up. Not because I lacked interest in technology, but because role models help transform possibility into reality. They provide evidence that a path exists and that success is achievable. For many young girls, seeing women building software, leading engineering teams, conducting research, or creating innovative companies can be the difference between considering a career in technology and never exploring it at all."
    },

    {
      type: "p",
      text:
        "This is why visibility matters. Every woman who enters the field, speaks at a conference, mentors students, teaches, or simply shares her experience contributes to breaking the perception that engineering is a space primarily reserved for men. The more diverse the people we see succeeding, the easier it becomes for future generations to believe that they can succeed too."
    },

    { type: "h2", text: "Real Change Requires Understanding" },

    {
      type: "p",
      text:
        "One of the most fascinating aspects of the conference was seeing the amount of research and analysis being conducted to understand these challenges. The people involved were not looking for simplistic solutions. They were studying educational systems, cultural norms, economic conditions, workplace structures, and social expectations across different countries."
    },

    {
      type: "p",
      text:
        "Through workshops and collaborative sessions, participants worked on country-specific action plans designed to address the unique factors contributing to gender imbalance in each region. It was inspiring to see how much effort was being invested in understanding the complexity of the problem before proposing solutions."
    },

    {
      type: "p",
      text:
        "The discussions also highlighted challenges that extend beyond education. For example, many countries continue to face significant gender pay gaps, often influenced by societal expectations around caregiving and family responsibilities. Women are still more likely to interrupt their careers, reduce working hours, or be perceived as less career-focused because of expectations surrounding parenthood and childcare."
    },

    {
      type: "p",
      text:
        "What impressed me was that the people leading these initiatives were not simply trying to increase participation numbers. They were examining how culture, education, economics, workplace policies, and social expectations interact to create these outcomes. Meaningful change requires understanding the entire system, not just treating its symptoms."
    },

    {
      type: "p",
      text:
        "Seeing experts, researchers, educators, and policymakers actively working to challenge these assumptions and design better systems gave me hope that meaningful progress is possible."
    },

    { type: "h2", text: "Why It Matters" },

    {
      type: "p",
      text:
        "For me, this conference was about much more than gender statistics in engineering. It was about fairness, opportunity, and ensuring that talent is not lost because of assumptions made long before someone enters a classroom or applies for a job."
    },

    {
      type: "p",
      text:
        "I firmly believe that technology benefits from diverse perspectives. Different experiences lead to different ideas, different ways of solving problems, and ultimately better products for everyone. When talented people feel excluded from a field because they do not fit traditional expectations, everyone loses."
    },

    {
      type: "p",
      text:
        "Volunteering at EUGAIN reminded me that progress does not happen by accident. It happens because people dedicate years of research, advocacy, education, and policy work to creating a more inclusive future."
    },

    { type: "h2", text: "Looking Forward" },

    {
      type: "p",
      text:
        "I left the conference feeling inspired, but also motivated. Inspired by the incredible people dedicating their careers to addressing these challenges, and motivated to contribute in my own way throughout my career."
    },

    {
      type: "p",
      text:
        "I do not want future generations of girls to question whether they belong in engineering, computer science, or technology. I want them to see these paths as naturally available to them as any other. I want them to grow up seeing women building products, leading companies, conducting research, and shaping the future of technology."
    },

    {
      type: "p",
      text:
        "If my career can contribute, even in a small way, to making that future a reality—whether through mentoring, speaking, building visible projects, or simply being another example that women belong in this field—then I will consider it one of my most meaningful achievements."
    },

    {
      type: "quote",
      text:
        "The goal is not to encourage more women into technology because they are women. The goal is to ensure that talent, curiosity, and ambition are never limited by expectations."
    }
  ]
},
{
  id: 8,
  slug: "building-a-digital-government-platform",
  title: "Building a Digital Government Platform",
  subtitle: "My Master's Thesis on bringing public services into the digital age",
  date: "2025-09-20",
  category: "tech",
  tags: [
    "Flutter",
    "Master Thesis",
    "Mobile Development",
    "Public Services",
    "Authentication",
    "WebRTC",
    "Software Engineering"
  ],
  coverImage: ph("tese_h3n76z", 1280, 720),
  excerpt:
    "As part of my Master's Thesis and internship at Opensoft, I independently designed and developed a cross-platform mobile platform that aimed to bring secure government identification services into the digital world.",
  readTime: "15 min",
  body: [
    {
      type: "p",
      text:
        "Some software projects teach you new technologies. Others challenge your problem-solving abilities. A few rare projects do both while also giving you the feeling that what you are building could genuinely improve people's lives."
    },

    {
      type: "p",
      text:
        "My Master's Thesis was one of those projects."
    },

    {
      type: "p",
      text:
        "Developed during my internship at Opensoft, the project focused on a question that many of us have asked ourselves at some point: why do so many public services still require citizens to travel long distances, wait in queues, work around limited opening hours, and physically appear at government offices for procedures that could potentially be handled digitally?"
    },

    { type: "h2", text: "A Problem Worth Solving" },

    {
    type: "p",
    text:
      "Many important life events still require citizens to physically visit government offices. Applying for a passport or identification card, updating official records, signing legal documents, completing property transactions, or handling other administrative procedures often involve travelling to public institutions, working around limited opening hours, and spending long periods waiting in queues. While these requirements are largely driven by security and identity verification concerns, they can create significant barriers for citizens and reduce the accessibility of essential public services."
  },

    {
      type: "p",
      text:
        "For people living far from administrative centers, individuals with reduced mobility, citizens facing financial constraints, or simply people with demanding work schedules, these processes can become unnecessarily difficult and time-consuming."
    },

    {
      type: "p",
      text:
        "I have personally experienced the frustration of spending hours traveling, waiting in queues, and reorganizing my day around administrative appointments. The more I researched the problem, the more I realized that millions of people face the same challenges every year."
    },

    {
      type: "p",
      text:
        "The question became simple: could technology make these services more accessible while maintaining the same level of trust, security, and legal validity?"
    },

    { type: "h2", text: "Designing the Solution" },

    {
      type: "p",
      text:
        "The objective was ambitious: create a mobile platform that would allow citizens to complete highly sensitive government procedures remotely, directly from their smartphones, while preserving the security guarantees traditionally associated with physical appointments."
    },

    {
      type: "p",
      text:
        "Through the application, citizens could participate in secure video appointments with government officials, perform identity verification, submit biometric information, sign official documents, manage administrative processes, and access services that previously required physical presence."
    },

    {
      type: "p",
      text:
        "Unlike many academic projects that remain theoretical, this was designed as a real product for a real business need. From the beginning, I knew that every architectural decision would have consequences for usability, security, scalability, and maintainability."
    },

    { type: "h2", text: "Choosing Flutter" },

    {
      type: "p",
      text:
        "One of the first challenges was selecting the technology stack. I conducted an extensive study of the available cross-platform frameworks, evaluating their performance, ecosystem maturity, maintainability, development speed, and long-term viability."
    },

    {
      type: "p",
      text:
        "After comparing several alternatives, I ultimately chose Flutter. It aligned with Opensoft's technical interests and experience, but more importantly, it offered excellent performance, a highly productive development experience, strong community support, and the flexibility required for a project of this complexity."
    },

    {
      type: "p",
      text:
        "Looking back, it was one of the best decisions of the project. Flutter allowed me to deliver a consistent experience across Android and iOS while maintaining a single codebase."
    },

    { type: "h2", text: "Designing for Everyone" },

    {
      type: "p",
      text:
        "One responsibility that I took particularly seriously was usability. This application was not intended for a specific demographic or technical audience. Its users could be young or elderly, highly technical or completely unfamiliar with digital systems."
    },

    {
      type: "p",
      text:
        "It also needed to feel natural on both Android and iOS despite the different design conventions of each platform. I designed the interface myself, constantly balancing familiarity, accessibility, simplicity, and consistency."
    },

    {
      type: "gallery",
      photos: [
        { url: ph("design_ensy42",   600, 400),  caption: "Application Design" },
      ],
    },
    
    {
      type: "p",
      text:
        "For perhaps the first time, I was not designing for developers or technology enthusiasts. I was designing for an entire country's population. That realization changed the way I approached every screen and interaction."
    },

    { type: "h2", text: "Building the Platform" },

    {
      type: "p",
      text:
        "The development phase was easily the most technically demanding part of the project. I independently implemented both the mobile frontend and the backend services responsible for business logic, authentication, data management, and communication with the database."
    },

    {
      type: "p",
      text:
        "One of the most challenging and rewarding features was the video conferencing system. Rather than relying on third-party video APIs, I built the solution myself using WebRTC and WebSockets."
    },

    {
      type: "p",
      text:
        "This involved managing real-time communication, appointment scheduling, call orchestration, participant management, signaling, and data exchange between citizens and government officials."
    },

    {
      type: "p",
      text:
        "However, the platform was far more than a video call application. The video sessions served as secure administrative appointments where officials could collect biometric information, verify identities, request additional information, validate documents, and guide citizens through official procedures."
    },

    {
      type: "p",
      text:
        "The system supported the collection of photographs, fingerprints, signatures, identity verification questionnaires, and other information required for official processes such as identification documents and passports."
    },

    { type: "h2", text: "Security Above Everything" },

    {
      type: "p",
      text:
        "Security became one of the central themes of the entire project. If citizens were expected to trust the platform with sensitive personal information, security could never be an afterthought."
    },

    {
      type: "p",
      text:
        "I integrated biometric authentication using native device capabilities, allowing users to authenticate using fingerprint recognition or facial recognition already configured on their smartphones."
    },

    {
      type: "p",
      text:
        "Document management introduced another interesting challenge. Users could review, sign, and manage official documents directly from the application. Signatures could be placed anywhere on the document through touch interaction, supporting multi-page documents and flexible placement."
    },

    {
      type: "p",
      text:
        "The signing workflow became particularly complex when multiple participants were involved. The platform had to coordinate the signing process between several individuals, ensuring that each participant signed in the correct order while government officials maintained oversight and approval capabilities throughout the process."
    },

    {
      type: "p",
      text:
        "Officials could validate signatures, reject invalid submissions, request new signatures when necessary, and control the progression of the signing workflow to guarantee procedural integrity."
    },

    { type: "h2", text: "Two Applications in One" },

    {
      type: "p",
      text:
        "Another architectural challenge involved supporting two fundamentally different user groups. Citizens and government officials interacted with the same platform but required very different permissions, workflows, and interfaces."
    },

    {
      type: "p",
      text:
        "This effectively meant designing and developing two applications within a single product: one focused on accessibility and simplicity for citizens, and another focused on administration, validation, and process management for officials."
    },

    { type: "h2", text: "Testing and Deployment" },

    {
      type: "p",
      text:
        "Before completion, the platform achieved approximately 80% automated test coverage, helping ensure reliability across critical workflows and reducing the risk of regressions."
    },

    {
      type: "p",
      text:
        "The project was ultimately deployed to both the Apple App Store and Google Play Store. Seeing an application that had started as research notes, sketches, and architectural diagrams become a fully deployed mobile product remains one of the proudest moments of my academic career."
    },

    { type: "h2", text: "More Than a Thesis" },

    {
      type: "p",
      text:
        "When people ask me what I gained from my Master's Thesis, I usually talk about Flutter, WebRTC, security, system architecture, backend development, testing, and deployment."
    },

    {
      type: "p",
      text:
        "But the truth is that the most valuable lesson was something else entirely."
    },

    {
      type: "p",
      text:
        "For the first time, I experienced what it feels like to build technology that could genuinely improve how citizens interact with public institutions. Technology is often associated with innovation, convenience, or business value. This project reminded me that it can also increase accessibility, reduce inequalities, and make essential services available to people who might otherwise struggle to access them."
    },

    {
      type: "p",
      text:
        "That realization gave every challenge, every bug, every late night, and every design decision a deeper sense of purpose."
    },

    {
      type: "quote",
      text:
        "The most meaningful software isn't always the most complex. Sometimes it's the software that removes a barrier between people and the services they depend on."
    }
  ]
},
{
  id: 9,
  slug: "five-years-at-nova-fct",
  title: "Five Years at NOVA FCT",
  subtitle: "Five years of growth, challenges, friendships, and discovering who I wanted to become",
  date: "2024-09-22",
  category: "life",
  tags: [
    "University",
    "Computer Science",
    "NOVA FCT",
    "Personal Growth",
    "Engineering",
    "Student Life"
  ],
  coverImage: ph("fct_mk0be6", 1280, 720),
  excerpt:
    "Five years, hundreds of exams, countless sleepless nights, lifelong friendships, and one global pandemic. Looking back on my time at NOVA FCT and the journey that shaped me both personally and professionally.",
  readTime: "14 min",
  body: [
    {
      type: "p",
      text:
        "Five years ago, I was just a girl from Faro with a suitcase, a high university entrance grade, and absolutely no certainty about what I wanted to do with the rest of my life."
    },

    {
      type: "p",
      text:
        "I knew I wanted to leave home and move to Lisbon. I knew I loved mathematics and physics. I knew I wanted to study engineering. Beyond that, everything felt uncertain."
    },

    {
      type: "p",
      text:
        "Choosing a degree felt like choosing an entire future. At eighteen years old, that responsibility seemed enormous."
    },

    { type: "h2", text: "Why Computer Science?" },

    {
      type: "p",
      text:
        "Computer Science and Engineering wasn't an obvious choice at first. There were many engineering fields that interested me. What ultimately attracted me to computer science was the combination of creativity, technical depth, and international opportunity."
    },

    {
      type: "p",
      text:
        "Unlike many professions, software engineering speaks a universal language. Whether in Portugal, Germany, Japan, Switzerland, Singapore, or the United States, the language of technology is largely English. The possibility of building a career anywhere in the world immediately appealed to me."
    },

    {
      type: "p",
      text:
        "I was also drawn to the idea of creating things from scratch. Software starts with nothing more than an idea. Then comes the design, planning, implementation, testing, deployment, and finally seeing people use something that once existed only in your imagination."
    },

    {
      type: "p",
      text:
        "Looking back, I realize this is remarkably similar to my favorite hobby: videography. Every video begins as an idea. You imagine the story, research how to tell it, plan the shots, record the footage, edit everything together, and finally share it with others. Software development follows a surprisingly similar process. In both cases, you start with a blank canvas and gradually transform an idea into reality."
    },

    { type: "h2", text: "Arriving at NOVA FCT" },

    {
      type: "p",
      text:
        "Walking onto the NOVA School of Science and Technology campus for the first time felt exciting, intimidating, and surreal all at once. It was the beginning of a completely new chapter."
    },

    {
      type: "p",
      text:
        "Suddenly I was surrounded by thousands of students from different backgrounds, all pursuing ambitious goals and trying to figure out their own paths. For the first time, I felt fully responsible for my future."
    },

    {
      type: "p",
      text:
        "The first semester was everything I had imagined university would be. Long days on campus, meeting new people, joining social activities, attending events, experiencing academic traditions, and discovering a level of independence I had never had before."
    },

    { type: "h2", text: "Then COVID Happened" },

    {
      type: "p",
      text:
        "Halfway through my first year, everything changed."
    },

    {
      type: "p",
      text:
        "COVID arrived and, almost overnight, the university experience I had imagined disappeared. Classes moved online. The campus became empty. Students returned home. Social events stopped. Friendships that were only beginning to form suddenly became much harder to maintain."
    },

    {
      type: "p",
      text:
        "Looking back, I still feel a sense of sadness about that period. University is often described as one of the most social experiences of a person's life, and I experienced only a small fraction of that before lockdown began."
    },

    {
      type: "p",
      text:
        "When classes eventually returned to campus, things never fully felt the same. The atmosphere had changed. People had changed. A year of isolation affected habits, relationships, and social dynamics. Many traditions became less active, spontaneous gatherings became less frequent, and the sense of community that existed before COVID seemed harder to recreate."
    },

    {
      type: "p",
      text:
        "I often wonder about the friendships that might have developed differently or the experiences that might have happened under normal circumstances. While there is no way to know, I am certain that the pandemic shaped my university experience in ways that will always remain unique to my generation."
    },

    { type: "h2", text: "The Academic Rollercoaster" },

    {
      type: "p",
      text:
        "If there is one thing engineering students learn quickly, it is humility."
    },

    {
      type: "p",
      text:
        "There were exams I left feeling incredibly proud of myself and others where I questioned whether I had understood anything at all. There were assignments that seemed impossible when they were announced and somehow got finished hours before the deadline."
    },

    {
      type: "p",
      text:
        "There were sleepless nights debugging code, preparing presentations, writing reports, studying for exams, and wondering how it was physically possible to fit so much work into so little time."
    },

    {
      type: "p",
      text:
        "I experienced the frustration of receiving grades that did not reflect the effort I felt I had invested. I experienced the joy of unexpectedly good results. I experienced presentations where I was so nervous I could barely focus and others where I felt completely confident."
    },

    {
      type: "p",
      text:
        "Over time, I learned that university is not simply about achieving good grades. It is about developing resilience, discipline, adaptability, and the ability to keep moving forward despite setbacks."
    },

    { type: "h2", text: "Life Outside the Classroom" },

    {
      type: "p",
      text:
        "Some of my favorite memories have very little to do with lectures or exams."
    },

    {
      type: "p",
      text:
        "They happened during long study sessions with friends before exams, trying to understand concepts together and convincing ourselves that everything would somehow work out."
    },

    {
      type: "p",
      text:
        "They happened during lunch breaks at the campus cafeteria, conversations between classes, late afternoons sitting outside enjoying the sun, and endless debates about assignments that often turned into discussions about life."
    },

    {
      type: "p",
      text:
        "They happened in the university library, which somehow always seemed to be completely full despite its size. Finding a free seat during exam season often felt harder than passing some of the exams themselves."
    },

    {
      type: "p",
      text:
        "They happened during dinners at friends' apartments, student parties, music festivals, academic celebrations, spontaneous trips, nights out in Lisbon, and all the small moments in between that ultimately become the memories people carry long after graduation."
    },

    { type: "h2", text: "The Professors You Never Forget" },

    {
      type: "p",
      text:
        "Every student leaves university remembering certain professors."
    },

    {
      type: "p",
      text:
        "Some remain in our memories because they inspired us. They made difficult concepts fascinating, challenged us to think differently, and genuinely cared about helping students learn and grow."
    },

    {
      type: "p",
      text:
        "Others remain memorable for very different reasons. Difficult exams, confusing explanations, impossible deadlines, and moments of frustration are also part of the university experience."
    },

    {
      type: "p",
      text:
        "In a strange way, both groups contribute to our development. Some teach us through inspiration. Others teach us resilience."
    },

    { type: "h2", text: "What I Learned" },

    {
      type: "p",
      text:
        "From a technical perspective, NOVA FCT provided me with an incredibly strong foundation. Throughout five years, I was exposed to software engineering, algorithms, databases, distributed systems, artificial intelligence, cybersecurity, networking, operating systems, mathematics, and countless other topics."
    },

    {
      type: "p",
      text:
        "More importantly, the university taught me how to learn independently. Technology changes constantly. The specific tools I use today may be completely different in ten years. The ability to adapt, learn, and solve unfamiliar problems is ultimately more valuable than any individual technology."
    },

    {
      type: "p",
      text:
        "University also taught me time management, self-discipline, critical thinking, communication, teamwork, and perhaps the most important skill of all: how to figure things out when no one has the answer."
    },

    {
      type: "p",
      text:
        "Engineering often feels less about knowing solutions and more about being comfortable searching for them. That mindset has proven invaluable far beyond the classroom."
    },

    { type: "h2", text: "Looking Back" },

    {
      type: "p",
      text:
        "Today, when I think about NOVA FCT, I do not immediately remember specific grades, assignments, or exams. What I remember are the people, the challenges, the growth, and the countless moments that gradually transformed me."
    },

    {
      type: "p",
      text:
        "I arrived as an uncertain eighteen-year-old trying to choose a future. I left as a software engineer with the confidence to build one."
    },

    {
      type: "quote",
      text:
        "University didn't just teach me computer science. It taught me how to learn, how to adapt, and how to become the person I wanted to be."
    }
  ]
},
{
  id: 10,
  slug: "building-software-with-in-nova",
  title: "Building Software with In-Nova",
  subtitle: "What it feels like to build real products with friends, for real clients, while still being a student",
  date: "2024-09-02",
  category: "work",
  tags: [
    "React",
    "React Native",
    "Node.js",
    "Agile",
    "Junior Enterprise",
    "Teamwork",
    "Software Engineering"
  ],
  coverImage: ph("innova_kggygw", 1280, 720),
  excerpt:
    "My experience as a Software Project Member at In-Nova, where I worked on real client projects, learned through collaboration with peers, and discovered what it means to build software in a fast-paced junior enterprise environment.",
  readTime: "10 min",
  body: [
    {
      type: "p",
      text:
        "Being part of In-Nova, the junior enterprise at NOVA School of Science and Technology, was one of the most formative experiences of my university years. It was the first time I worked in an environment that closely resembled a real software company, while still being surrounded by colleagues who were also my classmates and friends."
    },

    {
      type: "p",
      text:
        "As a Software Project Member, I had the opportunity to contribute to multiple client-facing projects, including two mobile applications and one web platform. These were not academic exercises. They were real products built for real clients, with real expectations and real deadlines."
    },

    { type: "h2", text: "Learning by Doing" },

    {
      type: "p",
      text:
        "One of the most valuable aspects of In-Nova was how much I learned by doing. Instead of following structured lectures or predefined exercises, we were constantly challenged to figure things out ourselves."
    },

    {
      type: "p",
      text:
        "We worked with technologies such as React, React Native, Node.js, JavaScript, Java, Docker, Kubernetes, SQL, Firebase, and Google Cloud Platform, often selecting and learning them based on the needs of each project."
    },

    {
      type: "p",
      text:
        "Most of the time, no one had all the answers. We had to research, experiment, debug, and teach each other. That independence shaped the way I approach engineering today. It taught me that being a software engineer is less about knowing everything and more about knowing how to learn quickly and effectively."
    },

    { type: "h2", text: "Building With Friends" },

    {
      type: "p",
      text:
        "What made In-Nova truly special was the people. We were not just colleagues — we were classmates, friends, and peers navigating the same stage of life together."
    },

    {
      type: "p",
      text:
        "We would spend long hours after lectures working on projects, debating architecture decisions, choosing between technologies, and trying to convince each other of the best technical approach."
    },

    {
      type: "p",
      text:
        "Those discussions were often intense, but always constructive. Whether it was deciding between backend frameworks, structuring a mobile app, or designing a database schema, every opinion mattered."
    },

    {
      type: "p",
      text:
        "And after those long working sessions, we would often switch off from engineering mode and simply enjoy being students together — sharing dinners, going out in Lisbon, or celebrating small milestones after releasing a feature or finishing a sprint."
    },

    { type: "h2", text: "Real Impact, Real Responsibility" },

    {
      type: "p",
      text:
        "Because In-Nova is a small and fast-moving organization, every contribution had a visible impact. You could directly see how your work affected project outcomes, client satisfaction, and the company’s overall progress."
    },

    {
      type: "p",
      text:
        "At the end of the year, seeing not only financial goals but also operational and learning objectives being met and exceeded created a strong sense of collective achievement. It was proof that consistent effort from a small team can create meaningful results."
    },

    {
      type: "p",
      text:
        "That sense of ownership was incredibly motivating. It made every feature, every fix, and every deployment feel important."
    },

    { type: "h2", text: "The Thirst Project Experience" },

    {
      type: "p",
      text:
        "One of the most meaningful projects I worked on during my time at In-Nova was the Thirst Project Portugal mobile application."
    },

    {
      type: "p",
      text:
        "This project stood out not only because of its technical challenges, but because of its mission. The application supported the coordination of over 1000 volunteers from the Thirst Project, a non-profit organization focused on fighting water scarcity in Africa by raising funds through students to build wells in communities in need. The platform helped improve organization, communication, and engagement within this large-scale volunteer network."
    },

    {
      type: "p",
      text:
        "I contributed to the frontend architecture using React Native, as well as design decisions and communication with stakeholders. Being part of a project with such a strong social impact made the experience especially meaningful to me."
    },

    {
      type: "p",
      text:
        "It reminded me that software is not only about efficiency or performance — it can also be a tool for coordination, community building, and real-world change."
    },

    {
      type: "img",
      url: ph("thirstProject_vrf4dn", 1280, 720),
      caption:
        "Thirst Project Portugal website — https://thirstproject.pt/"
    },

    { type: "h2", text: "Growing as an Engineer" },

    {
      type: "p",
      text:
        "Looking back, In-Nova was where I truly started to grow into a more independent software engineer. It was where I learned how to work in Agile teams, how to deliver under pressure, how to communicate technical decisions, and how to take responsibility for my work."
    },

    {
      type: "p",
      text:
        "It was also where I learned that engineering is deeply collaborative. No matter how strong your individual skills are, building real products always requires teamwork, trust, and shared commitment."
    },

    {
      type: "p",
      text:
        "Most importantly, it was where I experienced the transition from student projects to real-world software development. That shift changed the way I see technology and my role within it."
    },

    {
      type: "quote",
      text:
        "Some of the best lessons in engineering do not come from lectures — they come from building things with people who are learning alongside you."
    }
  ]
},
{
  id: 11,
  slug: "working-as-software-engineer-at-opensoft",
  title: "Working as a Software Engineer at Opensoft",
  subtitle: "My first real industry experience building systems used by thousands of citizens and public institutions",
  date: "2025-10-18",
  category: "work",
  tags: [
    "Opensoft",
    "Software Engineering",
    "Java",
    "Spring Boot",
    "React",
    "Flutter",
    "Azure",
    "Public Sector",
    "CI/CD"
  ],
  coverImage: ph("opensoft_uphmvp", 1280, 720),
  excerpt:
    "My experience as a Software Engineer at Opensoft, where I worked on large-scale government systems used by millions of citizens, learned production-grade development, and grew from student to professional engineer.",
  readTime: "16 min",
  body: [
    {
      type: "p",
      text:
        "Joining Opensoft was my first real experience working as a Software Engineer in industry. Until then, everything I had built lived in the context of university projects, hackathons, or student initiatives. Suddenly, I was working on systems used by real citizens, real institutions, and real government agencies."
    },

    {
      type: "p",
      text:
        "It was both exciting and intimidating. I quickly realized that while university had given me a strong foundation, the real world of software engineering required a much deeper level of precision, responsibility, and understanding of how systems behave in production."
    },

    {
      type: "p",
      text:
        "In many ways, this was where I truly became a Software Engineer."
    },

    { type: "h2", text: "Learning the Reality of Production Systems" },

    {
      type: "p",
      text:
        "One of the biggest differences from university was the scale and complexity of the systems I was working on. Every decision had consequences — for performance, security, maintainability, and user experience."
    },

    {
      type: "p",
      text:
        "I learned that writing code is only a small part of the job. Understanding architecture, legacy systems, deployment pipelines, testing strategies, and stakeholder requirements is just as important."
    },

    {
      type: "p",
      text:
        "I also learned that clean code is not just about style — it is about collaboration, long-term maintainability, and making systems understandable for entire teams, not just individuals."
    },

    { type: "h2", text: "Starting With Challenges" },

    {
      type: "p",
      text:
        "The beginning was not easy. University prepares you with strong theoretical knowledge, but working in a production environment is different. The technologies are more complex, the workflows are stricter, and the expectations are much higher."
    },

    {
      type: "p",
      text:
        "I often felt that I was learning a completely new way of thinking about software engineering. Concepts like CI/CD pipelines, production monitoring, legacy system migration, and enterprise-level architecture were things I had only briefly encountered before."
    },

    {
      type: "p",
      text:
        "I am deeply grateful to my colleagues at Opensoft, who were always patient and generous with their time. They explained concepts, reviewed my work, and helped me understand not only how things worked, but why they were done in a certain way."
    },

    { type: "h2", text: "Project: Embassy of Cape Verde Digital Services" },

    {
      type: "p",
      text:
        "One of my first major projects was developing the web and mobile platforms for the Embassy of the Government of Cape Verde."
    },

    {
      type: "p",
      text:
        "This system enabled secure citizen-facing digital services used by over 50,000 users. It was my introduction to building production-grade applications with real-world impact."
    },

    {
      type: "p",
      text:
        "Throughout the project, I worked across both frontend and backend systems, developing user interfaces, integrating REST APIs, implementing business logic, and ensuring secure communication between different services. It exposed me to the challenges of building applications that handle sensitive citizen data and reinforced the importance of security, reliability, and maintainability in government systems."
    },

    {
      type: "p",
      text:
        "One of the most technically challenging and rewarding features I worked on was an AI-powered document translation pipeline. The goal was to allow citizens to translate official documents, such as birth certificates, into another language while preserving their legal structure and validity. To achieve this, I built a workflow that extracted text from uploaded documents using OCR, translated the content into the user's selected language, and then generated a new document matching the official format of the destination country."
    },

    {
      type: "p",
      text:
        "What made this particularly complex was that official documents vary significantly between countries. A birth certificate from one country can have a completely different structure, layout, terminology, and required fields compared to another. This meant that a simple text extraction and translation process was not enough. I had to train and configure AI models using Azure AI Services to recognize different document templates, correctly identify the relevant information, and map it into the corresponding format of the target country's official document."
    },

    {
      type: "p",
      text:
        "I found this challenge especially fascinating because it combined several areas of technology that I had never worked with simultaneously before: artificial intelligence, OCR, document processing, workflow automation, and internationalization. It required much more than simply writing code; it involved understanding how legal documents are structured, how machine learning models interpret information, and how to ensure the final output remained accurate and trustworthy."
    },

    {
      type: "p",
      text:
        "Emotionally, it was incredibly rewarding to know that something I helped build was being used by real citizens for essential administrative processes. Knowing that the platform could simplify interactions between citizens and public institutions, while making important services more accessible, gave a deeper purpose to the work beyond the technical challenges themselves."
    },

    { type: "h2", text: "Project: Portuguese Tax and Customs Authority — Tax Benefit Platform" },

    {
      type: "p",
      text:
        "Another major project was the Tax Benefit Management Platform for the Portuguese Tax and Customs Authority, serving both internal employees and millions of citizens."
    },

    {
      type: "p",
      text:
        "This project involved migrating parts of a legacy system into a modern architecture using React and Spring Boot, while maintaining system stability and ensuring continuity of service."
    },

    {
      type: "p",
      text:
        "Working on both employee-facing systems (around 10K+ users) and citizen-facing interfaces (18M+ users) gave me a strong sense of responsibility and scale that I had never experienced before."
    },

    {
      type: "p",
      text:
        "This project taught me how to work with large, complex systems where every change must be carefully considered, tested, and validated."
    },

    { type: "h2", text: "Project: EFAPI and EORI Systems" },

    {
      type: "p",
      text:
        "I also contributed to EFAPI and EORI enterprise platforms, again for the Portuguese Tax and Customs Authority, supporting secure APIs, backend integrations, and SQL-driven systems used by over 250,000 users."
    },

    {
      type: "p",
      text:
        "What made this project particularly interesting was the complexity of the business domain. Unlike many applications where the challenge is primarily technical, these platforms required a deep understanding of regulations, administrative processes, and the needs of different stakeholders. It taught me how important it is to understand the problem behind the software, not just the software itself."
    },

    { type: "h2", text: "DevOps, Testing, and Production Thinking" },

    {
      type: "p",
      text:
        "Beyond feature development, I worked with CI/CD pipelines, automated testing frameworks like JUnit and Mockito, and static code analysis tools such as SonarQube."
    },

    {
      type: "p",
      text:
        "I learned how important testing is in preventing regressions and ensuring system stability. I also learned how deployment pipelines and containerization with Docker on Microsoft Azure make modern software delivery possible at scale."
    },

    { type: "h2", text: "Technical and Personal Growth" },

    {
      type: "p",
      text:
        "Across all projects, my technical skills grew significantly. I gained hands-on experience with Java, Spring Boot, React, Flutter, Kotlin, Swift, SQL, Azure, Docker, CI/CD pipelines, and API design."
    },

    {
      type: "p",
      text:
        "But beyond technical skills, I developed something even more important: professional maturity. I learned how to communicate in teams, how to handle production pressure, how to ask better questions, and how to take responsibility for my work."
    },

    {
      type: "p",
      text:
        "I also learned how important it is to stay humble in this field. There is always more to learn, and every system has complexities that only become visible when you are responsible for maintaining it in production."
    },

    { type: "h2", text: "Looking Back" },

    {
      type: "p",
      text:
        "Looking back, Opensoft was the place where theory became reality for me. It was where I transitioned from building projects for learning purposes to building systems that support real institutions and real citizens."
    },

    {
      type: "p",
      text:
        "It was not always easy, but it was deeply transformative. I left with stronger technical skills, a much deeper understanding of software engineering, and a clear sense of what it means to build systems that matter."
    },

    {
      type: "quote",
      text:
        "University gave me the foundation. Opensoft taught me how to build real software for real people."
    }
  ]
}
];
