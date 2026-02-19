'use client'
import { useEffect, useState } from 'react'

const AnimatedStars = () => {
  const [mounted, setMounted] = useState(false)
  const [stars, setStars] = useState([])

  useEffect(() => {
    setMounted(true)

    // Generate static data for stars to avoid re-renders during animation
    const starCount = 20
    const newStars = []
    const colors = [
      'rgba(139, 92, 246, 0.15)',
      'rgba(6, 182, 212, 0.15)',
    ]

    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 80 + 60,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 10 + 20,
        delay: Math.random() * -20,
        blur: Math.random() * 30 + 50,
      })
    }
    setStars(newStars)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Background Gradients */}
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

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(10px, 10px); }
          50% { transform: translate(0, 20px); }
          75% { transform: translate(-10px, 10px); }
          100% { transform: translate(0, 0); }
        }
        .star-particle {
          animation: float linear infinite;
        }
      `}</style>

      {stars.map((star) => (
        <div
          key={star.id}
          className="star-particle absolute rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `radial-gradient(circle, ${star.color} 0%, transparent 100%)`,
            filter: `blur(${star.blur}px)`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedStars

