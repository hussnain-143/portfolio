'use client'
import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    setIsVisible(true)
    let trailId = 0

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      setTrail((prev) => {
        const newTrail = [
          { x: e.clientX, y: e.clientY, id: trailId++ },
          ...prev.slice(0, 14)
        ]
        return newTrail
      })
    }

    const handleMouseLeave = () => {
      setTrail([])
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-50 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`,
        }}
      >
        <div
          className="relative w-5 h-5"
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
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px) rotate(22.5deg)`,
        }}
      >
        <div
          className="w-8 h-8"
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            border: '1.5px solid',
            borderImage: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.6), rgba(6, 182, 212, 0.6)) 1',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
          }}
        ></div>
      </div>

      {trail.map((point, index) => {
        const size = Math.max(8 - (index * 0.4), 2)
        const opacity = Math.max(0.95 - (index * 0.04), 0.2)
        const rotation = index * 15
        const shapeType = index % 5
        
        if (shapeType === 0) {
          return (
            <div
              key={point.id}
              className="fixed top-0 left-0 pointer-events-none z-[9997] transition-all duration-100 ease-out"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(139, 92, 246, ${opacity}) 0%, transparent 70%)`,
                border: `1px solid rgba(139, 92, 246, ${opacity * 0.8})`,
                transform: `translate(${point.x - size / 2}px, ${point.y - size / 2}px)`,
                opacity: opacity,
                boxShadow: `0 0 ${size * 5}px rgba(139, 92, 246, ${opacity})`,
              }}
            />
          )
        } else if (shapeType === 1) {
          return (
            <div
              key={point.id}
              className="fixed top-0 left-0 pointer-events-none z-[9997] transition-all duration-100 ease-out"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                background: `linear-gradient(135deg, rgba(6, 182, 212, ${opacity}) 0%, rgba(6, 182, 212, ${opacity * 0.5}) 100%)`,
                transform: `translate(${point.x - size / 2}px, ${point.y - size / 2}px) rotate(${rotation}deg)`,
                opacity: opacity,
                boxShadow: `0 0 ${size * 4}px rgba(6, 182, 212, ${opacity * 0.9})`,
              }}
            />
          )
        } else if (shapeType === 2) {
          return (
            <div
              key={point.id}
              className="fixed top-0 left-0 pointer-events-none z-[9997] transition-all duration-100 ease-out"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                background: `linear-gradient(135deg, rgba(236, 72, 153, ${opacity}) 0%, rgba(236, 72, 153, ${opacity * 0.6}) 100%)`,
                transform: `translate(${point.x - size / 2}px, ${point.y - size / 2}px) rotate(${rotation}deg)`,
                opacity: opacity,
                boxShadow: `0 0 ${size * 3.5}px rgba(236, 72, 153, ${opacity * 0.8})`,
              }}
            />
          )
        } else if (shapeType === 3) {
          return (
            <div
              key={point.id}
              className="fixed top-0 left-0 pointer-events-none z-[9997] transition-all duration-100 ease-out"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `translate(${point.x - size / 2}px, ${point.y - size / 2}px) rotate(${rotation}deg)`,
                background: `linear-gradient(45deg, rgba(139, 92, 246, ${opacity * 0.7}) 0%, rgba(6, 182, 212, ${opacity * 0.7}) 100%)`,
                borderRadius: '2px',
                opacity: opacity,
                boxShadow: `0 0 ${size * 3}px rgba(139, 92, 246, ${opacity * 0.6}), 0 0 ${size * 5}px rgba(6, 182, 212, ${opacity * 0.4})`,
              }}
            />
          )
        } else {
          return (
            <div
              key={point.id}
              className="fixed top-0 left-0 pointer-events-none z-[9997] transition-all duration-100 ease-out"
              style={{
                width: `${size * 1.2}px`,
                height: `${size * 0.3}px`,
                background: `linear-gradient(90deg, rgba(236, 72, 153, ${opacity}) 0%, rgba(139, 92, 246, ${opacity * 0.8}) 50%, rgba(6, 182, 212, ${opacity}) 100%)`,
                transform: `translate(${point.x - (size * 1.2) / 2}px, ${point.y - (size * 0.3) / 2}px) rotate(${rotation}deg)`,
                borderRadius: '2px',
                opacity: opacity,
                boxShadow: `0 0 ${size * 2}px rgba(236, 72, 153, ${opacity * 0.7})`,
              }}
            />
          )
        }
      })}
    </>
  )
}

export default CustomCursor
