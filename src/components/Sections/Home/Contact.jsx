import Link from 'next/link'
import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'

const Contact = () => {
    return (
        <>
            <section className="relative pb-24 pt-10 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 font-['Outfit'] flex items-center gap-3">
                        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                            <FaPaperPlane className="text-3xl md:text-4xl" />
                        </div>
                        <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Let's Work Together
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                    </h2>
                    <div className="max-w-3xl mx-auto">
                       
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Have a project in mind or just want to connect? I'm open to freelance work, 
                            full-time roles, and exciting collaboration opportunities.
                        </p>
                        <Link href="/contact">
                            <span className="inline-flex items-center gap-2 px-8 py-4 
                                         bg-gradient-to-r from-purple-600 to-cyan-500 
                                         text-white font-semibold rounded-full 
                                         transition-all duration-300
                                         hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
                                         cursor-pointer group/btn">
                                Contact Me
                                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact