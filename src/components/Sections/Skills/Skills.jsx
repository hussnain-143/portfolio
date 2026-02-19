import React from 'react'
import { FaLaptopCode, FaDatabase, FaWordpress, FaTools } from 'react-icons/fa'
import SkillCard from './SkillCard'

const Skills = () => {
  const skills = [
    {
      name: 'Front End Development',
      icon: <FaLaptopCode />,
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
      icon: <FaDatabase />,
      gradient: 'from-cyan-500 to-blue-600',
      items: [
        { tech: 'Node.js / Express', level: 'Advanced' },
        { tech: 'PHP / Laravel', level: 'Advanced' },
        { tech: 'MongoDB / Redis', level: 'Advanced' },
        { tech: 'PostgreSQL / BullMQ', level: 'Intermediate' },
        { tech: 'RESTful APIs / Render', level: 'Advanced' },
      ]
    },
    {
      name: 'Specializations',
      icon: <FaWordpress />,
      gradient: 'from-blue-600 to-indigo-600',
      items: [
        { tech: 'MERN Stack Development', level: 'Advanced' },
        { tech: 'Custom WordPress Dev', level: 'Advanced' },
        { tech: 'WordPress Plugin Dev', level: 'Intermediate' },
        { tech: 'RESTful API Design', level: 'Advanced' },
        { tech: 'E-commerce Solutions', level: 'Advanced' },
      ]
    },
    {
      name: 'Tools & Workflow',
      icon: <FaTools />,
      gradient: 'from-orange-500 to-red-500',
      items: [
        { tech: 'Git / GitHub', level: 'Advanced' },
        { tech: 'Docker / CI/CD', level: 'Intermediate' },
        { tech: 'Vercel / Netlify / Render', level: 'Advanced' },
        { tech: 'Figma to Code', level: 'Expert' },
        { tech: 'Performance Optimization', level: 'Advanced' },
      ]
    }

  ]

  return (
    <div className="max-w-7xl mx-auto">

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-['Outfit'] mb-6">
          <span className="text-gradient bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Technical Expertise
          </span>
        </h1>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            title={skill.name}
            icon={skill.icon}
            gradient={skill.gradient}
            items={skill.items}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  )
}

export default Skills
