import Hero from './components/Hero'
import ContentShowcase from './components/ContentShowcase'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <ContentShowcase />
      <Footer />
    </main>
  )
}

