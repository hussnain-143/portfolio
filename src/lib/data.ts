import { connectToDatabase } from './db';
import { Project, IProject } from '../models/Project';
import { Profile, IProfile } from '../models/Profile';
import { Skill, ISkill } from '../models/Skill';
import { Experience, IExperience } from '../models/Experience';
import { Education, IEducation } from '../models/Education';
import { SiteSettings, ISiteSettings } from '../models/SiteSettings';
import { OpenSource, IOpenSource } from '../models/OpenSource';

// Fallback verified data for resilience when database is connecting or offline
const fallbackProfile = {
  name: 'Hussnain Ahmed',
  headline: 'Full-Stack Developer & Next.js Specialist',
  title: 'Full-Stack Web Developer',
  shortBio:
    'Passionate MERN and Full-Stack developer crafting beautiful, scalable web experiences with modern technologies.',
  fullBio: [
    "Hello! I'm Hussnain Ahmed, a dedicated MERN & Full-Stack Developer with expertise in building fast, scalable, and user-centric web applications. I specialize in modern technologies like React, Next.js, Node.js, and WordPress.",
    'With a comprehensive background in frontend and backend development, I focus on writing high-quality, maintainable code and designing seamless user interfaces. My experience spans from custom e-commerce platforms to sophisticated admin dashboards.',
    'I am a continuous learner, constantly exploring new industry standards to deliver cutting-edge solutions. Whether working independently or as part of a team, I bring a proactive approach and a strong commitment to excellence.',
    'Outside of work, I enjoy tech meetups, mentoring juniors, and contributing to open source or personal projects.',
  ],
  email: 'hussnain.ahmed.dev@gmail.com',
  phone: '+92 340 6999701',
  location: 'Islamabad, Pakistan',
  avatarUrl: '/profile/image.jpg',
  resumeUrl: '/cv/HUSSNAIN-AHMED-CV.pdf',
  githubUrl: 'https://github.com/hussnain-143',
  linkedinUrl: 'https://www.linkedin.com/in/hussnain-ahmed143/',
  twitterUrl: '',
  availabilityStatus: 'available',
  availabilityNote: 'Available for freelance, remote, and full-time opportunities',
  yearsOfExperience: 2,
  completedProjectsCount: 6,
  rotatingPhrases: [
    'Full-Stack Web Developer',
    'Next.js & React Specialist',
    'Scalable Node.js Backends',
    'Custom WordPress Engineer',
  ],
  highlights: [
    { title: '24/7 Availability', desc: 'Always here to help — even outside working hours.', icon: 'clock' },
    { title: 'Clean Code', desc: 'Well-structured, readable and maintainable code.', icon: 'code' },
    { title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality.', icon: 'rocket' },
    { title: 'Responsive Design', desc: 'Pixel-perfect designs on all screen sizes.', icon: 'mobile' },
  ],
};

const fallbackProjects = [
  {
    _id: 'p1',
    title: 'Rosy Garden',
    slug: 'rosy-garden',
    shortDescription:
      'The ultimate flower destination — a paradise for flower enthusiasts and nature lovers. Explore pathways and floral arrangements.',
    detailedDescription:
      'A full-featured flower boutique and floral arrangements web application featuring interactive catalog browsing, dynamic product layouts, responsive design, and smooth user interactions.',
    coverImage: '/project/rosy-garden.png',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
    category: 'E-commerce',
    projectStatus: 'completed',
    isFeatured: true,
    displayOrder: 1,
    liveUrl: 'https://rosy-garden-shop.vercel.app/',
    githubUrl: 'https://github.com/hussnain-143/rosy-garden',
    isPublished: true,
    caseStudyContent: {
      overview: 'Developed a high-performance flower destination shop front for floral enthusiasts.',
      challenges: 'Ensuring fast image loading for high-resolution floral galleries while maintaining aesthetic appeal.',
      solutions: 'Leveraged Next.js Image optimization, modern Tailwind responsive grids, and subtle micro-animations.',
      keyFeatures: ['Interactive Floral Catalog', 'Responsive Product Showcases', 'Fast Next.js Routing'],
      architecture: 'Next.js App Router, Tailwind CSS, Vercel Edge Hosting.',
    },
  },
  {
    _id: 'p2',
    title: 'E.Store (Ecommerce)',
    slug: 'e-store',
    shortDescription:
      'An e-commerce platform built using Next.js and Redux, featuring a clean UI with Tailwind CSS and powerful state management.',
    detailedDescription:
      'Modern online storefront with shopping cart persistence, category browsing, product filtering, and streamlined checkout experience.',
    coverImage: '/project/E.Store.png',
    tags: ['Next.js', 'Redux', 'Tailwind CSS'],
    category: 'E-commerce',
    projectStatus: 'completed',
    isFeatured: true,
    displayOrder: 2,
    liveUrl: 'https://e-s-store.netlify.app/',
    githubUrl: 'https://github.com/hussnain-143/e.store',
    isPublished: true,
    caseStudyContent: {
      overview: 'Complete e-commerce store with synchronized global state and performant product filtering.',
      challenges: 'Managing client-side cart synchronization and responsive UI across viewports.',
      solutions: 'Integrated Redux Toolkit for clean state flow and Tailwind CSS for rapid layout styling.',
      keyFeatures: ['Global Cart Management', 'Product Category Filters', 'Search & Responsive Layouts'],
      architecture: 'Next.js, Redux Toolkit, Tailwind CSS.',
    },
  },
  {
    _id: 'p3',
    title: 'Resturent',
    slug: 'restaurant-app',
    shortDescription:
      'A modern restaurant web app designed using React and Bootstrap, integrated with a REST API for dynamic menu and order management.',
    detailedDescription:
      'Interactive dining and reservation portal with dynamic menu categories, pricing tables, and online order booking workflow.',
    coverImage: '/project/resturent.png',
    tags: ['React', 'REST API', 'Bootstrap'],
    category: 'Web App',
    projectStatus: 'completed',
    isFeatured: true,
    displayOrder: 3,
    liveUrl: 'https://restaurant-ahmed.netlify.app',
    githubUrl: 'https://github.com/hussnain-143/restaurant',
    isPublished: true,
    caseStudyContent: {
      overview: 'Dynamic restaurant web app integrated with real-time REST API menu management.',
      challenges: 'Handling real-time item status and dynamic table bookings.',
      solutions: 'RESTful API integration with asynchronous React query handling.',
      keyFeatures: ['Live Menu Catalog', 'Online Table Reservation', 'Dish Categorization'],
      architecture: 'React.js, REST API endpoints, Bootstrap UI.',
    },
  },
  {
    _id: 'p4',
    title: 'Finance Tracker',
    slug: 'finance-tracker',
    shortDescription:
      'A personal finance tracker dashboard built in React with Chart.js visualizations, allowing users to monitor income, expenses, and savings.',
    detailedDescription:
      'Analytical financial dashboard with visual analytics, budget tracking, transaction categorization, and trend visualization.',
    coverImage: '/project/Finance-Tracker.png',
    tags: ['React', 'Chart.js', 'Tailwind CSS'],
    category: 'Dashboard',
    projectStatus: 'completed',
    isFeatured: true,
    displayOrder: 4,
    liveUrl: 'https://adv-finance-tracker.netlify.app',
    githubUrl: 'https://github.com/hussnain-143/finance-tracker',
    isPublished: true,
    caseStudyContent: {
      overview: 'Comprehensive analytical dashboard for personal finance visualization.',
      challenges: 'Translating raw numerical transaction data into clear, interactive visual charts.',
      solutions: 'Implemented Chart.js with custom color schemes and Tailwind layout wrappers.',
      keyFeatures: ['Income vs Expense Visualization', 'Monthly Trend Charts', 'Transaction Categorization'],
      architecture: 'React, Chart.js, Tailwind CSS.',
    },
  },
  {
    _id: 'p5',
    title: 'Eco Wrap',
    slug: 'eco-wrap',
    shortDescription:
      'A responsive website for an eco-friendly packaging company focused on clean UI and informative product layouts.',
    detailedDescription:
      'Sustainable packaging presentation site featuring eco-friendly product lineups, brand story, and corporate inquiry workflows.',
    coverImage: '/project/eco-wrap.png',
    tags: ['JavaScript', 'HTML5', 'Bootstrap'],
    category: 'Corporate',
    projectStatus: 'completed',
    isFeatured: false,
    displayOrder: 5,
    liveUrl: 'https://eco-wrap.netlify.app/',
    githubUrl: 'https://github.com/hussnain-143/Eco-Wrap',
    isPublished: true,
  },
  {
    _id: 'p6',
    title: 'E.Fly (Flight Booking App)',
    slug: 'e-fly-flight-booking',
    shortDescription:
      'A flight booking web app enabling users to search, select, and book flights through an intuitive user-friendly interface.',
    detailedDescription:
      'Flight reservation interface supporting multi-city flight search, seat selection previews, and passenger booking confirmations.',
    coverImage: '/project/E.fly.png',
    tags: ['JavaScript', 'HTML5', 'Bootstrap'],
    category: 'Web App',
    projectStatus: 'completed',
    isFeatured: false,
    displayOrder: 6,
    liveUrl: 'https://apni-flight.netlify.app/',
    githubUrl: 'https://github.com/hussnain-143/flight-booking',
    isPublished: true,
  },
];

const fallbackSkills = [
  { _id: 's1', category: 'Frontend', name: 'React / Next.js', level: 'Expert', displayOrder: 1, isFeatured: true },
  { _id: 's2', category: 'Frontend', name: 'TypeScript', level: 'Advanced', displayOrder: 2, isFeatured: true },
  { _id: 's3', category: 'Frontend', name: 'JavaScript (ES6+)', level: 'Expert', displayOrder: 3, isFeatured: true },
  { _id: 's4', category: 'Frontend', name: 'Tailwind CSS / CSS3', level: 'Expert', displayOrder: 4, isFeatured: true },
  { _id: 's5', category: 'Frontend', name: 'HTML5 Semantic', level: 'Expert', displayOrder: 5, isFeatured: true },
  { _id: 's6', category: 'Backend', name: 'Node.js / Express', level: 'Advanced', displayOrder: 6, isFeatured: true },
  { _id: 's7', category: 'Backend', name: 'PHP / Laravel', level: 'Advanced', displayOrder: 7, isFeatured: true },
  { _id: 's8', category: 'Backend', name: 'MongoDB / Redis', level: 'Advanced', displayOrder: 8, isFeatured: true },
  { _id: 's9', category: 'Backend', name: 'PostgreSQL / SQL', level: 'Intermediate', displayOrder: 9, isFeatured: true },
  { _id: 's10', category: 'Backend', name: 'REST APIs & Webhooks', level: 'Advanced', displayOrder: 10, isFeatured: true },
  { _id: 's11', category: 'Specializations', name: 'MERN Stack Development', level: 'Advanced', displayOrder: 11, isFeatured: true },
  { _id: 's12', category: 'Specializations', name: 'Custom WordPress Dev', level: 'Advanced', displayOrder: 12, isFeatured: true },
  { _id: 's13', category: 'Specializations', name: 'WordPress Plugin Dev', level: 'Intermediate', displayOrder: 13, isFeatured: true },
  { _id: 's14', category: 'Specializations', name: 'E-commerce Solutions', level: 'Advanced', displayOrder: 14, isFeatured: true },
  { _id: 's15', category: 'Specializations', name: 'Web Performance Optimization', level: 'Intermediate', displayOrder: 15, isFeatured: true },
  { _id: 's16', category: 'Tools & Workflow', name: 'Git / GitHub', level: 'Advanced', displayOrder: 16, isFeatured: true },
  { _id: 's17', category: 'Tools & Workflow', name: 'Docker / CI/CD', level: 'Intermediate', displayOrder: 17, isFeatured: true },
  { _id: 's18', category: 'Tools & Workflow', name: 'Vercel / Netlify Deployments', level: 'Advanced', displayOrder: 18, isFeatured: true },
  { _id: 's19', category: 'Tools & Workflow', name: 'Figma to Pixel-Perfect Code', level: 'Expert', displayOrder: 19, isFeatured: true },
  { _id: 's20', category: 'Tools & Workflow', name: 'Agile & Pair Programming', level: 'Advanced', displayOrder: 20, isFeatured: true },
];

const fallbackExperience = [
  {
    _id: 'e1',
    role: 'Full-Stack Developer',
    company: 'Poxito',
    location: 'Islamabad, Pakistan',
    period: 'Aug 2025 - Present',
    isCurrent: true,
    description:
      'Developed and maintained production web applications using Next.js, React, Node.js, and Tailwind CSS. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    skills: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'WordPress'],
    displayOrder: 1,
  },
  {
    _id: 'e2',
    role: 'WordPress Developer',
    company: 'LDNinjas',
    location: 'Remote',
    period: 'Jun 2025 - Aug 2025',
    isCurrent: false,
    description:
      'Developed custom plugins, enhanced features, and built admin dashboards for various client projects.',
    skills: ['WordPress', 'PHP', 'Plugin Dev', 'Admin Dashboards'],
    displayOrder: 2,
  },
  {
    _id: 'e3',
    role: 'Frontend Developer Intern',
    company: 'Stech.ai',
    location: 'Islamabad',
    period: 'Aug 2022 - Sep 2022',
    isCurrent: false,
    description:
      'Created responsive websites using HTML, CSS, JavaScript, and WordPress with Elementor and custom themes.',
    skills: ['HTML/CSS', 'JavaScript', 'WordPress', 'Elementor'],
    displayOrder: 3,
  },
];

const fallbackEducation = [
  {
    _id: 'ed1',
    degree: 'BS in Computer Science',
    school: 'Abbottabad University',
    period: '2020 - 2024',
    description:
      'Focused on software engineering, algorithms, data structures, and web technologies. Graduated with honors.',
    isCertificate: false,
    displayOrder: 1,
  },
  {
    _id: 'ed2',
    degree: 'Intermediate in Pre-Medical Science',
    school: 'Post Graduate College No. 1, Abbottabad',
    period: '2018 - 2020',
    description:
      'Completed intermediate studies with a focus on science and foundational analytical knowledge.',
    isCertificate: false,
    displayOrder: 2,
  },
  {
    _id: 'ed3',
    degree: 'Hackathon Winner 2024',
    school: 'Tech Innovation Summit',
    issuer: 'Tech Innovation Summit',
    period: '2024',
    certificateImage: '/certificates/hakathon.jpg',
    isCertificate: true,
    displayOrder: 3,
  },
  {
    _id: 'ed4',
    degree: 'Achievement Award 2023',
    school: 'Best Performance Recognition',
    issuer: 'Best Performance',
    period: '2023',
    certificateImage: '/certificates/Achievement.png',
    isCertificate: true,
    displayOrder: 4,
  },
  {
    _id: 'ed5',
    degree: 'Participation Certificate 2023',
    school: 'WordCamp Lahore Participation',
    issuer: 'WordCamp Lahore',
    period: '2023',
    certificateImage: '/certificates/PARTICIPATION.png',
    isCertificate: true,
    displayOrder: 5,
  },
];

const fallbackOpenSource = [
  {
    _id: 'os1',
    title: 'Developer Portfolio & Admin Console',
    slug: 'portfolio-admin-console',
    repoName: 'hussnain-143/portfolio',
    description:
      'High-performance full-stack portfolio with custom dark-mode admin CMS, real-time message inbox, dynamic project manager, and SEO optimizations.',
    githubUrl: 'https://github.com/hussnain-143/portfolio',
    liveUrl: 'https://h-a-portfolio.netlify.app',
    role: 'Author',
    stars: 28,
    forks: 7,
    language: 'TypeScript',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'MongoDB', 'Mongoose'],
    isFeatured: true,
    isPublished: true,
    displayOrder: 1,
    highlights: [
      'Next.js 16 App Router architecture',
      'JWT role-based admin authentication & CRUD',
      'Full responsive UI with custom micro-animations',
    ],
  },
  {
    _id: 'os2',
    title: 'Rosy Garden — E-Commerce Storefront',
    slug: 'rosy-garden-ecommerce',
    repoName: 'hussnain-143/rosy-garden',
    description:
      'Curated floral arrangement boutique web application featuring interactive catalog browsing, dynamic product layouts, and smooth cart flows.',
    githubUrl: 'https://github.com/hussnain-143/rosy-garden',
    liveUrl: 'https://rosy-garden-shop.vercel.app/',
    role: 'Author',
    stars: 18,
    forks: 4,
    language: 'JavaScript',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    isFeatured: true,
    isPublished: true,
    displayOrder: 2,
    highlights: [
      'Next.js image optimization for high-res galleries',
      'Fluid mobile-first shopping experience',
    ],
  },
  {
    _id: 'os3',
    title: 'Advanced Personal Finance Tracker',
    slug: 'advanced-finance-tracker',
    repoName: 'hussnain-143/finance-tracker',
    description:
      'Analytical financial dashboard with visual analytics, budget tracking, transaction categorization, and trend visualization using Chart.js.',
    githubUrl: 'https://github.com/hussnain-143/finance-tracker',
    liveUrl: 'https://adv-finance-tracker.netlify.app',
    role: 'Author',
    stars: 15,
    forks: 3,
    language: 'JavaScript',
    tags: ['React', 'Chart.js', 'Tailwind CSS', 'REST API'],
    isFeatured: true,
    isPublished: true,
    displayOrder: 3,
    highlights: [
      'Interactive Chart.js visualizations for income and expenses',
      'Real-time cashflow breakdowns and savings tracker',
    ],
  },
  {
    _id: 'os4',
    title: 'E-Store — Redux Toolkit Online Store',
    slug: 'e-store-redux',
    repoName: 'hussnain-143/e.store',
    description:
      'Modern online storefront with shopping cart persistence, category browsing, product filtering, and streamlined checkout experience.',
    githubUrl: 'https://github.com/hussnain-143/e.store',
    liveUrl: 'https://e-s-store.netlify.app/',
    role: 'Author',
    stars: 12,
    forks: 2,
    language: 'TypeScript',
    tags: ['Next.js', 'Redux Toolkit', 'Tailwind CSS'],
    isFeatured: false,
    isPublished: true,
    displayOrder: 4,
    highlights: [
      'Redux Toolkit state management with cart persistence',
      'Filter by category, rating, and price spectrum',
    ],
  },
];

export async function getProfileData() {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const profile = await Profile.findOne().lean();
      if (profile) return JSON.parse(JSON.stringify(profile));
    }
  } catch (err) {
    console.error('Error fetching profile from MongoDB, using fallback:', err);
  }
  return fallbackProfile;
}

export async function getPublishedProjects() {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const projects = await Project.find({ isPublished: true })
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();
      if (projects && projects.length > 0) return JSON.parse(JSON.stringify(projects));
    }
  } catch (err) {
    console.error('Error fetching projects from MongoDB, using fallback:', err);
  }
  return fallbackProjects;
}

export async function getProjectBySlug(slug: string) {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const project = await Project.findOne({ slug, isPublished: true }).lean();
      if (project) return JSON.parse(JSON.stringify(project));
    }
  } catch (err) {
    console.error('Error fetching project by slug from MongoDB:', err);
  }
  const match = fallbackProjects.find((p) => p.slug === slug);
  return match || null;
}

export async function getSkillsData() {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const skills = await Skill.find().sort({ displayOrder: 1, name: 1 }).lean();
      if (skills && skills.length > 0) return JSON.parse(JSON.stringify(skills));
    }
  } catch (err) {
    console.error('Error fetching skills from MongoDB, using fallback:', err);
  }
  return fallbackSkills;
}

export async function getExperienceData() {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const exp = await Experience.find().sort({ displayOrder: 1 }).lean();
      if (exp && exp.length > 0) return JSON.parse(JSON.stringify(exp));
    }
  } catch (err) {
    console.error('Error fetching experience from MongoDB, using fallback:', err);
  }
  return fallbackExperience;
}

export async function getEducationData() {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const edu = await Education.find().sort({ displayOrder: 1 }).lean();
      if (edu && edu.length > 0) return JSON.parse(JSON.stringify(edu));
    }
  } catch (err) {
    console.error('Error fetching education from MongoDB, using fallback:', err);
  }
  return fallbackEducation;
}

export async function getSiteSettingsData() {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const settings = await SiteSettings.findOne().lean();
      if (settings) return JSON.parse(JSON.stringify(settings));
    }
  } catch (err) {
    console.error('Error fetching site settings from MongoDB:', err);
  }
  return {
    siteName: 'Hussnain Ahmed — Full-Stack Developer',
    siteUrl: 'https://h-a-portfolio.netlify.app',
    defaultSeoTitle: 'Hussnain Ahmed - Full Stack Developer | Next.js & React Specialist',
    defaultSeoDescription:
      'Portfolio of Hussnain Ahmed: Full-Stack Developer specializing in React, Next.js, Node.js, and WordPress. Explore projects, technical skills, and case studies.',
    ogImageUrl: '/profile/image.jpg',
    footerText: '© ' + new Date().getFullYear() + ' Hussnain Ahmed. All rights reserved.',
    showClock: true,
    showAvailabilityBadge: true,
  };
}

export async function getOpenSourceData() {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const repos = await OpenSource.find({ isPublished: true })
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();
      if (repos && repos.length > 0) return JSON.parse(JSON.stringify(repos));
    }
  } catch (err) {
    console.error('Error fetching open source repos from MongoDB, using fallback:', err);
  }
  return fallbackOpenSource;
}

export async function getFeaturedOpenSourceData() {
  const all = await getOpenSourceData();
  const featured = all.filter((r: any) => r.isFeatured);
  return featured.length > 0 ? featured : all.slice(0, 3);
}
