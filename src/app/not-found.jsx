'use client'
import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 via-white to-lime-200 px-4">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl text-center p-10 border border-lime-200">
        
        <div className="flex justify-center mb-6">
          <div className="bg-lime-100 p-6 rounded-full shadow-md animate-pulse">
            <FaExclamationTriangle className="text-5xl text-lime-600 drop-shadow-lg" />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-lime-700 mb-4 tracking-tight">404</h1>
        <p className="text-xl text-gray-700 font-medium mb-2">Oops! Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black text-lime-400 font-semibold rounded-full hover:bg-lime-500 hover:text-black transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
