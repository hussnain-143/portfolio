import React from 'react'
import { FiBook } from 'react-icons/fi'

const Education = () => {
  const education = [
    {
      degree: "BS in Computer Science",
      school: "Abbottabad University",
      period: "2020 - 2024",
      description: "Focused on software engineering, algorithms, and data structures. Graduated with honors.",
    },
    {
      degree: "Intermediate in Pre-Medical Science",
      school: "Post Graduate College No. 1, Abbottabad",
      period: "2018 - 2020",
      description: "Completed intermediate studies with a focus on science and foundational knowledge.",
    }
  ]

  return (
    <div className="p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 font-['Outfit'] flex items-center gap-3">
        <span className="text-gradient bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Education
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent" />
      </h2>

      <div className="space-y-12 relative">
        {/* Vertical Line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-pink-500/50 via-purple-500/20 to-transparent" />

        {education.map((edu, index) => (
          <div key={index} className="relative pl-8 group/item">
            {/* Timeline Dot */}
            <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] group-hover/item:scale-150 transition-transform duration-300" />

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-xl font-bold text-white group-hover/item:text-pink-400 transition-colors">
                  {edu.degree}
                </h3>
                <span className="text-sm font-mono text-pink-400/80 bg-pink-900/20 px-2 py-1 rounded border border-pink-500/20">
                  {edu.period}
                </span>
              </div>
              
              <p className="text-lg text-gray-400 font-medium">{edu.school}</p>
              
              <p className="text-gray-400 leading-relaxed max-w-2xl">
                {edu.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Education
