'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaArrowRight, FaDownload } from 'react-icons/fa'

const Hero = () => {
  const phrases = [
    "I specialize in WordPress Development",
    "I'm a Full-Stack Web Developer",
    "I build web apps using React and Next.js",
    "I develop scalable backends with Laravel and PHP",
  ]

  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index]
    let typingSpeed = isDeleting ? 40 : 80

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
    <section className="bg-gradient-to-tl from-lime-200 via-white to-lime-200">
      <div className="container mx-auto p-6 pt-10 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">

        {/* Left Content */}
        <div className="w-full text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Hello, I'm <span className="text-lime-600">Hussnain Ahmed</span>
          </h1>

          {/* Typing Effect */}
          <p className="mt-2 text-xl md:text-2xl text-lime-700 font-semibold h-10 min-h-[2.5rem]">
            {text}
            <span className="animate-pulse">|</span>
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-lime-500 text-black font-semibold rounded-full hover:bg-black hover:text-lime-400 transition duration-300"
            >
              View Projects <FaArrowRight />
            </a>
            <a
              href="/cv/HUSSNAIN-AHMED-CV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-black text-black font-semibold rounded-full hover:bg-black hover:text-lime-400 transition duration-300"
            >
              Download CV <FaDownload />
            </a>
          </div>
        </div>

        {/* Right Side: Profile Image */}
        <div className="w-full flex justify-center">
          <div className="size-60 bg-lime-400 rounded-full shadow-2xl flex items-center justify-center overflow-hidden 
                border-4 border-white ring-4 ring-lime-500 transition-transform duration-300 hover:scale-105 
                hover:animate-none">
            <Image
              src="/profile/image.jpg"
              alt="Hussnain Ahmed"
              width={240}
              height={240}
              className="object-cover rounded-full transition-all duration-500 hover:scale-110 hover:grayscale-[20%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
