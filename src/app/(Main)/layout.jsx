'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import Clock from '@/components/Clock'
import StructuredData from '@/components/StructuredData'
import { FaMicrochip, FaSatellite, FaRocket, FaCog, FaStar } from 'react-icons/fa'

export default function Layout({ children }) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [stars, setStars] = useState([])
  const [icons, setIcons] = useState([])

  useEffect(() => {
    setIsMounted(true)
    
    const generatedStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2
    }))
    setStars(generatedStars)

    const iconTypes = [FaMicrochip, FaSatellite, FaRocket, FaCog, FaStar]
    const generatedIcons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      Icon: iconTypes[Math.floor(Math.random() * iconTypes.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 4,
      size: Math.random() * 0.8 + 1.2
    }))
    setIcons(generatedIcons)
  }, [])
  
  const getPageType = () => {
    if (pathname === '/') return 'home'
    if (pathname === '/about') return 'about'
    if (pathname === '/projects') return 'projects'
    if (pathname === '/skills') return 'skills'
    if (pathname === '/contact') return 'contact'
    return 'home'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex relative overflow-hidden">
      <StructuredData type={getPageType()} />
      
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
                boxShadow: `0 0 ${star.size * 4}px rgba(255, 255, 255, 1), 0 0 ${star.size * 8}px rgba(139, 92, 246, 0.5)`,
                opacity: 0.8
              }}
            />
          ))}
        </div>
      )}

      {isMounted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {icons.map((icon) => {
            const IconComponent = icon.Icon
            const isPurple = Math.random() > 0.5
            return (
              <div
                key={icon.id}
                className="absolute"
                style={{
                  left: `${icon.left}%`,
                  top: `${icon.top}%`,
                  animation: `float ${icon.duration}s ease-in-out infinite`,
                  animationDelay: `${icon.delay}s`,
                  transform: `scale(${icon.size})`
                }}
              >
                <IconComponent 
                  className={`text-3xl ${isPurple ? 'text-purple-400/60' : 'text-cyan-400/60'} drop-shadow-lg`}
                  style={{
                    filter: `drop-shadow(0 0 10px ${isPurple ? 'rgba(139, 92, 246, 0.6)' : 'rgba(6, 182, 212, 0.6)'})`
                  }}
                />
              </div>
            )
          })}
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute top-0 left-0 w-80 h-80 border-l-4 border-t-4 border-purple-500/30 rounded-br-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 border-r-4 border-b-4 border-cyan-500/30 rounded-tl-full pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 border-r-2 border-t-2 border-pink-500/20 rounded-bl-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 border-l-2 border-b-2 border-cyan-500/20 rounded-tr-full pointer-events-none z-0"></div>

      <Sidebar />

      <main className="flex-1 lg:ml-20 ml-0 relative flex flex-col min-h-screen z-10">
        <div className="absolute top-6 right-6 z-40">
          <Clock />
        </div>

        <div className="flex-1 p-6 md:p-10 relative z-10">
          {children}
        </div>

        <Footer />
      </main>
    </div>
  )
}