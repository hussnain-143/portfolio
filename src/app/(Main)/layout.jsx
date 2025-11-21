import React from 'react'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import Clock from '@/components/Clock'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <main className="flex-1 ml-20 relative flex flex-col min-h-screen">
        {/* Clock Widget (Absolute positioned) */}
        <div className="absolute top-6 right-6 z-40">
          <Clock />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-10">
          {children}
        </div>

        <Footer />
      </main>
    </div>
  )
}