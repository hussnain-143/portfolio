import React from 'react'

const experienceData = [
  {
    role: 'WordPress Developer',
    company: 'LDNinjas',
    period: 'Jun 2025 – Present',
    description:
      'Developing custom plugins, enhancing features, and building admin dashboards.',
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Stech.ai',
    period: 'Aug 2022 – Sep 2022',
    description:
      'Created responsive websites using HTML, CSS, JavaScript, and WordPress with Elementor and custom themes.',
  },
];


const Experience = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
          <h2 className="text-4xl text-center mb-10 font-bold text-lime-700">Work Experience</h2>
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-lime-500"></div>

          {/* Experience Cards */}
          <div className="flex flex-col gap-12">
            {experienceData.map((exp, index) => {
              const isLeft = index % 2 === 0
              return (
                <div
                  key={index}
                  className={`relative md:w-1/2 px-4 ${
                    isLeft ? 'md:ml-0 md:mr-auto text-left' : 'md:mr-0 md:ml-auto text-left'
                  }`}
                >
                  {/* Dot aligned to timeline */}
                  <div
                    className="absolute top-4 w-4 h-4 bg-white border-4 border-lime-500 rounded-full shadow"
                    style={{
                      left: isLeft ? '100%' : '-1rem',
                      transform: isLeft ? 'translateX(-50%)' : 'translateX(50%)',
                    }}
                  ></div>

                  {/* Experience Card */}
                  <div className="bg-lime-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-lime-800">{exp.role}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                    <p className="text-gray-600 text-sm">{exp.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
