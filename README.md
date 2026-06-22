# Beatriz Santos — Personal Career Website

An interactive personal portfolio and blog built from scratch. Features a real-time 3D WebGL globe, animated career timelines, a travel & photography showcase, and a full editorial blog system.

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
| Radix UI (headless) | Accessible primitives — accordion, dialog, dropdown, tabs, tooltip |
| shadcn/ui | Component patterns built on Radix UI primitives |
| Lucide React | Consistent icon library |
| class-variance-authority + clsx | Type-safe variant composition and conditional class merging |
| tailwind-merge | Safe Tailwind class deduplication |

### Forms & Integrations
| Technology | Usage |
|---|---|
| Formspree | Contact form backend — email delivery with no server required |
| Cloudinary | Cloud image storage and CDN delivery with automatic format optimization |

### Developer Experience
| Technology | Usage |
|---|---|
| TypeScript strict mode | Full type safety across all components and data models |
| Path aliases (`@/`) | Clean absolute imports throughout the codebase |
| Vite HMR | Instant hot module replacement in development |

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Portfolio (Home) | Interactive 3D globe, career timeline, projects, skills, contact |
| `/me` | Beyond Code | Travel adventures, photography gallery, filmmaking |
| `/blog` | Blog listing | Editorial blog index with featured post, category filters |
| `/blog/:slug` | Blog post | Full article view with rich content blocks |

---

## Architecture

```
src/
├── app/
│   ├── App.tsx              # Main portfolio page (single-page layout)
│   ├── PersonalPage.tsx     # Beyond Code page — travel, photography, film
│   ├── BlogPage.tsx         # Blog listing page
│   ├── BlogPostPage.tsx     # Individual blog post renderer
│   └── components/
│       └── ui/              # Reusable Radix UI / shadcn-based components
├── content/
│   ├── text.ts              # All UI copy — hero, about, contact, nav
│   ├── career.ts            # Career data — jobs, education, projects, skills
│   ├── personal.ts          # Beyond Code data — trips, gallery photos, film
│   ├── blog.ts              # Blog posts and category metadata
│   └── cloudinary.ts        # Cloudinary URL helper
└── styles/
    ├── globals.css          # Base resets
    ├── theme.css            # Design token definitions
    └── tailwind.css         # Tailwind v4 entry point
```

**Data-driven design** — all content lives in `src/content/`. No text or image URLs are hardcoded in components.

---

## Design System

| Role | Hex | Usage |
|---|---|---|
| Background | `#13111d` | Page background |
| Rose | `#c4708a` | Primary accent, Travel section, Blog nav |
| Lavender | `#9b7fc4` | Tech category, secondary accent |
| Teal | `#7fc4c0` | Photography/Filmmaking section |
| White | `#ffffff` | Text and UI elements |

Blog category colors:

| Category | Hex |
|---|---|
| Tech | `#9b7fc4` |
| Travel | `#c4708a` |
| Photography | `#7fc4c0` |
| Life | `#c4a87f` |
| Work | `#7fc488` |
| Events | `#c4b87f` |

---

## Cloudinary Image Setup

All images are served from Cloudinary. The helper in [`src/content/cloudinary.ts`](src/content/cloudinary.ts) generates optimized URLs:

```ts
import { img } from "@/content/cloudinary";

img("my-photo-public-id", 800, 533)
// → https://res.cloudinary.com/df2qs2fi4/image/upload/w_800,h_533,c_fill,f_auto,q_auto/my-photo-public-id
```

Cloudinary handles format conversion (WebP/AVIF), compression, and CDN delivery automatically.

**To add a new image:**
1. Upload the image to your Cloudinary Media Library at [cloudinary.com](https://cloudinary.com)
2. Note the **Public ID** shown in the Media Library (e.g., `tokyo-golden-hour` or `travel/lisbon-tram` if inside a folder)
3. Use `img("public-id", width, height)` in any content file

> The **Cloud Name** (`df2qs2fi4`) is the only Cloudinary credential used in the frontend. The API Secret must never be included in client-side code.

---

## Content Management

### Adding a blog post

Edit [`src/content/blog.ts`](src/content/blog.ts) and append to the `POSTS` array:

```ts
{
  id: 3,
  slug: "my-new-post",
  title: "My New Post",
  subtitle: "Optional subtitle",
  date: "2026-07-01",
  category: "tech",           // tech | travel | photography | life | work | events
  tags: ["React", "Design"],
  coverImage: img("my-cover-image", 1280, 720),
  excerpt: "Short preview text shown in the post card.",
  readTime: "5 min",
  featured: true,             // optional — only one post should be featured at a time
  body: [
    { type: "p", text: "First paragraph." },
    { type: "h2", text: "A Section Heading" },
    { type: "quote", text: "A pull quote." },
    { type: "img", url: img("my-inline-image", 1280, 720), caption: "Image caption" },
    { type: "ul", items: ["Item one", "Item two"] },
  ]
}
```

> Only **one** post should have `featured: true`. The featured post appears as the large hero card on the blog listing. All other posts appear in the grid.

Supported `body` block types: `p`, `h2`, `h3`, `quote`, `img`, `ul`

### Adding career data

Edit [`src/content/career.ts`](src/content/career.ts) and add to the relevant array (jobs, education, projects, skills, or events).

### Adding travel stops or photos

Edit [`src/content/personal.ts`](src/content/personal.ts):
- Add stops inside an existing `TRIPS` entry or create a new trip object
- Add new gallery photos to `TOP_PHOTOS`

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

*Built by Beatriz Santos — Full-Stack Software Engineer*
