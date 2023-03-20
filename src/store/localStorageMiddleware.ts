import { MoviePreview } from '../types/moviePreview'
import favoritesSlice, { addFavorite, removeFavorite } from './favoritesSlice'

export const authMiddleware = (store) => (next) => (action) => {
  if (addFavorite.match(action)) {
    const data = localStorage.getItem('favorites')

    const parsedData = data ? JSON.parse(data) : []

    const favorites = [...parsedData, action.payload]
    localStorage.setItem('favorites', JSON.stringify(favorites))
  } else if (removeFavorite.match(action)) {
    const data = localStorage.getItem('favorites')

    const parsedData = data ? JSON.parse(data) : []

    const favorites = [
      ...parsedData.filter(
        (movie: MoviePreview) => movie.imdbID !== action.payload
      ),
    ]

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  return next(action)
}
