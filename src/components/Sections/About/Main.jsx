import React from 'react'

const Main = () => {
  return (
    <div className="p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 font-['Outfit'] flex items-center gap-3">
        <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          About Me
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
      </h2>

      <div className="text-gray-300 text-lg space-y-6 leading-relaxed relative z-10">
        <p>
          Hello! I'm <span className="text-white font-semibold">Hussnain Ahmed</span>, a passionate <strong className="text-purple-400">Full-Stack Developer</strong> & <strong className="text-cyan-400">WordPress Developer</strong> who builds fast, responsive, and user-friendly applications. I specialize in modern frameworks like <strong className="text-white">React, Next.js, Node.js, PHP</strong>, and <strong className="text-white">WordPress</strong>.
        </p>

        <p>
          With a strong background in both <span className="text-purple-300">frontend and backend development</span>, I write clean, scalable code and design intuitive interfaces. My experience includes e-commerce, admin dashboards, and CMS-based platforms.
        </p>

        <p>
          I'm a lifelong learner who keeps up with industry trends. Whether solo or in a team, I approach each project with positivity and dedication to quality.
        </p>

        <p>
          Outside of work, I enjoy tech meetups, mentoring juniors, and contributing to open source or personal projects.
        </p>
      </div>
    </div>
  )
}
export default Main
