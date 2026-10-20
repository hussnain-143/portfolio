import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { AdminUser } from '../models/AdminUser';
import { Profile } from '../models/Profile';
import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { Experience } from '../models/Experience';
import { Education } from '../models/Education';
import { SiteSettings } from '../models/SiteSettings';
import { OpenSource } from '../models/OpenSource';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export async function seedDatabase() {
  if (!MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI not found. Skipping database seed.');
    return;
  }

  console.log('Connecting to MongoDB for seeding...');
  await mongoose.connect(MONGODB_URI);
  console.log('✓ Connected to MongoDB');

  // 1. Seed / Upsert Profile
  console.log('Seeding Profile...');
  await Profile.findOneAndUpdate(
    {},
    {
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
        {
          title: '24/7 Availability',
          desc: 'Always here to help — even outside standard working hours.',
          icon: 'clock',
        },
        {
          title: 'Clean Code',
          desc: 'Well-structured, readable, typed and maintainable architecture.',
          icon: 'code',
        },
        {
          title: 'Fast Delivery',
          desc: 'Rapid execution without compromising security or polish.',
          icon: 'rocket',
        },
        {
          title: 'Responsive Design',
          desc: 'Pixel-perfect, fluid experiences on all screen sizes.',
          icon: 'mobile',
        },
      ],
    },
    { upsert: true, new: true }
  );

  // 2. Seed Projects (Real verified portfolio projects)
  console.log('Seeding Projects...');
  const initialProjects = [
    {
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

  for (const p of initialProjects) {
    await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
  }

  // 3. Seed Skills
  console.log('Seeding Skills...');
  const skillsData = [
    // Frontend
    { category: 'Frontend', name: 'React / Next.js', level: 'Expert', displayOrder: 1, isFeatured: true },
    { category: 'Frontend', name: 'TypeScript', level: 'Advanced', displayOrder: 2, isFeatured: true },
    { category: 'Frontend', name: 'JavaScript (ES6+)', level: 'Expert', displayOrder: 3, isFeatured: true },
    { category: 'Frontend', name: 'Tailwind CSS / CSS3', level: 'Expert', displayOrder: 4, isFeatured: true },
    { category: 'Frontend', name: 'HTML5 Semantic', level: 'Expert', displayOrder: 5, isFeatured: true },
    // Backend
    { category: 'Backend', name: 'Node.js / Express', level: 'Advanced', displayOrder: 6, isFeatured: true },
    { category: 'Backend', name: 'PHP / Laravel', level: 'Advanced', displayOrder: 7, isFeatured: true },
    { category: 'Backend', name: 'MongoDB / Redis', level: 'Advanced', displayOrder: 8, isFeatured: true },
    { category: 'Backend', name: 'PostgreSQL / SQL', level: 'Intermediate', displayOrder: 9, isFeatured: true },
    { category: 'Backend', name: 'REST APIs & Webhooks', level: 'Advanced', displayOrder: 10, isFeatured: true },
    // Specializations
    { category: 'Specializations', name: 'MERN Stack Development', level: 'Advanced', displayOrder: 11, isFeatured: true },
    { category: 'Specializations', name: 'Custom WordPress Dev', level: 'Advanced', displayOrder: 12, isFeatured: true },
    { category: 'Specializations', name: 'WordPress Plugin Dev', level: 'Intermediate', displayOrder: 13, isFeatured: true },
    { category: 'Specializations', name: 'E-commerce Solutions', level: 'Advanced', displayOrder: 14, isFeatured: true },
    { category: 'Specializations', name: 'Web Performance Optimization', level: 'Intermediate', displayOrder: 15, isFeatured: true },
    // Tools & Workflow
    { category: 'Tools & Workflow', name: 'Git / GitHub', level: 'Advanced', displayOrder: 16, isFeatured: true },
    { category: 'Tools & Workflow', name: 'Docker / CI/CD', level: 'Intermediate', displayOrder: 17, isFeatured: true },
    { category: 'Tools & Workflow', name: 'Vercel / Netlify Deployments', level: 'Advanced', displayOrder: 18, isFeatured: true },
    { category: 'Tools & Workflow', name: 'Figma to Pixel-Perfect Code', level: 'Expert', displayOrder: 19, isFeatured: true },
    { category: 'Tools & Workflow', name: 'Agile & Pair Programming', level: 'Advanced', displayOrder: 20, isFeatured: true },
  ];

  for (const s of skillsData) {
    await Skill.findOneAndUpdate({ name: s.name }, s, { upsert: true, new: true });
  }

  // 4. Seed Experience
  console.log('Seeding Experience...');
  const experienceData = [
    {
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

  for (const exp of experienceData) {
    await Experience.findOneAndUpdate({ company: exp.company, role: exp.role }, exp, {
      upsert: true,
      new: true,
    });
  }

  // 5. Seed Education & Certifications
  console.log('Seeding Education & Certifications...');
  const educationData = [
    {
      degree: 'BS in Computer Science',
      school: 'Abbottabad University',
      period: '2020 - 2024',
      description: 'Focused on software engineering, algorithms, data structures, and web technologies. Graduated with honors.',
      isCertificate: false,
      displayOrder: 1,
    },
    {
      degree: 'Intermediate in Pre-Medical Science',
      school: 'Post Graduate College No. 1, Abbottabad',
      period: '2018 - 2020',
      description: 'Completed intermediate studies with a focus on science and foundational analytical knowledge.',
      isCertificate: false,
      displayOrder: 2,
    },
    {
      degree: 'Hackathon Winner 2024',
      school: 'Tech Innovation Summit',
      issuer: 'Tech Innovation Summit',
      period: '2024',
      certificateImage: '/certificates/hakathon.jpg',
      isCertificate: true,
      displayOrder: 3,
    },
    {
      degree: 'Achievement Award 2023',
      school: 'Best Performance Recognition',
      issuer: 'Best Performance',
      period: '2023',
      certificateImage: '/certificates/Achievement.png',
      isCertificate: true,
      displayOrder: 4,
    },
    {
      degree: 'Participation Certificate 2023',
      school: 'WordCamp Lahore Participation',
      issuer: 'WordCamp Lahore',
      period: '2023',
      certificateImage: '/certificates/PARTICIPATION.png',
      isCertificate: true,
      displayOrder: 5,
    },
  ];

  for (const edu of educationData) {
    await Education.findOneAndUpdate({ degree: edu.degree, school: edu.school }, edu, {
      upsert: true,
      new: true,
    });
  }

  // 6. Seed SiteSettings
  console.log('Seeding SiteSettings...');
  await SiteSettings.findOneAndUpdate(
    {},
    {
      siteName: 'Hussnain Ahmed — Full-Stack Developer',
      siteUrl: 'https://h-a-portfolio.netlify.app',
      defaultSeoTitle: 'Hussnain Ahmed - Full Stack Developer | Next.js & React Specialist',
      defaultSeoDescription:
        'Portfolio of Hussnain Ahmed: Full-Stack Developer specializing in React, Next.js, Node.js, and WordPress. Explore projects, technical skills, and case studies.',
      ogImageUrl: '/profile/image.jpg',
      footerText: '© ' + new Date().getFullYear() + ' Hussnain Ahmed. All rights reserved.',
      showClock: true,
      showAvailabilityBadge: true,
      emailNotificationsEnabled: false,
      notificationEmail: 'hussnain.ahmed.dev@gmail.com',
      navLinks: [
        { label: 'Home', path: '/', icon: 'home' },
        { label: 'About', path: '/about', icon: 'user' },
        { label: 'Projects', path: '/projects', icon: 'folder' },
        { label: 'Experience', path: '/experience', icon: 'briefcase' },
        { label: 'Skills', path: '/skills', icon: 'cpu' },
        { label: 'Open Source', path: '/opensource', icon: 'code' },
        { label: 'Contact', path: '/contact', icon: 'mail' },
      ],
    },
    { upsert: true, new: true }
  );

  // 7. Seed Open Source Repositories
  console.log('Seeding Open Source Projects...');
  const initialOpenSource = [
    {
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

  for (const item of initialOpenSource) {
    await OpenSource.findOneAndUpdate({ slug: item.slug }, item, {
      upsert: true,
      new: true,
    });
  }
  console.log(`✓ Seeded ${initialOpenSource.length} Open Source repositories`);

  // 8. Seed Default Admin if credentials provided
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@hussnain.dev').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';
  const existingAdmin = await AdminUser.findOne({ email: adminEmail });
  if (!existingAdmin) {
    console.log(`Provisioning default administrator account (${adminEmail})...`);
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await AdminUser.create({
      email: adminEmail,
      passwordHash,
      name: 'Hussnain Ahmed (Admin)',
      role: 'superadmin',
    });
    console.log('✓ Administrator account provisioned');
  }

  console.log('✓ Database seeding completed successfully.');
}

seedDatabase()
  .then(async () => {
    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB. Seeding finished.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
