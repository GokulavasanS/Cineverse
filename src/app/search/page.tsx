import { Suspense } from 'react'
import ContentGrid from '../components/ContentGrid'

// This would typically come from an API call based on the search query
const searchResults = [
  { title: 'The Handmaid\'s Tale', image: '/show1.jpg' },
  { title: 'Palm Springs', image: '/movie1.jpg' },
  { title: 'The Great', image: '/show2.jpg' },
  { title: 'Normal People', image: '/show5.jpg' },
]

export default function SearchResults({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q

  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Search Results for &quot;{query}&quot;</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ContentGrid items={searchResults} />
        </Suspense>
      </div>
    </main>
  )
}

