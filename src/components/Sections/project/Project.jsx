'use client'
import React from 'react'
import Image from 'next/image'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

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
    <section className="bg-gradient-to-br from-lime-200 via-white to-lime-200 py-15 text-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-5xl font-bold mb-20 text-lime-700">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-3xl border border-gray-200 shadow-xl hover:scale-105 transition-transform duration-300 bg-white"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex flex-col justify-between h-[270px]">
                <div>
                  <h3 className="text-xl font-semibold text-lime-600 group-hover:text-black transition">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-lime-100 border border-lime-300 px-3 py-1 rounded-full text-lime-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex justify-between pt-3 border-t border-gray-200 mt-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-600 hover:underline flex items-center gap-1 text-sm"
                  >
                    Live <FaExternalLinkAlt size={12} />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-lime-600 flex items-center gap-1 text-sm"
                  >
                    Code <FaGithub size={14} />
                  </a>
                </div>
              </div>

              {/* Subtle Glow Effect */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-lime-400 opacity-10 blur-2xl rounded-full group-hover:opacity-30 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects