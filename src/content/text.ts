// ─── Perfil ───────────────────────────────────────────────────────────────────
// Muda aqui o teu nome e cargo — aparecem no nav, hero e footer.

export const profile = {
  name: "Beatriz Santos",
  role: "Software Engineer",
};

// ─── Hero (secção principal com o globo) ──────────────────────────────────────

export const hero = {
  taglineLines: [
    "Crafting scalable software applications.",
    "Exploring the world that shapes it.",
  ],
  mobileSubtitle: "Software Engineer",
  cta:    "Explore Journey",
  scroll: "Scroll",
};

// ─── Navegação ────────────────────────────────────────────────────────────────

export const navLinks = [
  "about",
  "experience",
  "education",
  "certifications",
  "events",
  "skills",
  "contact",
] as const;

// ─── Títulos das secções ──────────────────────────────────────────────────────

export const sections = {
  experience:     { title: "Experience",       subtitle: "Building Real-World Software"     },
  education:      { title: "Education",        subtitle: "Academic Background"              },
  certifications: { title: "Certifications",   subtitle: "Continuous Learning"              },
  events:         { title: "Events",           subtitle: "Hackathons and Conferences"       },
  volunteering:   { title: "Volunteering",        subtitle: "Community and Social Impact"                  },
  skills:         { title: "Skills",           subtitle: "Technologies and Tools"           },
  contact:        { title: "Let's Connect",     subtitle: "Get In Touch"                    },
};

// ─── Sobre mim ────────────────────────────────────────────────────────────────

export const about = {
  label: "About me",
  headingLines: [
    "Engineer by trade,",
    "explorer by soul.",
  ],
  paragraphs: [
    "I am a Full-Stack Software Engineer passionate about building scalable digital products, clean architectures, and technology that creates real impact for people. From secure government platforms to cross-platform mobile applications, I enjoy transforming complex problems into reliable and intuitive solutions.",
    "Outside of tech, I’m usually exploring a new country. Traveling continuously shapes the way I approach software: with curiosity, adaptability, and an openness to different perspectives.",
  ],
  stats: [
    { value: "18M+",  label: "Users Served",          icon: "🌍" },
    { value: "2",    label: "Years Exp.",        icon: "⚡" },
    { value: "5",  label: "Certs & Courses", icon: "🏆" },
    { value: "8",   label: "Production Projects",   icon: "🛠️" },
  ],
};

// ─── Contacto ─────────────────────────────────────────────────────────────────
// Muda o email, github e linkedin aqui.

export const contact = {
  intro: "Whether you want to collaborate on a project, discuss engineering challenges, or just share a travel story — I would love to hear from you.",
  links: [
    { icon: "Mail",     label: "beatrizmrsantos@gmail.com",         href: "mailto:beatrizmrsantos@gmail.com" },
    { icon: "Github",   label: "github.com/beatrizmrsantoss",      href: "https://github.com/beatrizmrsantoss" },
    { icon: "Linkedin", label: "linkedin.com/in/-beatriz-santos", href: "https://www.linkedin.com/in/-beatriz-santos/" },
  ],
  form: {
    fields: [
      { name: "name",  placeholder: "Your name",      type: "text"  },
      { name: "email", placeholder: "your@email.com", type: "email" },
    ],
    messagePlaceholder: "Your message...",
    submit:             "Send Message",
  },
  success: {
    heading: "Message sent!",
    body:    "Thanks for reaching out — I will reply soon.",
  },
};

// ─── Rodapé ───────────────────────────────────────────────────────────────────

export const footer = {
  text: "© 2026 Beatriz Santos · Built with creativity, caffeine & a few too many flights ✈️",
};
