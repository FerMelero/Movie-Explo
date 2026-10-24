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

        {/* Overlay: solo se ve al pasar el ratón (ver MovieCard.css) */}
        <div className="movie-overlay">
          <button
            type="button"
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={handleFavorite}
            aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            {/* Corazón en SVG: relleno si es favorito, solo borde si no */}
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={favorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
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
