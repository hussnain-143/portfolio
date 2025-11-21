import React from 'react'
import { FaClock, FaCode, FaRocket, FaMobileAlt, FaAward } from 'react-icons/fa'

const Highlights = () => {
  const features = [
    {
      icon: <FaClock className="text-4xl" />,
      title: '24/7 Availability',
      desc: 'Always here to help — even outside working hours.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <FaCode className="text-4xl" />,
      title: 'Clean Code',
      desc: 'Well-structured, readable and maintainable code.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: <FaRocket className="text-4xl" />,
      title: 'Fast Delivery',
      desc: 'Quick turnaround without compromising quality.',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      icon: <FaMobileAlt className="text-4xl" />,
      title: 'Responsive Design',
      desc: 'Pixel-perfect designs on all screen sizes.',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ]

  return (
    <section className="relative pb-24 pt-10 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-['Outfit'] flex items-center gap-3">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            <FaAward className="text-3xl md:text-4xl" />
          </div>
          <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Why Work With Me
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
        </h2>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group relative p-8 rounded-2xl 
                       bg-gradient-to-br from-gray-800/50 to-gray-900/50
                       backdrop-blur-sm border border-purple-500/20
                       hover:border-purple-500/50
                       transition-all duration-500
                       hover:-translate-y-2
                       hover:shadow-[0_20px_50px_rgba(139,92,246,0.2)]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Decorative Background Icon */}
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                {React.cloneElement(f.icon, { className: "text-9xl" })}
              </div>

              {/* Icon with gradient */}
              <div className={`mb-6 flex justify-center text-transparent bg-clip-text bg-gradient-to-r ${f.gradient} relative z-10`}>
                {f.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                {f.title}
              </h3>
              
              <p className="text-sm text-gray-400 leading-relaxed">
                {f.desc}
              </p>

              {/* Subtle Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-10 blur-xl rounded-2xl transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Highlights
