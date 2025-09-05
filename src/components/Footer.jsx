import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-lime-400 text-black py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left: Branding */}
        <div>
          <Image src="/logo.svg" alt="Logo" width={70} height={30} />
        </div>

        {/* Middle: Links */}
        <div className="flex gap-6 text-sm font-medium mb-4 md:mb-0">
          <Link href="/" className="hover:underline hover:text-lime-700">Home</Link>
          <Link href="/about" className="hover:underline hover:text-lime-700">About</Link>
          <Link href="/projects" className="hover:underline hover:text-lime-700">Projects</Link>
          <Link href="/contact" className="hover:underline hover:text-lime-700">Contact</Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 text-2xl">
          <a href="https://github.com/hussnain-143" target="_blank" rel="noopener noreferrer" className="hover:text-black/70">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/hussnain-ahmed143/" target="_blank" rel="noopener noreferrer" className="hover:text-black/70">
            <FaLinkedin />
          </a>
          <a href="mailto:hussnainahmed143ha@gmail.com" className="hover:text-black/70">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 text-center text-sm text-black/80">
        &copy; {new Date().getFullYear()} Hussnain Ahmed. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
