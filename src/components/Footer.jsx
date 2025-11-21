import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0f] text-gray-200 py-12 mt-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Left: Branding */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold font-['Outfit'] text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Hussnain Ahmed
            </h3>
            <p className="text-sm text-gray-500 mt-1">Full-Stack Developer</p>
          </div>

          {/* Middle: Quick Links */}
          <div className="flex gap-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
              About
            </Link>
            <Link href="/skills" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Skills
            </Link>
            <Link href="/projects" className="text-gray-400 hover:text-purple-400 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right: Social Icons */}
          <div className="flex gap-4">
            <a 
              href="https://github.com/hussnain-143" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a 
              href="https://www.linkedin.com/in/hussnain-ahmed143/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a 
              href="mailto:hussnainahmed143ha@gmail.com" 
              className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110"
            >
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/5 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Hussnain Ahmed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
