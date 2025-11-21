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
        { tech: 'HTML', level: 'Expert' },
        { tech: 'CSS / Tailwind / Bootstrap', level: 'Expert' },
        { tech: 'JavaScript', level: 'Advanced' },
        { tech: 'React', level: 'Advanced' },
        { tech: 'Next.js', level: 'Intermediate' },
      ]
    },
    {
      name: 'Back End Development',
      icon: <FaDatabase />,
      gradient: 'from-cyan-500 to-blue-600',
      items: [
        { tech: 'PHP', level: 'Advanced' },
        { tech: 'MySQL / MongoDB', level: 'Advanced' },
        { tech: 'Node.js', level: 'Intermediate' },
        { tech: 'RESTful APIs', level: 'Advanced' },
      ]
    },
    {
      name: 'WordPress Ecosystem',
      icon: <FaWordpress />,
      gradient: 'from-blue-600 to-indigo-600',
      items: [
        { tech: 'Custom Theme Dev', level: 'Advanced' },
        { tech: 'Plugin Development', level: 'Intermediate' },
        { tech: 'WooCommerce', level: 'Intermediate' },
        { tech: 'Elementor', level: 'Expert' },
        { tech: 'Performance Optimization', level: 'Intermediate' },
      ]
    },
    {
      name: 'Tools & Workflow',
      icon: <FaTools />,
      gradient: 'from-orange-500 to-red-500',
      items: [
        { tech: 'Git / GitHub', level: 'Advanced' },
        { tech: 'VS Code', level: 'Expert' },
        { tech: 'Figma', level: 'Intermediate' },
        { tech: 'Vercel / Netlify', level: 'Advanced' },
        { tech: 'Responsive Design', level: 'Expert' },
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
