import React from 'react'
import { FaLaptopCode, FaDatabase, FaWordpress, FaTools, FaCode } from 'react-icons/fa'

const Skill = () => {
  const skills = [
    {
      name: 'Front End Development',
      icon: <FaLaptopCode className="text-5xl mb-3 mx-auto" />,
      gradient: 'from-purple-500 to-pink-500',
      items: [
        { tech: 'HTML', level: 'Expert' },
        { tech: 'CSS / Tailwind / Bootstrap', level: 'Expert' },
        { tech: 'JavaScript', level: 'Advanced' },
        { tech: 'React', level: 'Advanced' },
        { tech: 'Next.js', level: 'Intermediate' },
      ],
    },
    {
      name: 'Back End Development',
      icon: <FaDatabase className="text-5xl mb-3 mx-auto" />,
      gradient: 'from-cyan-500 to-blue-500',
      items: [
        { tech: 'PHP', level: 'Advanced' },
        { tech: 'Node.js', level: 'Intermediate' },
        { tech: 'MySQL', level: 'Advanced' },
        { tech: 'MongoDB', level: 'Intermediate' },
        { tech: 'REST APIs', level: 'Advanced' },
      ],
    },
    {
      name: 'WordPress Ecosystem',
      icon: <FaWordpress className="text-5xl mb-3 mx-auto" />,
      gradient: 'from-pink-500 to-purple-500',
      items: [
        { tech: 'Custom Theme Dev', level: 'Advanced' },
        { tech: 'Plugin Development', level: 'Intermediate' },
        { tech: 'WooCommerce', level: 'Intermediate' },
        { tech: 'Elementor', level: 'Expert' },
        { tech: 'Performance Optimization', level: 'Intermediate' },
      ],
    },
    {
      name: 'Tools & Workflow',
      icon: <FaTools className="text-5xl mb-3 mx-auto" />,
      gradient: 'from-blue-500 to-cyan-500',
      items: [
        { tech: 'Git / GitHub', level: 'Advanced' },
        { tech: 'VS Code', level: 'Expert' },
        { tech: 'Figma', level: 'Intermediate' },
        { tech: 'Vercel / Netlify', level: 'Advanced' },
        { tech: 'Responsive Design', level: 'Expert' },
      ],
    },
  ]

  const getProgress = (level) => {
    switch (level) {
      case 'Beginner':
        return { width: 'w-1/3', gradient: 'from-red-500 to-orange-500' }
      case 'Intermediate':
        return { width: 'w-2/3', gradient: 'from-yellow-500 to-orange-500' }
      case 'Advanced':
        return { width: 'w-5/6', gradient: 'from-cyan-500 to-blue-500' }
      case 'Expert':
        return { width: 'w-full', gradient: 'from-purple-500 to-pink-500' }
      default:
        return { width: 'w-1/4', gradient: 'from-gray-500 to-gray-600' }
    }
  }

  return (
    <section className="pb-24 pt-10 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-['Outfit'] flex items-center gap-3">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            <FaCode className="text-3xl md:text-4xl" />
          </div>
          <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Skills
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl 
                       bg-gradient-to-br from-gray-900/80 to-gray-800/80
                       backdrop-blur-sm border border-purple-500/20
                       hover:border-purple-500/50
                       transition-all duration-500 
                       hover:shadow-[0_20px_50px_rgba(139,92,246,0.2)]
                       overflow-hidden
                       h-auto min-h-[180px]"
            >
              {/* Decorative Background Icon */}
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                {React.cloneElement(category.icon, { className: "text-9xl" })}
              </div>

              {/* Icon and Title - Always Visible */}
              <div className="text-center relative z-10">
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                  {category.name}
                </h3>
              </div>

              {/* Skills List - Shown on Hover */}
              <ul className="opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-96 transition-all duration-500 pt-6 space-y-4 relative z-10 overflow-hidden">
                {category.items.map((item, i) => {
                  const { width, gradient } = getProgress(item.level)
                  return (
                    <li key={i}>
                      <div className="flex justify-between text-sm font-medium text-gray-300 mb-2">
                        <span>{item.tech}</span>
                        <span className="text-gray-500 text-xs">{item.level}</span>
                      </div>
                      <div className="w-full bg-gray-700/50 h-2 rounded-full overflow-hidden">
                        <div className={`h-2 rounded-full bg-gradient-to-r ${gradient} ${width} transition-all duration-700`} />
                      </div>
                    </li>
                  )
                })}
              </ul>

              {/* Subtle Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skill
