'use client'
import { useEffect, useState, useRef } from 'react'

const AnimatedStars = () => {
  const [particles, setParticles] = useState([])
  const [mounted, setMounted] = useState(false)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    setMounted(true)

    const generateParticles = () => {
      const particleCount = 25
      const newParticles = []

      const colors = [
        { r: 139, g: 92, b: 246 },
        { r: 6, g: 182, b: 212 },
      ]

      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.random() * 80 + 60
        
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: size,
          color: color,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.08 + 0.05,
          blur: Math.random() * 30 + 50,
        })
      }

      setParticles(newParticles)
    }

    generateParticles()

    const animate = () => {
      setParticles((prevParticles) => {
        return prevParticles.map((particle) => {
          let newX = particle.x + particle.vx
          let newY = particle.y + particle.vy

          if (newX < -10) newX = 110
          if (newX > 110) newX = -10
          if (newY < -10) newY = 110
          if (newY > 110) newY = -10

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, 
            rgba(139, 92, 246, 0.15) 0%, 
            transparent 50%),
            radial-gradient(ellipse at 80% 70%, 
            rgba(6, 182, 212, 0.15) 0%, 
            transparent 50%)`,
        }}
      />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, 
              rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity}) 0%, 
              rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity * 0.5}) 50%, 
              transparent 100%)`,
            filter: `blur(${particle.blur}px)`,
            transition: 'opacity 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedStars
