'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaArrowRight, FaDownload } from 'react-icons/fa'

const Hero = () => {
  const phrases = [
    "I specialize in WordPress Development",
    "I'm a Full-Stack Web Developer",
    "I build web apps using React and Next.js",
    "I develop scalable backends with Node.js and PHP",
  ]

  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index]
    const typingSpeed = isDeleting ? 40 : 80

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
      )

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % phrases.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, index])

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-['Outfit']">
              Hello, I'm{' '}
              <span className="text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                Hussnain Ahmed
              </span>
            </h1>

            <div className="h-16 md:h-20 flex items-center justify-center md:justify-start">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300">
                {text}
                <span className="inline-block w-1 h-6 md:h-8 ml-1 bg-gradient-to-b from-purple-400 to-cyan-400 animate-pulse" />
              </p>
            </div>

            <p className="text-lg text-gray-400 max-w-2xl">
              Passionate full-stack developer crafting beautiful, scalable web experiences with modern technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4 group/hero">
              <a
                href="/projects"
                className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-4 
                         bg-gradient-to-r from-purple-600 to-cyan-500 
                         text-white font-semibold rounded-full 
                         overflow-hidden transition-all duration-300
                         hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              >
                <span className="relative z-10">View Projects</span>
                <FaArrowRight className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600 transition-opacity opacity-0 group-hover/btn:opacity-100" />
              </a>
              <a
                href="/cv/HUSSNAIN-AHMED-CV.pdf"
                download
                className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-4 
                         border-2 border-purple-500/50 text-gray-200 font-semibold rounded-full 
                         overflow-hidden transition-all duration-300
                         hover:scale-105 hover:border-purple-400 hover:text-white
                         hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                <span className="relative z-10">Download CV</span>
                <FaDownload className="relative z-10 transition-transform group-hover/btn:translate-y-1" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full 
                            border-4 border-purple-500/30 
                            shadow-[0_0_50px_rgba(139,92,246,0.3)]
                            overflow-hidden
                            animate-float
                            transition-transform duration-500
                            hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20" />
                <Image
                  src="/profile/image.jpg"
                  alt="Hussnain Ahmed"
                  fill
                  className="object-cover transition-all duration-500 hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
