import React from 'react'
import { FaLaptopCode, FaDatabase, FaWordpress, FaTools } from 'react-icons/fa'

const Skill = () => {
  const skills = [
    {
      name: 'Front End',
      icon: <FaLaptopCode className="text-4xl text-lime-600 mb-2 mx-auto" />,
      items: [
        { tech: 'HTML', level: 'Expert' },
        { tech: 'CSS / Tailwind / Bootstrap', level: 'Expert' },
        { tech: 'JavaScript', level: 'Advanced' },
        { tech: 'React', level: 'Advanced' },
        { tech: 'Next.js', level: 'Intermediate' },
      ],
    },
    {
      name: 'Back End',
      icon: <FaDatabase className="text-4xl text-lime-600 mb-2 mx-auto" />,
      items: [
        { tech: 'PHP', level: 'Advanced' },
        { tech: 'Laravel', level: 'Intermediate' },
        { tech: 'MySQL', level: 'Advanced' },
        { tech: 'REST APIs', level: 'Advanced' },
      ],
    },
    {
      name: 'WordPress Development',
      icon: <FaWordpress className="text-4xl text-lime-600 mb-2 mx-auto" />,
      items: [
        { tech: 'Custom Themes', level: 'Advanced' },
        { tech: 'Plugins', level: 'Intermediate' },
        { tech: 'WooCommerce', level: 'Intermediate' },
      ],
    },
    {
      name: 'Others',
      icon: <FaTools className="text-4xl text-lime-600 mb-2 mx-auto" />,
      items: [
        { tech: 'Git & GitHub', level: 'Advanced' },
        { tech: 'Figma', level: 'Intermediate' },
        { tech: 'Responsive Design', level: 'Expert' },
        { tech: 'Deployment', level: 'Intermediate' },
      ],
    },
  ]

  const getProgress = (level) => {
    switch (level) {
      case 'Beginner':
        return 'w-1/3 bg-red-400'
      case 'Intermediate':
        return 'w-2/3 bg-yellow-400'
      case 'Advanced':
        return 'w-5/6 bg-lime-500'
      case 'Expert':
        return 'w-full bg-lime-700'
      default:
        return 'w-1/4 bg-gray-400'
    }
  }

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-lime-700">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md group hover:shadow-xl transition-all duration-500 hover:h-[350px] h-[160px] overflow-hidden relative"
            >
              <div className="text-center">
                {category.icon}
                <h3 className="text-xl font-semibold text-lime-600">
                  {category.name}
                </h3>
              </div>

              <ul className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 py-4 space-y-4">
                {category.items.map((item, i) => (
                  <li key={i}>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                      <span>{item.tech}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className={`h-2 rounded-full ${getProgress(item.level)} transition-all duration-500`} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skill
