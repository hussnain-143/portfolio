'use client'
import React from 'react'
import Hero from './Hero'
import Highlights from './Highlights'
import Contact from './Contact'
import Skill from './Skill'
import { FiUser, FiMail, FiAward, FiCode } from 'react-icons/fi'

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-white/5 relative group/hero transition-all duration-500 hover:shadow-purple-500/30 hover:border-purple-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10 transition-all duration-500 z-0 group-hover/hero:scale-110 group-hover/hero:-rotate-12">
          <FiUser className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <Hero />
        </div>
      </div>

      {/* Highlights */}
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-white/5 bg-[#1a1a2e]/50 backdrop-blur-sm relative group transition-all duration-500 hover:shadow-cyan-500/30 hover:border-cyan-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute top-6 right-6 z-100 text-white/5 group-hover:text-white/10 transition-all duration-500  group-hover:scale-110 group-hover:-rotate-12">
          <FiAward className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <Highlights />
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10 border border-white/5 bg-[#1a1a2e]/30 backdrop-blur-sm relative group transition-all duration-500 hover:shadow-pink-500/30 hover:border-pink-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10  transition-all duration-500 z-100 group-hover:scale-110 group-hover:rotate-12">
          <FiCode className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <Skill />
        </div>
      </div>

      {/* Contact CTA */}
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-white/5 relative group transition-all duration-500 hover:shadow-purple-500/30 hover:border-purple-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10  transition-all duration-500 z-100 group-hover:scale-110 group-hover:rotate-12">
          <FiMail className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <Contact />
        </div>
      </div>
    </div>
  )
}
