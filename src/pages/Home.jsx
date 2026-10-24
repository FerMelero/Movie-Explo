// Página principal: películas populares + búsqueda por título.

import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard.jsx'
import { getPopularMovies, searchMovies } from '../services/api.js'
import '../css/Home.css'

function Home() {
  // Estados pedidos en el enunciado
  const [searchQuery, setSearchQuery] = useState('') // texto del input
  const [movies, setMovies] = useState([]) // películas mostradas
  const [loading, setLoading] = useState(true) // indicador de carga
  const [error, setError] = useState(null) // mensaje de error

  // useEffect: al montar Home, cargar las películas populares
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setMovies(await getPopularMovies())
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadPopularMovies()
  }, [])

  // Al enviar el formulario: buscar por título (o volver a populares si está vacío)
  const handleSearch = async (event) => {
    event.preventDefault() // evita que el formulario recargue la página
    const query = searchQuery.trim()

    setLoading(true)
    setError(null)
    try {
      const results = query ? await searchMovies(query) : await getPopularMovies()
      setMovies(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar películas por título..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {/* Error de la API */}
      {error && <p className="status-message error-message">{error}</p>}

      {/* Indicador de carga, o resultados */}
      {loading ? (
        <p className="loading">Cargando...</p>
      ) : (
        <>
          {!error && movies.length === 0 && (
            <p className="status-message">No se han encontrado películas.</p>
          )}
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
