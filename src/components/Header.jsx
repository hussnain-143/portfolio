'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Menu toggle icons
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

// Nav item icons
import { FiHome, FiUser, FiFolder, FiMail } from 'react-icons/fi'

const Header = () => {
  const [show, setShow] = useState(false)

  const navItems = [
    { name: 'Home', href: '/', icon: <FiHome /> },
    { name: 'About', href: '/about', icon: <FiUser /> },
    { name: 'Projects', href: '/projects', icon: <FiFolder /> },
    { name: 'Contact', href: '/contact', icon: <FiMail /> },
  ]

  return (
    <header className="bg-lime-400 sticky top-0 z-999">
      <div className="container m-auto px-6 py-5 md:py-0">
        <div className="flex justify-between items-center">
          <div className='my-2'>
            <Image src="/logo.svg" alt="Logo" width={100} height={10} />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-2 px-6 py-3 font-semibold text-[18px] hover:bg-black hover:text-lime-500 transition duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShow(!show)}
              className="text-3xl font-bold text-black"
            >
              {show ? <AiOutlineClose /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {show && (
        <nav className="md:hidden  px-5 pb-4 flex flex-col gap-2 bg-lime-300">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 font-semibold text-[18px] hover:bg-black hover:text-lime-500 transition duration-300 rounded"
              onClick={() => setShow(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Header
