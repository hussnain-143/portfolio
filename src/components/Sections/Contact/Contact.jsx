'use client'

import React, { useEffect, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'

const Contact = () => {
  const [state, handleSubmit] = useForm('mzzglvaz')
  const [showSuccess, setShowSuccess] = useState(false)
  const [resetKey, setResetKey] = useState(0) // helps to reset form fields

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true)
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setResetKey((prev) => prev + 1) // trigger rerender to reset form
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state.succeeded])

  return (
    <section className="bg-gradient-to-br from-lime-200 via-white to-lime-200 relative py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-lime-700 mb-10">
           Let<span className="text-black">'</span>s Connect
        </h1>

        <div className="rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
          
          {/* Contact Info */}
          <div className="bg-lime-200 text-black p-10 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-black/90">
              Feel free to reach out — I’m open to collaboration, freelance, or just a friendly chat!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl" />
                <span>hussnain.ahmed.dev@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-xl" />
                <span>+92 340 6999701</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-xl" />
                <span>Abbottabad, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            key={resetKey} // re-renders form after success
            className="bg-white p-10 space-y-6 relative"
          >
            <h2 className="text-2xl font-semibold text-lime-700 mb-4">Send a Message</h2>

            {showSuccess && (
              <p className="text-green-600 font-semibold bg-green-100 border border-green-300 p-3 rounded-md shadow-sm">
                ✅ Thanks! Your message has been sent successfully.
              </p>
            )}

            {/* Always show form */}
            <>
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  id="name"
                  className="peer w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500 left-4 top-2 peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs transition-all px-1"
                >
                  Your Name
                </label>
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  id="email"
                  className="peer w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 left-4 top-2 peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs transition-all  px-1"
                >
                  Email Address
                </label>
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  required
                  className="peer w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <label
                  htmlFor="message"
                  className="absolute text-sm text-gray-500 left-4 top-2 peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs transition-all  px-1"
                >
                  Your Message
                </label>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="flex items-center gap-2 bg-lime-600 text-white px-6 py-3 rounded-md hover:bg-black hover:text-lime-400 transition duration-300"
              >
                Send Message <FaPaperPlane />
              </button>
            </>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
