import React from 'react'

const SkillCard = ({ title, icon, gradient, items, delay }) => {
  return (
    <div className={`group relative p-8 rounded-3xl 
                     bg-[#1a1a2e]/60 backdrop-blur-md border border-white/5
                     hover:border-purple-500/50
                     transition-all duration-500 
                     hover:shadow-[0_20px_50px_rgba(139,92,246,0.2)]
                     overflow-hidden
                     hover:-translate-y-2`}>
      
      {/* Decorative Background Icon */}
      <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
        {React.cloneElement(icon, { className: "w-48 h-48" })}
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 font-['Outfit'] flex items-center gap-3">
          <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {title}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
        </h3>
      </div>

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
        {items.map((item, index) => (
          <div key={index} className="group/item">
            <div className="flex justify-between text-sm font-medium text-gray-300 mb-2">
              <span className="group-hover/item:text-white transition-colors">{item.tech}</span>
              <span className={`text-xs px-2 py-0.5 rounded bg-white/5 border border-white/5 ${
                item.level === 'Expert' ? 'text-purple-400 border-purple-500/30' :
                item.level === 'Advanced' ? 'text-cyan-400 border-cyan-500/30' :
                'text-gray-400'
              }`}>
                {item.level}
              </span>
            </div>
            <div className="w-full bg-gray-700/30 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out group-hover:scale-x-100 origin-left`}
                style={{ 
                  width: item.level === 'Expert' ? '100%' : 
                         item.level === 'Advanced' ? '85%' : 
                         item.level === 'Intermediate' ? '65%' : '40%' 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 pointer-events-none`} />
    </div>
  )
}

export default SkillCard
