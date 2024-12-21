import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center">
      <Image
        src="/hero-background.jpg"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">All Your TV In One Place</h1>
        <p className="text-xl md:text-2xl mb-8">Watch thousands of shows and movies, completely free!</p>
        <Link href="/tv-shows" className="bg-green-500 text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-green-400 transition-colors">
          START WATCHING NOW
        </Link>
      </div>
    </section>
  )
}

