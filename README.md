# Beatriz Santos — Personal Career Website

An interactive, travel-themed personal portfolio built as a production-grade single-page application. Features a real-time 3D globe rendered with WebGL, animated career timelines, Framer Motion scroll animations, and a fully integrated contact form with email delivery.

---

## Tech Stack

### Core
| Layer | Technology |
|---|---|
| Language | TypeScript (strict mode, ESNext target) |
| UI Framework | React 18 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Package Manager | pnpm |

### 3D & Visualisation
| Technology | Usage |
|---|---|
| Three.js | WebGL-rendered interactive 3D globe |
| TopoJSON + world-atlas | GeoJSON topography for globe projection |
| Custom raycaster | Click-to-focus on career location markers |

### Animation
| Technology | Usage |
|---|---|
| Framer Motion (motion v12) | Scroll-triggered entry animations (`whileInView`), hover effects, layout transitions |
| CSS transitions | Micro-interactions on tags, buttons, and nav items |

### UI Components & Design System
| Technology | Usage |
|---|---|
| Radix UI (headless) | Accessible primitives — accordion, dialog, dropdown, tabs, tooltip, and more |
| shadcn/ui | Component patterns built on Radix UI primitives |
| Lucide React | Consistent icon library |
| class-variance-authority + clsx | Type-safe variant composition and conditional class merging |
| tailwind-merge | Safe Tailwind class deduplication |

### Forms & Integrations
| Technology | Usage |
|---|---|
| Formspree | Contact form backend — email delivery with no server required |
| Native Fetch API | Async form submission with loading, success, and error states |
| HTML5 constraint validation | Client-side email format validation before submission |

### Developer Experience
| Technology | Usage |
|---|---|
| TypeScript strict mode | Full type safety across all components and data models |
| ESNext modules | Native ES module output |
| Path aliases (`@/`) | Clean absolute imports throughout the codebase |
| Vite HMR | Instant hot module replacement in development |

---

## Architecture

```
src/
├── app/
│   ├── App.tsx                  # All sections composed in a single-page layout
│   └── components/
│       └── ui/                  # Reusable Radix UI / shadcn-based components
├── content/
│   ├── career.ts                # All career data — jobs, education, events, projects, skills
│   └── text.ts                  # All UI copy — hero, about, contact, nav, footer
└── styles/
    ├── globals.css              # CSS custom properties and base resets
    ├── theme.css                # Design token definitions (colours, spacing, radius)
    └── tailwind.css             # Tailwind v4 entry point
```

**Data-driven design** — all content (career points, project entries, skills, copy) lives in two TypeScript files under `src/content/`. No content is hardcoded in components. Adding a new career point or project requires editing only the data layer.

**Component model** — the application is a single composed page (`App.tsx`) with clearly separated section components: `HeroSection`, `AboutSection`, `ExperienceSection`, `EducationSection`, `ProjectsSection`, `EventsSection`, `SkillsSection`, `ContactSection`. Each receives only the data slice it needs via typed props.

---

## Key Features

- **Interactive 3D Globe** — Three.js WebGL globe with a custom raycaster for click-to-focus on career location markers, marker clustering by city, and smooth camera transitions
- **Animated Career Timelines** — right-side waypoint timeline for experience, alternating center-path timeline for education, both with scroll-triggered Framer Motion animations
- **Featured Events Card** — split-panel card with a dynamic highlight grid, quote block, and category-coloured badges
- **Per-project colour palettes** — each project card has its own accent colour applied across the hero gradient, icon glow, and CTA
- **Contact Form with email delivery** — Formspree integration with async submission, loading state, success confirmation, and error handling; no backend or server required
- **Fully responsive** — mobile-first layout, responsive typography, touch-friendly interactions

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# → http://localhost:5173

# Production build
pnpm build
```

---

## Deployment

Deployed on **Vercel** via GitHub integration. Every push to `main` triggers an automatic production deploy.

| Setting | Value |
|---|---|
| Build command | `pnpm build` |
| Output directory | `dist` |
| Framework preset | Vite |

---

## Content Management

All career data is maintained in [`src/content/career.ts`](src/content/career.ts):

```ts
// Adding a new experience entry
{
  id: 16,
  type: "job",
  title: "Senior Software Engineer",
  company: "Acme Corp",
  city: "London, UK",
  period: "2025 – Present",
  lat: 51.5074,
  lng: -0.1278,
  description: "...",
  tags: ["Java", "React", "Kubernetes"],
}
```

All UI copy — hero tagline, about text, nav links, contact section — is in [`src/content/text.ts`](src/content/text.ts).

---

*Built by Beatriz Santos — Full-Stack Software Engineer*
