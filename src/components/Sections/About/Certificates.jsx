import React from 'react'
import Image from 'next/image'

const certificateData = [
    {
        title: 'Achievement',
        institute: '1st Place – WordSprint Hackathon 6.0',
        date: 'Dec 27–30, 2024',
        image: '/certificates/hakathon.jpg',
    },
    {
        title: 'Achievement',
        institute: 'Awarded for entrepreneurial excellence',
        date: 'June 2023',
        image: '/certificates/Achievement.png',
    },
    {
        title: 'Participation',
        institute: 'Volunteered at open-source conference',
        date: 'Dec 10, 2023',
        image: '/certificates/PARTICIPATION.png',
    },
];


const Certificates = () => {
    return (
        <section className="bg-lime-100 py-20">
            <div className="container mx-auto px-6">

                <h2 className="text-4xl font-bold mb-10 text-center text-lime-700">Certificates</h2>

                {/* Certificate Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificateData.map((cert, index) => (
                        <div
                            key={index}
                            className="relative group overflow-hidden rounded-xl shadow-lg border border-gray-100 bg-white"
                        >
                            {/* Image */}
                            <Image
                                src={cert.image}
                                alt={cert.title}
                                width={400}
                                height={250}
                                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition duration-500 p-6 flex flex-col justify-end">
                                <h3 className="text-lg font-semibold">{cert.title}</h3>
                                <p className="text-sm">{cert.institute}</p>
                                <p className="text-xs text-gray-300">{cert.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certificates
