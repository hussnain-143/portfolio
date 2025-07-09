import Link from 'next/link'
import React from 'react'

const Contact = () => {
    return (
        <>
            <section className="py-16 bg-lime-100 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-lime-700">Let’s Work Together</h2>
                    <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
                        Have a project in mind or just want to connect? I’m open to freelance work and full-time roles.
                    </p>
                    <Link href="/contact">
                        <span className="inline-block px-6 py-3 bg-lime-500 text-black font-semibold rounded-full hover:bg-black hover:text-lime-400 transition duration-300">
                            Contact Me
                        </span>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Contact