import { FaClock, FaCode, FaRocket, FaMobileAlt } from 'react-icons/fa'

const Highlights = () => {
  const features = [
    {
      icon: <FaClock className="text-3xl text-lime-600" />,
      title: '24/7 Availability',
      desc: 'Always here to help — even outside working hours.',
    },
    {
      icon: <FaCode className="text-3xl text-lime-600" />,
      title: 'Clean Code',
      desc: 'Well-structured, readable and maintainable code.',
    },
    {
      icon: <FaRocket className="text-3xl text-lime-600" />,
      title: 'Fast Delivery',
      desc: 'Quick turnaround without compromising quality.',
    },
    {
      icon: <FaMobileAlt className="text-3xl text-lime-600" />,
      title: 'Responsive Design',
      desc: 'Pixel-perfect designs on all screen sizes.',
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-lime-700">Why Work With Me</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {features.map((f, i) => (
            <div key={i} className="bg-lime-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-lime-600">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Highlights
