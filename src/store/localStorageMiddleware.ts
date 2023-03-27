import { Middleware } from 'redux'
import { MoviePreview } from '../types/moviePreview'
import { addFavorite, removeFavorite } from './favoritesSlice'

export const localStorageMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const { type, payload } = action

    if (type === addFavorite.type) {
      try {
        const favorites = [...(await getFavoritesFromLocalStorage()), payload]
        await saveFavoritesToLocalStorage(favorites)
      } catch (error) {
        console.error('Error adding favorite:', error)
      }
    } else if (type === removeFavorite.type) {
      try {
        const favorites = await getFavoritesFromLocalStorage()
        const filteredFavorites = favorites.filter(
          (movie: MoviePreview) => movie.imdbID !== payload.imdbID
        )
        await saveFavoritesToLocalStorage(filteredFavorites)
      } catch (error) {
        console.error('Error removing favorite:', error)
      }
    }

    return next(action)
  }

const getFavoritesFromLocalStorage = async (): Promise<MoviePreview[]> => {
  try {
    const data = await localStorage.getItem('favorites')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error getting favorites from local storage:', error)
    return []
  }
}

const saveFavoritesToLocalStorage = async (favorites: MoviePreview[]) => {
  try {
    await localStorage.setItem('favorites', JSON.stringify(favorites))
  } catch (error) {
    console.error('Error saving favorites to local storage:', error)
  }
}
