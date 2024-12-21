import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-4">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <Image src="/hulu-logo.svg" alt="Hulu" width={60} height={20} />
        </Link>
        <Link href="#" className="text-sm font-bold hover:text-gray-300 transition-colors">
          LOG IN
        </Link>
      </nav>
    </header>
  )
}

