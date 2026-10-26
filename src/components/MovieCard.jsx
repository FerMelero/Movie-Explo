// Tarjeta individual de película: póster, título, año y botón de favorito (overlay en hover).

import { IMAGE_BASE_URL } from '../services/api.js'
import { useMovieContext } from '../context/MovieContext.jsx'
import '../css/MovieCard.css'

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
  const favorite = isFavorite(movie.id)

  // El año es lo que va antes del primer guion de "2024-05-17"
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'Sin fecha'

  // Si ya es favorita se quita; si no, se añade
  const handleFavorite = () => {
    if (favorite) removeFromFavorites(movie.id)
    else addToFavorites(movie)
  }

  return (
    <article className="movie-card">
      <div className="movie-poster">
        {movie.poster_path ? (
          <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
        ) : (
          <div className="no-poster">Sin póster</div>
        )}

        {/* Overlay que solo se ve al pasar el ratón (ver MovieCard.css) */}
        <div className="movie-overlay">
          <button
            type="button"
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={handleFavorite}
            aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            {favorite ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{year}</p>
      </div>
    </article>
  )
}

export default MovieCard
