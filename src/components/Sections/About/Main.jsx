import React from 'react'

const Main = () => {
  return (
    <section className="relative bg-gradient-to-br from-lime-200 via-white to-lime-200 py-15 overflow-hidden">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-lime-700 mb-10">
          About Me
        </h1>

        <div className="relative max-w-4xl mx-auto bg-white/70 backdrop-blur-md border-l-4 border-lime-500 shadow-lg p-8 md:p-12 rounded-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute -left-2 top-6 h-3 w-3 bg-lime-600 rounded-full animate-ping" />
          
          <div className="text-gray-800 text-lg space-y-6 leading-relaxed">
            <p>
              Hello! I'm <span className="bg-lime-200 px-1 rounded font-semibold text-lime-800">Hussnain Ahmed</span>, a passionate <strong>Full-Stack Developer</strong> & <strong>WordPress Developer</strong> who builds fast, responsive, and user-friendly applications. I specialize in modern frameworks like <strong className="text-lime-700">React, Next.js, Laravel</strong>, and <strong className="text-lime-700">WordPress</strong>.
            </p>

            <p>
              With a strong background in both <span className="bg-lime-100 px-1 rounded">frontend and backend development</span>, I write clean, scalable code and design intuitive interfaces. My experience includes e-commerce, admin dashboards, and CMS-based platforms.
            </p>

            <p>
              I'm a lifelong learner who keeps up with industry trends. Whether solo or in a team, I approach each project with positivity and dedication to quality.
            </p>

            <p>
              Outside of work, I enjoy tech meetups, mentoring juniors, and contributing to open source or personal projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Main
