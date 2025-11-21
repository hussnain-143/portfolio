'use client'
import React from 'react'
import Image from 'next/image'
import { FaExternalLinkAlt, FaGithub, FaCode } from 'react-icons/fa'

const projects = [
  {
    title: 'Rosy Garden',
    description:
      'The ultimate flower destination — a paradise for flower enthusiasts and nature lovers. Visitors can explore winding pathways and hidden corners filled with a kaleidoscope of colors and enchanting fragrances.',
    image: '/project/rosy-garden.png',
    tags: ['React', 'Next.js', 'Tailwind'],
    liveLink: 'https://rosy-garden-shop.vercel.app/',
    githubLink: 'https://github.com/hussnain-143/rosy-garden',
  },
  {
    title: 'E.Store (Ecommerce)',
    description:
      'An e-commerce platform built using Next.js and Redux, featuring a clean UI with Tailwind CSS and powerful state management for seamless shopping experiences.',
    image: '/project/E.Store.png',
    tags: ['Next.js', 'Redux', 'Tailwind'],
    liveLink: 'https://e-s-store.netlify.app/',
    githubLink: 'https://github.com/hussnain-143/e.store',
  },
  {
    title: 'Resturent',
    description:
      'A modern restaurant web app designed using React and Bootstrap, integrated with a REST API for dynamic menu and order management.',
    image: '/project/resturent.png',
    tags: ['React', 'RestApi', 'Bootstrap'],
    liveLink: 'https://restaurant-ahmed.netlify.app',
    githubLink: 'https://github.com/hussnain-143/restaurant',
  },
  {
    title: 'Finance Tracker',
    description:
      'A personal finance tracker dashboard built in React with Chart.js visualizations, allowing users to monitor income, expenses, and savings effectively.',
    image: '/project/Finance-Tracker.png',
    tags: ['React', 'Chart.js', 'Tailwind'],
    liveLink: 'https://adv-finance-tracker.netlify.app',
    githubLink: 'https://github.com/hussnain-143/finance-tracker',
  },
  {
    title: 'Eco Wrap',
    description:
      'A responsive website for an eco-friendly packaging company, built with HTML, JavaScript, and Bootstrap, focused on clean UI and informative layout.',
    image: '/project/eco-wrap.png',
    tags: ['JavaScript', 'Html', 'Bootstrap'],
    liveLink: 'https://eco-wrap.netlify.app/',
    githubLink: 'https://github.com/hussnain-143/Eco-Wrap',
  },
  {
    title: 'E.Fly (flight booking app)',
    description:
      'A flight booking web app developed with HTML, JavaScript, and Bootstrap, enabling users to search, select, and book flights in a user-friendly interface.',
    image: '/project/E.fly.png',
    tags: ['JavaScript', 'Html', 'Bootstrap'],
    liveLink: 'https://apni-flight.netlify.app/',
    githubLink: 'https://github.com/hussnain-143/flight-booking',
  },
];


const Projects = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-['Outfit'] mb-6">
          <span className="text-gradient bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Featured Projects
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Showcasing innovative solutions and creative implementations across various technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl 
                     bg-[#1a1a2e]/60 backdrop-blur-md border border-white/5
                     hover:border-purple-500/50
                     shadow-2xl shadow-purple-500/5
                     hover:shadow-purple-500/20
                     transition-all duration-500 
                     hover:-translate-y-2"
          >
            {/* Decorative Background Icon */}
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
              <FaCode className="w-54 h-54 text-white" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8 relative z-10">
              {/* Image Container */}
              <div className="w-full lg:w-1/2 relative h-64 lg:h-auto rounded-2xl overflow-hidden shadow-lg border border-white/5 group-hover:border-purple-500/30 transition-colors">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-60" />
              </div>

              {/* Content Container */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['Outfit'] flex items-center gap-3">
                    <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {project.title}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-sm px-4 py-1.5 rounded-full 
                               bg-white/5 border border-white/10
                               text-gray-300 font-medium
                               group-hover:border-purple-500/30 group-hover:text-purple-300 
                               transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
                  >
                    Live Demo 
                    <FaExternalLinkAlt size={14} />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <FaGithub size={18} />
                    Code
                  </a>
                </div>
              </div>
            </div>

            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects