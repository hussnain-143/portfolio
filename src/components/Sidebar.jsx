'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiUser, FiCpu, FiFolder, FiMail, FiMenu, FiX } from 'react-icons/fi'

const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { name: 'Home', icon: <FiHome className="w-6 h-6" />, path: '/' },
    { name: 'About', icon: <FiUser className="w-6 h-6" />, path: '/about' },
    { name: 'Skills', icon: <FiCpu className="w-6 h-6" />, path: '/skills' },
    { name: 'Projects', icon: <FiFolder className="w-6 h-6" />, path: '/projects' },
    { name: 'Contact', icon: <FiMail className="w-6 h-6" />, path: '/contact' },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-[30%] left-0 z-50 p-3 rounded-r-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white lg:hidden shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 group hover:pl-4"
      >
        {isOpen ? <FiX className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" /> : <FiMenu className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-50 h-screen w-20 flex flex-col items-center justify-between py-8 
        bg-[#1a1a2e]/80 backdrop-blur-xl border-r border-white/5
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo / Brand Icon */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow duration-300">
          <span className="text-white font-bold text-xl font-['Outfit']">H</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className="group relative flex items-center justify-center"
              >
                <div className={`
                  p-3 rounded-xl transition-all duration-300 relative overflow-hidden
                  ${isActive 
                    ? 'text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-110' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105'
                  }
                `}>
                  {/* Active Background Gradient */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-100" />
                  )}
                  
                  {/* Icon */}
                  <div className="relative z-10">
                    {item.icon}
                  </div>
                </div>

                {/* Tooltip */}
                <span className="absolute left-14 px-3 py-1.5 bg-[#1a1a2e] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10 shadow-xl shadow-purple-500/10 translate-x-2 group-hover:translate-x-0 hidden lg:block">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Action / Settings */}
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer border border-white/5 hover:border-purple-500/30">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"></div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
