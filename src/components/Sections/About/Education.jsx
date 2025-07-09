import React from 'react'
const educationData = [
    {
    title: 'BS in Computer Science',
    institute: 'Abbottabad University',
    date: '2020 – 2024',
  },
  {
    title: 'Intermediate in Pre-Medical Science',
    institute: 'Post Graduate College No. 1, Abbottabad',
    date: '2018 – 2020',
  },
]

const Education = () => {
    return (
        <section className=" py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl mb-10 text-center font-bold text-lime-700">Education</h2>
                <div className="relative">
                    {/* Center Timeline Line */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-lime-500"></div>

                    {/* Cards */}
                    <div className="flex flex-col gap-12">
                        {educationData.map((item, index) => {
                            const isLeft = index % 2 === 0
                            return (
                                <div
                                    key={index}
                                    className={`relative md:w-1/2 px-4 ${isLeft ? 'md:ml-0 md:mr-auto text-left' : 'md:mr-0 md:ml-auto text-left'
                                        }`}
                                >
                                    {/* Dot aligned to timeline */}
                                    <div
                                        className="absolute top-4 w-4 h-4 bg-white border-4 border-lime-500 rounded-full shadow"
                                        style={{
                                            left: isLeft ? '100%' : '-1rem',
                                            transform: isLeft ? 'translateX(-50%)' : 'translateX(50%)',
                                        }}
                                    ></div>

                                    {/* Card */}
                                    <div className="bg-lime-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                                        <h3 className="text-xl font-semibold text-lime-800">{item.title}</h3>
                                        <p className="text-gray-700">{item.institute}</p>
                                        <p className="text-sm text-gray-500">{item.date}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Education
