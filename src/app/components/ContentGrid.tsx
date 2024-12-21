import Image from 'next/image'
import Link from 'next/link'

interface ContentItem {
  id: number;
  title: string;
  image: string;
  type: string;
}

interface ContentGridProps {
  items: ContentItem[];
}

export default function ContentGrid({ items }: ContentGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <Link key={item.id} href={`/${item.type}/${item.id}`} className="group">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold">{item.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

