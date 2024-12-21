import { Suspense } from 'react';
import { fetchFromTMDB, getTMDBImageUrl } from '../utils/tmdb';
import ContentGrid from '../components/ContentGrid';
import Loading from '../components/Loading';

async function getMyStuff() {
  try {
    const [movieData, tvData] = await Promise.all([
      fetchFromTMDB('/movie/top_rated', { limit: '5' }),
      fetchFromTMDB('/tv/top_rated', { limit: '5' })
    ]);

    const movies = movieData.results.slice(0, 5).map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      image: getTMDBImageUrl(movie.poster_path),
      type: 'movie'
    }));

    const tvShows = tvData.results.slice(0, 5).map((show: any) => ({
      id: show.id,
      title: show.name,
      image: getTMDBImageUrl(show.poster_path),
      type: 'tv'
    }));

    return [...movies, ...tvShows];
  } catch (error) {
    console.error('Error fetching My Stuff:', error);
    return [];
  }
}

export default function MyStuff() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">My Stuff</h1>
        <Suspense fallback={<Loading />}>
          <MyStuffContent />
        </Suspense>
      </div>
    </main>
  )
}

async function MyStuffContent() {
  const myStuff = await getMyStuff();

  if (myStuff.length === 0) {
    return <p>No content found. Please try again later.</p>
  }

  return <ContentGrid items={myStuff} />;
}

