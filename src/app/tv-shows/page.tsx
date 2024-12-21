import { Suspense } from 'react';
import { fetchFromTMDB, getTMDBImageUrl } from '../utils/tmdb';
import ContentGrid from '../components/ContentGrid';
import Loading from '../components/Loading';

async function getTVShows() {
  try {
    const data = await fetchFromTMDB('/tv/popular');
    return data.results.map((show: any) => ({
      id: show.id,
      title: show.name,
      image: getTMDBImageUrl(show.poster_path),
      type: 'tv'
    }));
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
}

export default function TVShows() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">TV Shows</h1>
        <Suspense fallback={<Loading />}>
          <TVShowsContent />
        </Suspense>
      </div>
    </main>
  )
}

async function TVShowsContent() {
  const tvShows = await getTVShows();

  if (tvShows.length === 0) {
    return <p>No TV shows found. Please try again later.</p>
  }

  return <ContentGrid items={tvShows} />;
}

