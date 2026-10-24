// Página de favoritos: muestra las películas guardadas en el contexto (y localStorage).

import MovieCard from '../components/MovieCard.jsx'
import { useMovieContext } from '../context/MovieContext.jsx'
import '../css/Home.css' // reutiliza los estilos de la cuadrícula

function Favorites() {
  const { favorites } = useMovieContext()

  // Mensaje cuando no hay ninguna favorita
  if (favorites.length === 0) {
    return (
      <div className="favorites">
        <p className="status-message">
          Todavía no tienes películas favoritas. Pasa el ratón sobre un póster en Home y pulsa el corazón.
        </p>
      </div>
    )
  }

  return (
    <div className="favorites">
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  )
}

export default Favorites
