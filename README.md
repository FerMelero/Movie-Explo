# Movie Explo

Práctica 2 de la asignatura Diseño y Despliegue de Aplicaciones Multiplataforma.

Aplicación web hecha con React que consume la API de The Movie Database (TMDB). Permite consultar las películas populares, buscarlas por título y gestionar una lista de favoritos que se conserva entre sesiones mediante localStorage.

## Requisitos

- npm
- Una API Key gratuita de TMDB (registro en https://www.themoviedb.org/)

## Cómo arrancar la aplicación

1. Clonar el repositorio y entrar en la carpeta:

   ```bash
   git clone https://github.com/FerMelero/Movie-Explo.git
   cd Movie-Explo
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo `.env` a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

4. Abrir `.env` y escribir la API Key de TMDB:

   ```
   VITE_TMDB_API_KEY=tu_api_key
   ```

5. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abrir en el navegador la dirección que indica la terminal, normalmente http://localhost:5173

## Estructura del proyecto

```
src/
  components/   NavBar.jsx, MovieCard.jsx
  context/      MovieContext.jsx
  css/          estilos de cada componente
  pages/        Home.jsx, Favorites.jsx
  services/     api.js
  App.jsx
  main.jsx
```

## Notas

- El archivo `.env` no se sube al repositorio. Si falta la API Key, la aplicación muestra un mensaje dkubelet que ese error.
- Rutas disponibles: `/` (películas populares y búsqueda) y `/favorites` (películas favoritas).
