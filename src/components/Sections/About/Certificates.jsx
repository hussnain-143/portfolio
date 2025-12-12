import React from 'react'
import Image from 'next/image'

const Certificates = () => {
  const certificates = [
    {
      title: "Hackathon Winner 2024",
      issuer: "Tech Innovation Summit",
      date: "2024",
      image: "/certificates/hakathon.jpg" 
    },
    {
      title: "Achievement Award",
      issuer: "Best Performance",
      date: "2023",
      image: "/certificates/Achievement.png"
    },
    {
      title: "Participation Certificate",
      issuer: "WordCamp Lahore Participation",
      date: "2023",
      image: "/certificates/PARTICIPATION.png"
    }
  ]

  return (
    <div className="p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 font-['Outfit'] flex items-center gap-3">
        <span className="text-gradient bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          Certificates
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <div key={index} className="group/cert relative bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer">
            <div className="aspect-video relative bg-gray-800 overflow-hidden">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover group-hover/cert:scale-110 group-hover/cert:brightness-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover/cert:opacity-40 transition-opacity duration-500" />
            </div>
            
            <div className="p-4 relative z-10">
              <h3 className="text-lg font-bold text-white group-hover/cert:text-purple-400 transition-colors line-clamp-1">
                {cert.title}
              </h3>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                <span>{cert.issuer}</span>
                <span className="font-mono bg-purple-900/30 px-2 py-0.5 rounded text-purple-300 text-xs">
                  {cert.date}
                </span>
              </div>
            </div>
            
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover/cert:opacity-5 blur-xl transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Certificates
