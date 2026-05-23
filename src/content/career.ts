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
  // =========================
  // JOBS
  // =========================
  {
    id: 12,
    lat: 38.7369,
    lng: -9.1387,
    city: "Lisbon, Portugal",
    type: "event",
    icon: "🎤",
    title: "Guest Speaker at JORTEC 2025",
    company: "NOVA School of Science and Technology & Opensoft",
    period: "March 2025",
    description:
      "Invited speaker at JORTEC 2025, a technology and career event organized by NOVA School of Science and Technology (FCT NOVA). Represented Opensoft by presenting the company’s mission, culture, and public sector digital solutions, while sharing my journey from student intern to full-time Software Engineer to inspire students entering the tech industry.",
    tags: ["Public Speaking", "Software Engineering", "Networking"],
  },

  {
    id: 1,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "job",
    icon: "💼",
    title: "Full-Stack Software Engineer",
    company: "Opensoft",
    period: "2024 – 2025",
    description:
      "Developed secure web and mobile government platforms, including citizen-facing digital services and large-scale administrative systems. Worked on authentication, APIs, cloud integrations and production systems serving thousands of users.",
    tags: ["Java", "Spring Boot", "React", "React Native", "Azure", "SQL"],
  },

  {
    id: 7,
    lat: 50.8503,
    lng: 4.3517,
    city: "Brussels, Belgium",
    type: "cert",
    icon: "🏛️",
    title: "European Parliament Elections IT Support",
    company: "European Parliament",
    period: "June 2024",
    description:
      "Provided IT support during election operations, ensuring system reliability and operational continuity.",
    tags: ["IT Support", "Systems", "Operations"],
  },

  {
    id: 6,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "cert",
    icon: "🚀",
    title: "Spring Hackathon 23/24",
    company: "NOVA School of Science and Technology",
    period: "May 2024",
    description:
      "Participated in university hackathon focused on rapid software development and prototyping in multidisciplinary teams.",
    tags: ["Hackathon", "React", "Innovation"],
  },

  {
    id: 11,
    lat: 38.7369,
    lng: -9.1387,
    city: "Lisbon, Portugal",
    type: "cert",
    icon: "🎤",
    title: "EUGAIN Final Conference",
    company: "Ordem dos Engenheiros",
    period: "Apr 2024",
    description:
      "Attended international conference focused on engineering, communication and critical thinking in technical environments.",
    tags: ["Communication", "Critical Thinking", "Adaptation"],
  },

  {
    id: 10,
    lat: 38.7369,
    lng: -9.1387,
    city: "Lisbon, Portugal",
    type: "cert",
    icon: "💡",
    title: "Innovation Week",
    company: "In-Nova (NOVA FCT Junior Enterprise)",
    period: "Mar 2024",
    description:
      "Participated in Innovation Week focused on teamwork, problem solving and full-stack development using modern web and mobile technologies.",
    tags: ["Communication", "Project Planning", "React", "Node.js", "Java"],
  },

  {
    id: 3,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "job",
    icon: "💼",
    title: "Software Project Member",
    company: "In-Nova (NOVA FCT Junior Enterprise)",
    period: "2023 – 2024",
    description:
      "Delivered full-stack web and mobile projects for external clients. Worked with React Native, Node.js, Java, Docker, Kubernetes and cloud platforms in Agile environments.",
    tags: ["React Native", "Node.js", "Java", "Docker", "Kubernetes", "GCP"],
  },

  {
    id: 2,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "job",
    icon: "💼",
    title: "Software Engineering Intern / Thesis",
    company: "Opensoft",
    period: "2021 – 2022 & 2023 – 2024",
    description:
      "Built secure cross-platform authentication systems with biometric validation, digital signatures, and real-time communication features. Contributed to enterprise-scale government platforms and API integrations.",
    tags: ["Flutter", "Java", "Spring Boot", "APIs", "WebRTC", "SQL"],
  },

  {
    id: 8,
    lat: 6.5244,
    lng: 22.2655,
    city: "Africa",
    type: "volunteer",
    icon: "🤝",
    title: "Thirst Project Portugal",
    company: "Thirst Project",
    period: "2023",
    description:
      "Contributed to mobile application development supporting volunteer coordination for water-access initiatives across communities.",
    tags: ["React Native", "Mobile", "Volunteering"],
  },

  {
    id: 5,
    lat: 51.1079,
    lng: 13.7383,
    city: "Dresden, Germany",
    type: "education",
    icon: "🎓",
    title: "Erasmus Exchange Program",
    company: "Technische Universität Dresden",
    period: "2023",
    description:
      "International exchange program focused on computer science. Strengthened adaptability and technical foundations in an international academic environment.",
    tags: ["Computer Science", "International", "Systems"],
  },

  {
    id: 9,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "job",
    icon: "👩‍🏫",
    title: "Programming Instructor",
    company: "Happy Code Campo de Ourique",
    period: "2022 – 2023",
    description:
      "Taught programming fundamentals, algorithms and logical thinking to students through practical exercises and projects.",
    tags: ["Teaching", "Programming Basics", "Mentoring"],
  },

  {
    id: 4,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "education",
    icon: "🎓",
    title: "MSc Computer Science and Engineering",
    company: "NOVA School of Science and Technology",
    period: "2019 – 2024",
    description:
      "Master's degree in Computer Science and Engineering. Focus on software engineering, distributed systems and full-stack development. GPA: 17/20.",
    tags: ["Software Engineering", "Systems", "Algorithms", "Distributed Systems"],
  },

  {
    id: 15,
    lat: 37.0194,
    lng: -7.9304,
    city: "Faro, Portugal",
    type: "volunteer",
    icon: "🤝",
    title: "Children's Entertainment Volunteer",
    company: "Community Volunteer Work",
    period: "2017 – 2019",
    description:
      "Volunteered in entertainment activities for children at Faro Hospital’s pediatrics ward, the Aboim Ascensão orphanage, and the Santa Casa da Misericórdia kindergarten in Portugal, a non-governmental organization dedicated to providing care and support to individuals facing adversity.",
    tags: ["Volunteering", "Communication", "Teamwork"],
  },

  {
    id: 14,
    lat: 35.1264,
    lng: 33.4299,
    city: "Cyprus",
    type: "education",
    icon: "🌍",
    title: "Erasmus+ KA2 – Life and Job Skills for Successful Europeans",
    company: "European Union",
    period: "Jan 2018",
    description:
      "European exchange program focused on cross-cultural communication, adaptability and collaborative learning.",
    tags: ["Communication", "Cultural Awareness", "Adaptability"],
  },

  {
    id: 13,
    lat: 48.8566,
    lng: 2.3522,
    city: "Paris, France",
    type: "event",
    icon: "🌐",
    title: "We and the Internet",
    company: "Missions Publiques",
    period: "Oct 2020",
    description:
      "Global dialogue initiative focused on internet governance, communication and collaborative decision-making across cultures.",
    tags: ["Communication", "Critical Thinking", "Teamwork"],
  },
];


// ─── Skills ───────────────────────────────────────────────────────────────────

export const skills = [
  { group: "Languages", items: ["Java", "TypeScript", "JavaScript", "Dart", "SQL", "C", "HTML5", "CSS3"] },
  { group: "Backend Engineering", items: ["Spring Boot", "Node.js", "REST APIs", "Microservices", "WebSockets", "SOAP", "XML/JSON"] },
  { group: "Frontend & Mobile", items: ["React", "Angular", "React Native", "Flutter", "Kotlin", "Swift"] },
  { group: "Cloud & DevOps", items: ["Microsoft Azure", "Google Cloud Platform (GCP)", "Firebase", "Docker", "Kubernetes", "CI/CD", "Git", "GitHub", "Bitbucket"] },
  { group: "Databases", items: ["MySQL", "MongoDB", "SQL Optimization"] },
  { group: "Quality & Testing", items: ["JUnit", "Mockito", "SonarQube", "Automated Testing", "Debugging", "Code Reviews"] },
  { group: "Engineering Practices", items: ["Agile/Scrum", "SDLC", "Software Architecture", "Secure Development", "Performance Optimization", "Production Support"] }
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
