import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFromTMDB, getTMDBImageUrl } from '../../utils/tmdb';
import VideoPlayer from '../../components/VideoPlayer';
import ContentGrid from '../../components/ContentGrid';
import Loading from '../../components/Loading';

async function getContentDetails(type: string, id: string) {
  try {
    const data = await fetchFromTMDB(`/${type}/${id}`);
    const videoUrl = await getVideoUrlFromWordPress(id);
    return {
      id: data.id,
      title: type === 'movie' ? data.title : data.name,
      type,
      image: getTMDBImageUrl(data.poster_path),
      backdrop: getTMDBImageUrl(data.backdrop_path, 'original'),
      description: data.overview,
      videoSrc: videoUrl,
      rating: data.vote_average.toFixed(1),
      genre: data.genres[0]?.name || 'N/A',
      releaseDate: type === 'movie' ? data.release_date : data.first_air_date,
      ...(type === 'tv' && { seasons: data.number_of_seasons }),
    };
  } catch (error) {
    console.error('Error fetching content details:', error);
    return null;
  }
}

async function getRelatedContent(type: string, id: string) {
  try {
    const data = await fetchFromTMDB(`/${type}/${id}/similar`);
    return data.results.slice(0, 4).map((item: any) => ({
      id: item.id,
      title: type === 'movie' ? item.title : item.name,
      image: getTMDBImageUrl(item.poster_path),
      type,
    }));
  } catch (error) {
    console.error('Error fetching related content:', error);
    return [];
  }
}

async function getVideoUrlFromWordPress(id: string) {
  // Implement the logic to fetch the video URL from your WordPress ACF field
  // This is a placeholder implementation
  try {
    const response = await fetch(`https://your-wordpress-site.com/wp-json/acf/v3/movies/${id}`);
    const data = await response.json();
    return data.acf.video_url;
  } catch (error) {
    console.error('Error fetching video URL:', error);
    return '';
  }
}

export default function ContentPage({ params }: { params: { type: string, id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <ContentPageContent params={params} />
    </Suspense>
  );
}

async function ContentPageContent({ params }: { params: { type: string, id: string } }) {
  const content = await getContentDetails(params.type, params.id);
  const relatedContent = await getRelatedContent(params.type, params.id);

  if (!content) {
    return <p className="text-center text-2xl mt-8">Content not found. Please try again later.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="relative h-[50vh] mb-8">
        <Image
          src={content.backdrop}
          alt={content.title}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="mb-4">{content.description}</p>
            <div className="mb-4">
              <span className="font-bold">Type:</span> {content.type === 'tv' ? 'TV Show' : 'Movie'}
            </div>
            {content.type === 'tv' && (
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
            <div className="mb-4">
              <span className="font-bold">Release Date:</span> {content.releaseDate}
            </div>
          </div>
          <div>
            <VideoPlayer src={content.videoSrc} poster={content.image} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">You may also like</h2>
          <ContentGrid items={relatedContent} />
        </div>
      </div>
    </main>
  );
}

