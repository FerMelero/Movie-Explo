// Componente principal: define las rutas (React Router) y envuelve la app con el contexto.

import { Route, Routes } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext.jsx'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'

function App() {
  return (
    // Todo lo que está dentro puede usar useMovieContext()
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
