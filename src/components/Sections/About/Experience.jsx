import React from 'react'

const Experience = () => {
  const experiences = [
    {
      role: "Full-Stack Developer",
      company: "Poxito",
      period: "Aug 2025 - Present",
      description: "Developed and maintained web applications using Next.js, React, Node.js, and Tailwind CSS. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      skills: ["React", "Node.js", "Next.js", "Tailwind CSS", "WordPress"]
    },
    {
      role: "WordPress Developer",
      company: "LDNinjas",
      period: "Jun 2025 - Aug 2025",
      description: "Developed custom plugins, enhanced features, and built admin dashboards for various client projects.",
      skills: ["WordPress", "PHP", "Plugin Dev", "Admin Dashboards"]
    },
    {
      role: "Frontend Developer Intern",
      company: "Stech.ai",
      period: "Aug 2022 - Sep 2022",
      description: "Created responsive websites using HTML, CSS, JavaScript, and WordPress with Elementor and custom themes.",
      skills: ["HTML/CSS", "JavaScript", "WordPress", "Elementor"]
    }
  ]

  return (
    <div className="p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 font-['Outfit'] flex items-center gap-3">
        <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Experience
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
      </h2>

      <div className="space-y-12 relative">
        {/* Vertical Line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent" />

        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-8 group/item">
            {/* Timeline Dot */}
            <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover/item:scale-150 transition-transform duration-300" />

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-xl font-bold text-white group-hover/item:text-cyan-400 transition-colors">
                  {exp.role}
                </h3>
                <span className="text-sm font-mono text-cyan-400/80 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20">
                  {exp.period}
                </span>
              </div>

              <p className="text-lg text-gray-400 font-medium">{exp.company}</p>

              <p className="text-gray-400 leading-relaxed max-w-2xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {exp.skills.map((skill, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Experience
