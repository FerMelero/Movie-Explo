// Servicio para comunicarse con la API de The Movie Database (TMDB).
// La API Key se lee del archivo .env (variable VITE_TMDB_API_KEY), nunca se escribe aquí.

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

// Base para construir la URL de los pósters (w500 = 500px de ancho)
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

// Función auxiliar: hace la petición y lanza un error si algo falla.
// Home.jsx captura ese error y lo muestra al usuario.
async function fetchFromTMDB(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error('Falta la API Key. Añade VITE_TMDB_API_KEY en el archivo .env')
  }

  const query = new URLSearchParams({ api_key: API_KEY, language: 'es-ES', ...params })
  const response = await fetch(`${BASE_URL}${endpoint}?${query}`)

  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar la API`)
  }

  const data = await response.json()
  return data.results
}

// GET /movie/popular -> películas populares
export function getPopularMovies() {
  return fetchFromTMDB('/movie/popular')
}

// GET /search/movie?query=... -> búsqueda por título
export function searchMovies(query) {
  return fetchFromTMDB('/search/movie', { query })
}
