import React from 'react'
import { FaLaptopCode, FaDatabase, FaWordpress, FaTools } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const Skills = () => {
  const skills = [
    {
      name: 'Front End Development',
      icon: <FaLaptopCode className="text-5xl mb-3 mx-auto" />,
      gradient: 'from-purple-600 to-pink-500',
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
      gradient: 'from-cyan-500 to-blue-600',
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
      gradient: 'from-blue-600 to-indigo-600',
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
      gradient: 'from-orange-500 to-red-500',
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
        return 'default'
      case 'Advanced':
        return 'secondary'
      case 'Intermediate':
        return 'outline'
      default:
        return 'outline'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-['Outfit'] mb-6">
          <span className="text-gradient bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Technical Expertise
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {skills.map((category, index) => (
          <Card
            key={index}
            className="group relative bg-[#0a0a0f]/80 backdrop-blur-md border-white/5 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)] overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
              {React.cloneElement(category.icon, { className: "text-9xl" })}
            </div>

            <CardHeader className="text-center relative z-10 pb-4 pt-8">
              <div className={`text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                {category.icon}
              </div>
              <CardTitle className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                {category.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 pb-8 text-center">
              <div className="flex flex-wrap justify-center gap-3">
                {category.items.map((item, i) => (
                  <Badge
                    key={i}
                    variant={getBadgeVariant(item.level)}
                    className="text-sm py-1.5 px-3 transition-transform hover:scale-105 cursor-default"
                  >
                    {item.tech}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 pointer-events-none`} />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Skills
