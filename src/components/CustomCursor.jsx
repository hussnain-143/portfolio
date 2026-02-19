'use client'
import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    setIsVisible(true)

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`,
        }}
      >
        <div
          className="relative w-5 h-5 transition-transform duration-100 ease-out"
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(236, 72, 153, 0.8) 50%, rgba(6, 182, 212, 1) 100%)',
            boxShadow: '0 0 25px rgba(139, 92, 246, 1), 0 0 50px rgba(6, 182, 212, 0.7), 0 0 75px rgba(236, 72, 153, 0.5)',
          }}
        >
          <div
            className="absolute inset-0.5"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              background: 'rgba(10, 10, 15, 0.4)',
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
            style={{
              boxShadow: '0 0 8px rgba(255, 255, 255, 1), 0 0 12px rgba(139, 92, 246, 0.9)',
            }}
          ></div>
        </div>
      </div>

      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px) rotate(22.5deg)`,
        }}
      >
        <div
          className="w-8 h-8 transition-transform duration-200 ease-out"
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            border: '1.5px solid',
            borderImage: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.6), rgba(6, 182, 212, 0.6)) 1',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
          }}
        ></div>
      </div>
    </>
  )
}

export default CustomCursor

