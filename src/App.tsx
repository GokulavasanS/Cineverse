import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import TVShows from './pages/TVShows'
import Movies from './pages/Movies'
import MyStuff from './pages/MyStuff'
import Search from './pages/Search'
import ContentPage from './pages/ContentPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/my-stuff" element={<MyStuff />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:type/:id" element={<ContentPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

