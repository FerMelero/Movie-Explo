// Contexto global de favoritos (Context API).
// Cualquier componente puede leer o modificar los favoritos con el hook useMovieContext().

import { createContext, useContext, useEffect, useState } from 'react'

// 1. createContext: crea el "canal" por el que se comparte el estado
const MovieContext = createContext()

const STORAGE_KEY = 'favorites'

// 3. Hook personalizado para consumir el contexto desde cualquier componente
export function useMovieContext() {
  return useContext(MovieContext)
}

// 2. Provider: envuelve la app (ver App.jsx) y ofrece el estado a todos sus hijos
export function MovieProvider({ children }) {
  // useState: lista de películas favoritas
  const [favorites, setFavorites] = useState([])
  // Indica que ya hemos leído localStorage; evita sobrescribirlo con [] al arrancar
  const [loaded, setLoaded] = useState(false)

  // useEffect (1): al iniciar la app, cargar los favoritos guardados en localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setFavorites(JSON.parse(stored))
    } catch {
      // Si el JSON está corrupto, se empieza con la lista vacía
    }
    setLoaded(true)
  }, [])

  // useEffect (2): guardar en localStorage cada vez que cambian los favoritos
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    }
  }, [favorites, loaded])

  // Añadir una película a favoritos
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie])
  }

  // Quitar una película de favoritos por su id
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId))
  }

  // Saber si una película ya es favorita (para pintar el corazón)
  const isFavorite = (movieId) => favorites.some((movie) => movie.id === movieId)

  // Todo lo que expone el contexto a los componentes
  const value = { favorites, addToFavorites, removeFromFavorites, isFavorite }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
