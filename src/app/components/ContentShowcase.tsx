import Image from 'next/image'

const shows = [
  { title: 'The Handmaid\'s Tale', image: '/show1.jpg' },
  { title: 'The Great', image: '/show2.jpg' },
  { title: 'Love, Victor', image: '/show3.jpg' },
  { title: 'Ramy', image: '/show4.jpg' },
]

export default function ContentShowcase() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Included in all plans</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shows.map((show) => (
            <div key={show.title} className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <Image
                src={show.image}
                alt={show.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold">{show.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

