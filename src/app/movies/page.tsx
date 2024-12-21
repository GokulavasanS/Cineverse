import { Suspense } from 'react';
import { fetchFromTMDB, getTMDBImageUrl } from '../utils/tmdb';
import ContentGrid from '../components/ContentGrid';
import Loading from '../components/Loading';

async function getMovies() {
  try {
    const data = await fetchFromTMDB('/movie/popular');
    return data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      image: getTMDBImageUrl(movie.poster_path),
      type: 'movie'
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export default function Movies() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Movies</h1>
        <Suspense fallback={<Loading />}>
          <MoviesContent />
        </Suspense>
      </div>
    </main>
  )
}

async function MoviesContent() {
  const movies = await getMovies();

  if (movies.length === 0) {
    return <p>No movies found. Please try again later.</p>
  }

  return <ContentGrid items={movies} />;
}

