// ═══════════════════════════════════════════════════════
// DEFAULT DATA — Aurora Command Center Portfolio
// All data migrated from portfolio.js + new sections
// ═══════════════════════════════════════════════════════

const uid = () => crypto.randomUUID?.() || Math.random().toString(36).slice(2, 11);

const defaultData = {
  // ─── Profile ───
  profile: {
    name: "Hassan Bin Nisar",
    role: "MERN Stack Developer",
    roles: [
      "Full-Stack Developer",
      "MERN Stack Engineer",
      "React Specialist",
      "Node.js Developer",
      "Frontend Developer",
    ],
    tagline:
      "Building modern full-stack web applications with MERN stack and AI-assisted workflows.",
    intro:
      "I am a BSCS student at Air University Islamabad passionate about full-stack web development and modern software engineering.",
    about:
      "I focus on creating modern, scalable, and user-friendly applications using the MERN stack. I enjoy building real-world products, integrating APIs, designing responsive interfaces, and exploring AI-assisted development workflows to improve productivity and software quality.",
    location: "Islamabad, Pakistan",
    university: "Air University Islamabad",
    degree: "BSCS — Bachelor of Computer Science",
    photoUrl: "/hassan.jpg",
    resumeBase64: null,
    github: "https://github.com/Hassanx-debug",
    linkedin: "https://linkedin.com/in/hassanbinnisar",
    email: "hassanair5858@gmail.com",
    githubUsername: "Hassanx-debug",
    phone: "+92 333 590 9273",
  },

  // ─── Skills ───
  skills: [
    {
      id: uid(),
      category: "Languages",
      icon: "💻",
      color: "cyan",
      items: ["JavaScript (ES6+)", "HTML5", "CSS3"],
    },
    {
      id: uid(),
      category: "Frontend",
      icon: "⚛️",
      color: "purple",
      items: ["React.js", "Tailwind CSS", "Bootstrap"],
    },
    {
      id: uid(),
      category: "Backend",
      icon: "⚙️",
      color: "gold",
      items: ["Node.js", "Express.js", "REST APIs"],
    },
    {
      id: uid(),
      category: "Database & Auth",
      icon: "🗄️",
      color: "cyan",
      items: ["MongoDB", "Mongoose ODM", "JWT", "bcrypt"],
    },
    {
      id: uid(),
      category: "State & Tools",
      icon: "🛠️",
      color: "purple",
      items: ["React Hooks", "Context API", "Git", "GitHub", "Postman"],
    },
    {
      id: uid(),
      category: "Deployment",
      icon: "🚀",
      color: "gold",
      items: ["Vercel", "Netlify", "Render"],
    },
  ],

  // ─── Services ───
  services: [
    {
      id: uid(),
      num: "01",
      title: "Full-Stack Web Development",
      desc: "Complete web applications built from the ground up using the MERN stack. Scalable architecture, clean code, and production-ready deployments.",
    },
    {
      id: uid(),
      num: "02",
      title: "MERN Stack Applications",
      desc: "Specialized in MongoDB, Express, React, and Node.js ecosystem. Fast, modern, and fully integrated full-stack JavaScript applications.",
    },
    {
      id: uid(),
      num: "03",
      title: "REST API Integration",
      desc: "Designing and integrating RESTful APIs with proper authentication, error handling, and documentation.",
    },
    {
      id: uid(),
      num: "04",
      title: "Responsive Web Design",
      desc: "Mobile-first, pixel-perfect responsive interfaces using Tailwind CSS and Bootstrap. Optimized for all screen sizes.",
    },
    {
      id: uid(),
      num: "05",
      title: "Frontend Development",
      desc: "Performant, accessible, and visually striking frontends with React.js. Component-based architecture built for reusability.",
    },
    {
      id: uid(),
      num: "06",
      title: "AI-Assisted Development",
      desc: "Leveraging cutting-edge AI tools and workflows to accelerate development, improve code quality, and deliver better products faster.",
    },
  ],

  // ─── Career Focus ───
  careerFocus: [
    "Full-Stack Web Development",
    "MERN Stack Development",
    "REST API Integration",
    "Responsive UI/UX",
    "Backend Development",
    "AI-Assisted Product Development",
  ],

  // ─── Open To ───
  openTo: [
    {
      id: uid(),
      icon: "🚀",
      title: "Internships",
      desc: "Seeking hands-on experience with forward-thinking teams building real products.",
    },
    {
      id: uid(),
      icon: "💼",
      title: "Junior Developer Roles",
      desc: "Ready to contribute from day one with strong fundamentals and rapid learning.",
    },
    {
      id: uid(),
      icon: "🌐",
      title: "Freelance Opportunities",
      desc: "Available for project-based work. Fast delivery, clean code, real results.",
    },
    {
      id: uid(),
      icon: "📡",
      title: "Remote Work",
      desc: "Fully equipped and disciplined for remote collaboration across time zones.",
    },
  ],

  // ─── Nav Links ───
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Services", href: "#services" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],

  // ─── Projects (manual — NEW) ───
  projects: [
    {
      id: uid(),
      title: "FullCart — E-Commerce Platform",
      description: "Engineered a full-stack e-commerce app with product listings, cart, and order management, handling the complete request lifecycle from UI to database. Designed 12+ RESTful API endpoints for products, users, and orders with role-based protected routes for customers and admins.",
      techStack: ["MongoDB", "Express", "React", "Node.js", "JWT Auth", "bcrypt", "Tailwind CSS"],
      liveUrl: "",
      githubUrl: "https://github.com/Hassanx-debug/FullCart",
      thumbnail: "",
      featured: true,
      order: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      title: "DevConnect — Developer Community Platform",
      description: "Built a developer social platform with user profiles, post feeds, and nested comment threads with full CRUD per authenticated user. Delivered a fully responsive mobile-first interface with Tailwind CSS, maintaining layout integrity from 320px to 1440px.",
      techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS", "JWT Auth", "Responsive UI"],
      liveUrl: "",
      githubUrl: "https://github.com/Hassanx-debug/DevConnect",
      thumbnail: "",
      featured: true,
      order: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      title: "HireFlow — Job Board & Freelance Marketplace",
      description: "Developed a full-stack job board for employers to post roles and candidates to apply, with real-time status tracking on both sides. Built server-side search and filter by title, location, and category; modelled Mongoose schemas for Jobs, Users, and Applications.",
      techStack: ["MERN Stack", "REST API", "Bootstrap", "Role-based Access", "Job Listings"],
      liveUrl: "",
      githubUrl: "https://github.com/Hassanx-debug/HireFlow",
      thumbnail: "",
      featured: true,
      order: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      title: "QuickBite — Food Delivery App",
      description: "Created a food ordering platform with menu browsing, cart management, and order placement using React Context API for persistent global cart state. Full MERN stack implementation with seamless user experience.",
      techStack: ["React", "Express", "MongoDB", "Tailwind CSS", "Context API", "Cart System"],
      liveUrl: "",
      githubUrl: "https://github.com/Hassanx-debug/QuickBite",
      thumbnail: "",
      featured: true,
      order: 3,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      title: "TaskFlow — Task Manager Dashboard",
      description: "Built a productivity dashboard with task creation, status toggling, priority filtering, and due-date management per authenticated user. Clean and intuitive interface for personal and team task management.",
      techStack: ["React", "Node.js", "MongoDB", "REST API", "CRUD", "Auth", "Dashboard UI"],
      liveUrl: "",
      githubUrl: "https://github.com/Hassanx-debug/TaskFlow",
      thumbnail: "",
      featured: true,
      order: 4,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      title: "Portfolio Website",
      description: "A stunning dual-mode developer portfolio with admin CMS and public showcase. Features cinematic entry screen, 3D animations, and comprehensive project showcase.",
      techStack: ["React", "Three.js", "Framer Motion", "Tailwind CSS", "Admin CMS"],
      liveUrl: "",
      githubUrl: "https://github.com/Hassanx-debug/portfolio",
      thumbnail: "",
      featured: true,
      order: 5,
      createdAt: new Date().toISOString(),
    },
  ],

  // ─── Experience (NEW) ───
  experience: [
    {
      id: uid(),
      company: "Rox Capitals",
      role: "Frontend Developer Intern",
      startDate: "2025",
      endDate: "Present",
      period: "3–6 Months",
      location: "Islamabad, Pakistan",
      description:
        "Built and maintained responsive UI components with React.js and Tailwind CSS, ensuring consistent cross-device rendering. Integrated RESTful APIs using Axios to connect frontend views to live backend data, replacing manual data workflows. Refactored legacy UI into reusable React functional components with hooks, reducing code duplication across multiple pages. Coordinated with the backend team on API contracts and resolved integration bugs within active sprint cycles.",
      techUsed: ["React.js", "Tailwind CSS", "Axios", "REST APIs", "JavaScript"],
      order: 0,
    },
  ],

  // ─── Certifications (NEW) ───
  certifications: [],

  // ─── Blog (NEW) ───
  blog: [],

  // ─── Testimonials (NEW) ───
  testimonials: [],

  // ─── Theme Config ───
  theme: {
    accentCyan: "#00f5ff",
    accentPurple: "#a855f7",
    accentGold: "#f59e0b",
  },

  // ─── Analytics ───
  analytics: {
    totalVisits: 0,
    sectionViews: {},
    visitHistory: [],
    lastVisit: null,
  },
};

export default defaultData;
