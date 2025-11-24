'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import Clock from '@/components/Clock'
import StructuredData from '@/components/StructuredData'

export default function Layout({ children }) {
  const pathname = usePathname()
  
  // Determine page type for structured data
  const getPageType = () => {
    if (pathname === '/') return 'home'
    if (pathname === '/about') return 'about'
    if (pathname === '/projects') return 'projects'
    if (pathname === '/skills') return 'skills'
    if (pathname === '/contact') return 'contact'
    return 'home'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      <StructuredData type={getPageType()} />
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <main className="flex-1 lg:ml-20 ml-0 relative flex flex-col min-h-screen">
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