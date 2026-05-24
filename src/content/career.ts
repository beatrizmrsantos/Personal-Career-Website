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
  gpa?: string;
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

// // ─── Career Points ────────────────────────────────────────────────────────────

export const careerPoints: CareerPoint[] = [
  // =========================
  // EVENTS
  // =========================
  {
    id: 1,
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
    id: 2,
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

  // =========================
  // JOBS
  // =========================
  {
    id: 3,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "job",
    icon: "💼",
    title: "Junior Software Engineer",
    company: "Opensoft",
    period: "2024 – 2025",
    description:
      "Delivered production-grade web and mobile government systems for the Embassy of the Government of Cape Verde, enabling secure citizen-facing digital services used by 50K+ users. Developed and maintained internal employee-facing systems (10K+ users) and citizen-facing tax benefit services for the Portuguese Tax and Customs Authority (18.3M+ users). Built full-stack features including authentication systems, APIs, workflow automation, and cloud-integrated services. Improved system reliability through CI/CD pipelines, automated testing, and production support, while collaborating in Agile teams with architects, QA engineers, and stakeholders.",
    tags: ["Java", "Spring Boot", "APIs", "React", "React Native", "Azure", "SQL", "Docker", "Kubernetes"],
  },
  {
    id: 5,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "job",
    icon: "💼",
    title: "Software Engineering Intern / Master Thesis",
    company: "Opensoft",
    period: "2021 – 2022 & 2023 – 2024",
    description:
      "Independently developed a secure cross-platform citizen authentication platform as part of a Master’s Thesis, covering the full SDLC from system design to deployment. Built biometric authentication, digital signatures, identity management, real-time communication as videoconferencing, and document verification systems. Developed enterprise integration systems for the Portuguese Tax and Customs Authority, including EFAPI and EORI platforms serving 250K+ users. Worked on secure APIs, authentication flows, and SQL-based systems, and improved software quality through testing, debugging, and CI/CD pipelines.",
    tags: ["Flutter", "Dart", "Java", "Spring Boot", "WebSockets", "WebRTC", "SQL"],
  },
  {
    id: 4,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "job",
    icon: "💼",
    title: "Software Project Member",
    company: "In-Nova (NOVA FCT Junior Enterprise)",
    period: "2023 – 2024",
    description:
      "Delivered multiple web and mobile software projects for external clients, covering full-stack development and end-to-end delivery. Built scalable applications with a focus on backend and frontend integration, system architecture, and cloud-based deployment. Participated in Agile workflows including sprint planning, development, and client delivery, contributing to production-ready software solutions.",
    tags: ["React", "React Native", "Node.js", "Java", "Docker", "Kubernetes", "GCP"],
  },
  {
    id: 6,
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

  // =========================
  // CERTIFICATIONS
  // =========================
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
      "Provided IT support for election systems, staff training, and system validation during deployment of digital electoral registers in Portugal.",
    tags: ["IT Support", "Systems", "Operations", "Communication"],
  },
  {
    id: 8,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "cert",
    icon: "🚀",
    title: "Spring Hackathon 23/24",
    company: "NOVA School of Science and Technology",
    period: "May 2024",
    description:
      "Designed, built, and presented a software prototype in a 48-hour hackathon, delivering a working solution in a fast-paced team environment under strict time constraints.",
    tags: ["Hackathon", "React", "UI/UX Design", "Innovation"],
  },
  {
    id: 9,
    lat: 38.7369,
    lng: -9.1387,
    city: "Lisbon, Portugal",
    type: "cert",
    icon: "🎤",
    title: "EUGAIN Final Conference",
    company: "Order of the Engineers of Portugal & EUGAIN",
    period: "Apr 2024",
    description:
      "Volunteered at an international ICT conference focused on gender balance in engineering, bringing together researchers, industry professionals, and policymakers from across Europe.",
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
      "Supported IT operations and mobile app development for a 3-day innovation event. Contributed to the development of a mobile application for event management, including features for scheduling, notifications, and attendee engagement.",
    tags: ["Communication", "Project Planning", "React", "Node.js", "Java", "SQL"],
  },
  // =========================
  // EDUCATION
  // =========================
  {
    id: 11,
    lat: 38.716,
    lng: -9.139,
    city: "Lisbon, Portugal",
    type: "education",
    icon: "🎓",
    title: "MSc Computer Science and Engineering",
    company: "NOVA School of Science and Technology",
    period: "2019 – 2024",
    description:
      "Master's degree in Computer Science and Engineering. Focus on software engineering, distributed systems and full-stack development.",
    tags: ["Software Engineering", "Systems", "Algorithms", "Distributed Systems"],
    gpa: "17/20",
  },
  {
    id: 12,
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
    gpa: "17/20",
  },
  {
    id: 13,
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

  // =========================
  // VOLUNTEER
  // =========================
  {
    id: 14,
    lat: 6.5244,
    lng: 22.2655,
    city: "Africa",
    type: "volunteer",
    icon: "🤝",
    title: "Thirst Project Portugal",
    company: "Thirst Project",
    period: "2023",
    description:
      "Contributed to the development of a mobile application supporting the coordination of 1,000+ volunteers for water-access initiatives across communities in Africa.",
    tags: ["React Native", "Client Requirement Analysis", "Mobile", "Volunteering"],
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

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  period: string;
  icon: string;
  github?: string;
  live?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Secure Government Authentication Mobile App",
    description:
      "Built a secure cross-platform authentication mobile application supporting citizen identity verification, biometric authentication, encrypted digital signatures, secure document management, and real-time video communication for government digital services.",
    tags: ["Flutter", "Dart", "Java", "Spring Boot", "WebRTC", "WebSockets", "SQL"],
    period: "2023 – 2024",
    icon: "🔐",
    // link: "",
  },

  {
    id: 2,
    title: "Embassy of Cape Verde Digital Services Platforms",
    description:
      "Maintained and developed web and mobile digital service platforms for the Embassy of the Government of Cape Verde (50K+ users), including the creation of user-facing features and ongoing platform maintenance. Built multilingual document-processing workflows using Azure cloud services, OCR technologies, and machine translation APIs.",
    tags: ["React", "React Native", "Java", "Spring Boot", "Azure", "Docker"],
    period: "2024 – 2025",
    icon: "🌍",
    link: "https://www.gov.cv/",
  },

  {
    id: 3,
    title: "Tax Benefit Management Platform",
    description:
      "Developed new features for the Tax Benefit Management Platform, a internal platform within the Portuguese Tax and Customs Authority, building both employee-facing (10K+ users) and citizen-facing (18.3M+ users) interfaces with distinct workflows and functionalities. Led the migration from a legacy system to a modern architecture using React and Spring Boot, improving maintainability, scalability, and system performance. Contributed to workflow automation, case management, and API-driven services supporting large-scale government operations.",
    tags: ["Java", "Spring Boot", "React", "SQL", "REST APIs"],
    period: "2024 – 2025",
    icon: "🏛️",
    // link: "",
  },

  {
    id: 4,
    title: "Thirst Project Portugal Mobile App",
    description:
      "Developed a mobile application supporting the coordination of 1,000+ volunteers for water-access initiatives across African communities, contributing to product planning, feature definition, and cross-platform mobile development.",
    tags: ["React", "React Native", "Mobile Development", "Product Planning", "Volunteering"],
    period: "2023",
    icon: "💧",
    link: "https://thirstproject.pt/",
  },
];

// ─── Flight Segments ──────────────────────────────────────────────────────────

export const flightSegments = [
  {
    label: "Experience",
    from: "LIS",
    to: "BRU",
    fromCity: "Lisbon",
    toCity: "Brussels",
    flightNum: "OP 2025",
    distance: "1,713 km",
    duration: "2h 40m",
    curve: 18,
  },

  {
    label: "Education",
    from: "LIS",
    to: "DRS",
    fromCity: "Lisbon",
    toCity: "Dresden",
    flightNum: "ER 2023",
    distance: "2,300 km",
    duration: "3h 30m",
    curve: 42,
  },

  {
    label: "Certifications",
    from: "LIS",
    to: "BRU",
    fromCity: "Lisbon",
    toCity: "Brussels",
    flightNum: "EU 2024",
    distance: "1,713 km",
    duration: "2h 40m",
    curve: 28,
  },

  {
    label: "Events",
    from: "LIS",
    to: "PAR",
    fromCity: "Lisbon",
    toCity: "Paris",
    flightNum: "JR 2025",
    distance: "1,453 km",
    duration: "2h 25m",
    curve: 55,
  },

  {
    label: "Volunteering",
    from: "FAO",
    to: "CPT",
    fromCity: "Faro",
    toCity: "Africa",
    flightNum: "TP 2023",
    distance: "7,200 km",
    duration: "8h 50m",
    curve: 65,
  },

  {
    label: "Projects",
    from: "LIS",
    to: "RAI",
    fromCity: "Lisbon",
    toCity: "Digital Platforms",
    flightNum: "PR 2025",
    distance: "∞",
    duration: "Always Building",
    curve: 35,
  },

  {
    label: "Skills",
    from: "LIS",
    to: "SFO",
    fromCity: "Lisbon",
    toCity: "Global Tech",
    flightNum: "FS 001",
    distance: "Unlimited",
    duration: "Continuous Learning",
    curve: 22,
  },

  {
    label: "Contact",
    from: "FAO",
    to: "LIS",
    fromCity: "Faro",
    toCity: "Lisbon",
    flightNum: "CT 101",
    distance: "278 km",
    duration: "45m",
    curve: 12,
  },
];
