import Image from 'next/image'
import Link from 'next/link'
import VideoPlayer from '../../components/VideoPlayer'
import ContentGrid from '../../components/ContentGrid'

// This data would typically come from an API call
const content = {
  title: 'The Handmaid\'s Tale',
  type: 'show',
  image: '/show1.jpg',
  description: 'Set in a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship.',
  videoSrc: 'https://example.com/handmaids-tale-trailer.mp4',
  seasons: 4,
  rating: 'TV-MA',
  genre: 'Drama',
  relatedContent: [
    { title: 'The Great', image: '/show2.jpg' },
    { title: 'Normal People', image: '/show5.jpg' },
    { title: 'The Act', image: '/show6.jpg' },
    { title: 'Little Fires Everywhere', image: '/show7.jpg' },
  ]
}

export default function ContentPage({ params }: { params: { type: string, slug: string } }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href={`/${params.type}`} className="text-green-500 hover:underline">&larr; Back to {params.type}</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="mb-4">{content.description}</p>
            <div className="mb-4">
              <span className="font-bold">Type:</span> {content.type === 'show' ? 'TV Show' : 'Movie'}
            </div>
            {content.type === 'show' && (
              <div className="mb-4">
                <span className="font-bold">Seasons:</span> {content.seasons}
              </div>
            )}
            <div className="mb-4">
              <span className="font-bold">Rating:</span> {content.rating}
            </div>
            <div className="mb-4">
              <span className="font-bold">Genre:</span> {content.genre}
            </div>
          </div>
          <div>
            <VideoPlayer src={content.videoSrc} poster={content.image} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">You may also like</h2>
          <ContentGrid items={content.relatedContent} />
        </div>
      </div>
    </main>
  )
}

