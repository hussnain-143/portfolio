import React from 'react'
import { FaLaptopCode, FaDatabase, FaWordpress, FaTools, FaCode } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const Skill = () => {
  const skills = [
    {
      name: 'Front End Development',
      icon: <FaLaptopCode className="text-5xl mb-3 mx-auto" />,
      gradient: 'from-purple-500 to-pink-500',
      items: [
        { tech: 'React / Next.js', level: 'Expert' },
        { tech: 'TypeScript', level: 'Advanced' },
        { tech: 'JavaScript (ES6+)', level: 'Expert' },
        { tech: 'Tailwind CSS / CSS3', level: 'Expert' },
        { tech: 'HTML5', level: 'Expert' },
      ]
    },
    {
      name: 'Back End Development',
      icon: <FaDatabase className="text-5xl mb-3 mx-auto" />,
      gradient: 'from-cyan-500 to-blue-500',
      items: [
        { tech: 'Node.js / Express', level: 'Advanced' },
        { tech: 'PHP / Laravel', level: 'Advanced' },
        { tech: 'MongoDB / Redis', level: 'Advanced' },
        { tech: 'PostgreSQL / BullMQ', level: 'Intermediate' },
        { tech: 'REST APIs & Microservices', level: 'Advanced' },
      ]
    },
    {
      name: 'Specializations',
      icon: <FaWordpress className="text-5xl mb-3 mx-auto" />,
      gradient: 'from-pink-500 to-purple-500',
      items: [
        { tech: 'MERN Stack Development', level: 'Advanced' },
        { tech: 'Custom WordPress Dev', level: 'Advanced' },
        { tech: 'WordPress Plugin Dev', level: 'Intermediate' },
        { tech: 'E-commerce / WooCommerce', level: 'Advanced' },
        { tech: 'Web Performance Integration', level: 'Intermediate' },
      ]
    },
    {
      name: 'Tools & Workflow',
      icon: <FaTools className="text-5xl mb-3 mx-auto" />,
      gradient: 'from-blue-500 to-cyan-500',
      items: [
        { tech: 'Git / GitHub', level: 'Advanced' },
        { tech: 'Docker / CI/CD', level: 'Intermediate' },
        { tech: 'Vercel / Netlify / Render', level: 'Advanced' },
        { tech: 'Figma to Code', level: 'Expert' },
        { tech: 'Agile Workflow', level: 'Advanced' },
      ]
    }
  ]

  const getBadgeVariant = (level) => {
    switch (level) {
      case 'Expert':
        return 'default' // Primary solid color
      case 'Advanced':
        return 'secondary' // Lighter solid background
      case 'Intermediate':
        return 'outline' // Just an outline
      default:
        return 'outline'
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
            <Card
              key={index}
              className="group relative bg-gray-900/80 backdrop-blur-md border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,92,246,0.2)] overflow-hidden min-h-[180px]"
            >
              {/* Decorative Background Icon */}
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                {React.cloneElement(category.icon, { className: "text-9xl" })}
              </div>

              <CardHeader className="text-center relative z-10 pb-2">
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                  {category.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                  {category.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-96 transition-all duration-500 pt-4 relative z-10 overflow-hidden text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {category.items.map((item, i) => (
                    <Badge
                      key={i}
                      variant={getBadgeVariant(item.level)}
                      className="transition-transform hover:scale-105"
                    >
                      {item.tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              {/* Subtle Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 pointer-events-none`} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skill
