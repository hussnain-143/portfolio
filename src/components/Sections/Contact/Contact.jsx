'use client'

import React, { useEffect, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaUser, FaCommentAlt } from 'react-icons/fa'

const Contact = () => {
  const [state, handleSubmit] = useForm('mzzglvaz')
  const [showSuccess, setShowSuccess] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true)
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setResetKey((prev) => prev + 1)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state.succeeded])

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-['Outfit'] mb-6">
          <span className="text-gradient bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Let's Connect
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Ready to bring your ideas to life? Get in touch and let's create something amazing together.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Contact Info Card */}
        <div className="group relative overflow-hidden rounded-3xl 
                     bg-[#1a1a2e]/60 backdrop-blur-md border border-white/5
                     hover:border-purple-500/50
                     shadow-2xl shadow-purple-500/5
                     hover:shadow-purple-500/20
                     transition-all duration-500 
                     hover:-translate-y-2 p-8 md:p-12">
          
          {/* Decorative Background Icon */}
          <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
            <FaEnvelope className="w-54 h-54 text-white" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-['Outfit'] flex items-center gap-3">
              <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Get in Touch
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group/item flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors">
                <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-400 group-hover/item:scale-110 transition-transform">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-gray-400 text-sm">hussnain.ahmed.dev@gmail.com</p>
                </div>
              </div>

              <div className="group/item flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover/item:scale-110 transition-transform">
                  <FaPhone className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p className="text-gray-400 text-sm">+92 340 6999701</p>
                </div>
              </div>

              <div className="group/item flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors">
                <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-pink-400 group-hover/item:scale-110 transition-transform">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Location</h3>
                  <p className="text-gray-400 text-sm">Islamabad, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Contact Form Card */}
        <div className="group relative overflow-hidden rounded-3xl 
                     bg-[#1a1a2e]/60 backdrop-blur-md border border-white/5
                     hover:border-purple-500/50
                     shadow-2xl shadow-purple-500/5
                     hover:shadow-purple-500/20
                     transition-all duration-500 
                     hover:-translate-y-2 p-8 md:p-12">
          
          {/* Decorative Background Icon */}
          <div className="absolute -left-10 -bottom-10 opacity-5 group-hover:opacity-10 transform transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-12 group-hover:translate-x-12 pointer-events-none">
            <FaPaperPlane className="w-54 h-54 text-white" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-['Outfit'] flex items-center gap-3">
              <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Send a Message
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
            </h2>

            <form onSubmit={handleSubmit} key={resetKey} className="space-y-6 max-w-2xl mx-auto">
              {showSuccess && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3 animate-fade-in">
                  <span className="text-xl">✓</span>
                  <span>Thanks! Your message has been sent successfully.</span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group/input">
                  <div className="absolute left-4 top-4 text-gray-500 group-focus-within/input:text-purple-400 transition-colors">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full pl-12 pr-4 py-4 rounded-xl 
                             bg-white/5 border border-white/10
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-purple-500/50 focus:bg-white/10
                             transition-all duration-300"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div className="relative group/input">
                  <div className="absolute left-4 top-4 text-gray-500 group-focus-within/input:text-cyan-400 transition-colors">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl 
                             bg-white/5 border border-white/10
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-cyan-500/50 focus:bg-white/10
                             transition-all duration-300"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              <div className="relative group/input">
                <div className="absolute left-4 top-4 text-gray-500 group-focus-within/input:text-purple-400 transition-colors">
                  <FaCommentAlt />
                </div>
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="Your Message"
                  className="w-full pl-12 pr-4 py-4 rounded-xl 
                           bg-white/5 border border-white/10
                           text-white placeholder-gray-500
                           focus:outline-none focus:border-purple-500/50 focus:bg-white/10
                           transition-all duration-300 resize-none"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="group w-full md:w-auto px-8 py-4 rounded-xl font-semibold
                         bg-gradient-to-r from-purple-600 to-cyan-600
                         hover:from-purple-500 hover:to-cyan-500
                         text-white
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg shadow-purple-500/25
                         hover:shadow-purple-500/40 hover:scale-[1.02]
                         transition-all duration-300
                         cursor-pointer
                         flex items-center justify-center gap-2"
              >
                {state.submitting ? 'Sending...' : 'Send Message'}
                <FaPaperPlane className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

export default Contact
