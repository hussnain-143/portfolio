import React from 'react'
import Main from './Main'
import Education from './Education'
import Experience from './Experience'
import Certificates from './Certificates'
import { FiUser, FiBook, FiAward } from 'react-icons/fi'
import { BsLaptop } from 'react-icons/bs';

const AboutPage = () => {
    return (
        <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
            {/* Main Intro Card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-white/5 relative group transition-all duration-500 hover:shadow-purple-500/30 hover:border-purple-500/30 bg-[#1a1a2e]/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10 transition-all duration-500 z-0 group-hover:scale-110 group-hover:-rotate-12">
                    <FiUser className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                    <Main />
                </div>
            </div>

            {/* Experience Card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-white/5 relative group transition-all duration-500 hover:shadow-cyan-500/30 hover:border-cyan-500/30 bg-[#1a1a2e]/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10 transition-all duration-500 z-0 group-hover:scale-110 group-hover:rotate-12">
                    <BsLaptop className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                    <Experience />
                </div>
            </div>

            {/* Education Card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10 border border-white/5 relative group transition-all duration-500 hover:shadow-pink-500/30 hover:border-pink-500/30 bg-[#1a1a2e]/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10 transition-all duration-500 z-0 group-hover:scale-110 group-hover:-rotate-12">
                    <FiBook className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                    <Education />
                </div>
            </div>

            {/* Certificates Card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-white/5 relative group transition-all duration-500 hover:shadow-purple-500/30 hover:border-purple-500/30 bg-[#1a1a2e]/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10 transition-all duration-500 z-0 group-hover:scale-110 group-hover:rotate-12">
                    <FiAward className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                    <Certificates/>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
