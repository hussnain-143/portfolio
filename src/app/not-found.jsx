'use client'
import Link from 'next/link'
import { FaHome, FaCode, FaRocket, FaSatellite, FaMicrochip } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const NotFound = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [stars, setStars] = useState([])
  const [glitchActive, setGlitchActive] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsMounted(true)
    
    const generatedStars = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2
    }))
    setStars(generatedStars)

    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
      }}
    >
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
                boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8)`,
                opacity: 0.7
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {isMounted && (
        <>
          <div className="absolute top-1/4 left-1/4 animate-spin" style={{ animationDuration: '25s' }}>
            <FaCode className="text-4xl text-purple-400/40" />
          </div>
          <div className="absolute top-1/4 right-1/4 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
            <FaRocket className="text-4xl text-cyan-400/40" />
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-spin" style={{ animationDuration: '28s' }}>
            <FaSatellite className="text-4xl text-pink-400/40" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 animate-spin" style={{ animationDuration: '32s', animationDirection: 'reverse' }}>
            <FaMicrochip className="text-4xl text-purple-400/40" />
          </div>
        </>
      )}

      <div className="relative z-10 w-full max-w-5xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-12 relative">
            <div className={`relative ${glitchActive ? 'animate-glitch' : ''}`}>
              <h1 className="text-[12rem] md:text-[16rem] font-black font-['Outfit'] leading-none tracking-tight relative">
                <span className="absolute inset-0 text-purple-600/20 blur-xl">404</span>
                <span className="relative text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text bg-[length:200%_200%] animate-gradient-shift">
                  404
                </span>
              </h1>
              
              {glitchActive && (
                <>
                  <span className="absolute inset-0 text-cyan-400/50 blur-[2px] translate-x-1">404</span>
                  <span className="absolute inset-0 text-pink-400/50 blur-[2px] -translate-x-1">404</span>
                </>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold font-['Outfit'] mb-4">
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text bg-[length:200%_200%] animate-gradient-shift">
                Lost in the Digital Void
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="mb-12 max-w-2xl mx-auto">
            <p className="text-gray-300 text-xl md:text-2xl mb-4 leading-relaxed">
              The page you seek has vanished into the{' '}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold">
                quantum realm
              </span>
            </p>
            <p className="text-gray-400 text-lg md:text-xl">
              But don't worry, even the best explorers get lost sometimes
            </p>
          </div>

          <Link
            href="/"
            className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 bg-[length:200%_200%] text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 min-w-[200px] animate-gradient-shift"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <FaHome className="group-hover:translate-x-1 transition-transform" />
              Return to Base
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-80 h-80 border-l-4 border-t-4 border-purple-500/30 rounded-br-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 border-r-4 border-b-4 border-cyan-500/30 rounded-tl-full pointer-events-none z-0"></div>
    </div>
  )
}

export default NotFound
