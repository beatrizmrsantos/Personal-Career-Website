// ─── Types ────────────────────────────────────────────────────────────────────

export type PointType = "job" | "education" | "cert" | "event" | "volunteer";

export interface CareerPoint {
  id: number;
  lat: number;
  lng: number;
  city: string;
  type: PointType;
  icon: string;
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  color: string;
}

// ─── Type Mappings ────────────────────────────────────────────────────────────

export const TYPE_COLORS: Record<PointType, string> = {
  job: "#c4708a",
  education: "#9b7fc4",
  cert: "#7fc4c0",
  event: "#c4a87f",
  volunteer: "#7fc488",
};

export const TYPE_LABELS: Record<PointType, string> = {
  job: "Experience",
  education: "Education",
  cert: "Certification",
  event: "Events",
  volunteer: "Volunteering",
};

// ─── Career Points ────────────────────────────────────────────────────────────

export const careerPoints: CareerPoint[] = [
  {
    id: 1, lat: 41.1496, lng: -8.6109, city: "Porto, Portugal", type: "job", icon: "💼",
    title: "Software Engineer", company: "Farfetch", period: "2023 – Present",
    description: "Building distributed systems and microservices at scale. Led migration from monolith to event-driven architecture serving 3M+ daily users. Designed real-time inventory sync across 700+ boutiques worldwide.",
    tags: ["Golang", "Kubernetes", "Kafka", "PostgreSQL"], color: "#c4708a",
  },
  {
    id: 2, lat: 38.7169, lng: -9.1399, city: "Lisbon, Portugal", type: "education", icon: "🎓",
    title: "MSc Computer Science", company: "Instituto Superior Técnico", period: "2021 – 2023",
    description: "Specialized in Distributed Systems and Machine Learning. Thesis on real-time graph processing for social networks at scale. Graduated with distinction — top 5% of cohort.",
    tags: ["Algorithms", "ML", "Distributed Systems", "Research"], color: "#9b7fc4",
  },
  {
    id: 3, lat: 51.5074, lng: -0.1278, city: "London, UK", type: "cert", icon: "📜",
    title: "AWS Solutions Architect – Professional", company: "Amazon Web Services", period: "2023",
    description: "Professional-level certification in designing distributed, fault-tolerant, and highly available systems on AWS cloud infrastructure including multi-region architectures.",
    tags: ["AWS", "Cloud", "IaC", "Architecture"], color: "#7fc4c0",
  },
  {
    id: 4, lat: 37.7749, lng: -122.4194, city: "San Francisco, USA", type: "event", icon: "🎤",
    title: "Google I/O 2023 – Speaker", company: "Google", period: "May 2023",
    description: "Delivered a session on building AI-powered developer tools to 500+ engineers at the Moscone Center. Covered LLM integration patterns, prompt engineering, and developer UX principles.",
    tags: ["AI", "Developer Tools", "Public Speaking", "LLMs"], color: "#c4a87f",
  },
  {
    id: 5, lat: 35.6762, lng: 139.6503, city: "Tokyo, Japan", type: "volunteer", icon: "🤝",
    title: "Code for Japan", company: "Code for Japan Foundation", period: "Summer 2022",
    description: "Built open-source civic tech solutions for disaster response coordination and public resource allocation. Collaborated with local municipalities and NGOs on real-world impact.",
    tags: ["Open Source", "Civic Tech", "Python", "React"], color: "#7fc488",
  },
  {
    id: 6, lat: 41.3851, lng: 2.1734, city: "Barcelona, Spain", type: "event", icon: "📱",
    title: "Mobile World Congress 2024", company: "GSMA", period: "Feb 2024",
    description: "Presented edge computing solutions for real-time IoT data processing. Networked with 200+ industry leaders from 90 countries. Demoed prototype at the Innovation City stage.",
    tags: ["5G", "IoT", "Edge Computing", "Demo"], color: "#c4a87f",
  },
  {
    id: 7, lat: 52.3676, lng: 4.9041, city: "Amsterdam, Netherlands", type: "volunteer", icon: "💚",
    title: "Tech for Good Initiative", company: "Mozilla Foundation", period: "2021",
    description: "Contributed to open-source privacy tools and digital rights education across Europe. Trained 50+ NGO staff on data security practices and built tooling for secure communications.",
    tags: ["Privacy", "Open Source", "Digital Rights", "EU"], color: "#7fc488",
  },
  {
    id: 8, lat: 22.3193, lng: 114.1694, city: "Hong Kong", type: "job", icon: "🏙️",
    title: "Junior Software Engineer", company: "Accenture", period: "2020 – 2021",
    description: "Developed enterprise Java microservices for banking clients. Implemented REST APIs for payment gateway integrations processing €2M+ daily transactions with 99.9% uptime.",
    tags: ["Java", "Spring Boot", "REST", "Oracle"], color: "#c4708a",
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skills = [
  { group: "Languages",    items: ["Python", "Go", "TypeScript", "Java", "SQL", "Bash"] },
  { group: "Frameworks",   items: ["React", "FastAPI", "Spring Boot", "Next.js", "GraphQL"] },
  { group: "Cloud & Infra",items: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "Kafka"] },
  { group: "Data & Tools", items: ["PostgreSQL", "Redis", "Elasticsearch", "Git", "Prometheus", "Grafana"] },
];

// ─── Flight Segments ──────────────────────────────────────────────────────────
// Narrative: Porto → HKG (job) → LIS (study) → LHR (cert) → SFO (event) → NRT (volunteer) → AMS (volunteer) → BCN (event)

export const flightSegments = [
  { label: "Experience",     from: "OPO", to: "HKG", fromCity: "Porto",         toCity: "Hong Kong",     flightNum: "FX 001", distance: "9,700 km", duration: "12h 30m", curve: 12 },
  { label: "Education",      from: "HKG", to: "LIS", fromCity: "Hong Kong",     toCity: "Lisbon",        flightNum: "TP 020", distance: "9,600 km", duration: "12h 10m", curve: 55 },
  { label: "Certifications", from: "LIS", to: "LHR", fromCity: "Lisbon",        toCity: "London",        flightNum: "TP 120", distance: "1,741 km", duration: "2h 20m",  curve: 22 },
  { label: "Events",         from: "LHR", to: "SFO", fromCity: "London",        toCity: "San Francisco", flightNum: "BA 285", distance: "8,625 km", duration: "10h 45m", curve: 8  },
  { label: "Volunteering",   from: "SFO", to: "NRT", fromCity: "San Francisco", toCity: "Tokyo",         flightNum: "JL 002", distance: "8,256 km", duration: "10h 30m", curve: 65 },
  { label: "Skills",         from: "NRT", to: "AMS", fromCity: "Tokyo",         toCity: "Amsterdam",     flightNum: "KL 862", distance: "9,350 km", duration: "12h 00m", curve: 18 },
  { label: "Contact",        from: "AMS", to: "BCN", fromCity: "Amsterdam",     toCity: "Barcelona",     flightNum: "VY 834", distance: "1,457 km", duration: "2h 05m",  curve: 42 },
];
