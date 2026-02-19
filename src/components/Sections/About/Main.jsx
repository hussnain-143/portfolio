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
          Hello! I'm <span className="text-white font-semibold">Hussnain Ahmed</span>, a dedicated <strong className="text-purple-400">MERN & Full-Stack Developer</strong> with expertise in building fast, scalable, and user-centric web applications. I specialize in modern technologies like <strong className="text-white">React, Next.js, Node.js, and WordPress</strong>.
        </p>

        <p>
          With a comprehensive background in <span className="text-purple-300">frontend and backend development</span>, I focus on writing high-quality, maintainable code and designing seamless user interfaces. My experience spans from custom e-commerce platforms to sophisticated admin dashboards.
        </p>

        <p>
          I am a continuous learner, constantly exploring new industry standards to deliver cutting-edge solutions. Whether working independently or as part of a team, I bring a proactive approach and a strong commitment to excellence.
        </p>


        <p>
          Outside of work, I enjoy tech meetups, mentoring juniors, and contributing to open source or personal projects.
        </p>
      </div>
    </div>
  )
}
export default Main
