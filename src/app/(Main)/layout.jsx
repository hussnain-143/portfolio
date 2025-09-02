import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Clock from '@/components/Clock'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header/>
      <main className="flex-grow">
        {children}
        <Clock/>
      </main>
        <Footer/>
    </div>
  )
}

export default Layout