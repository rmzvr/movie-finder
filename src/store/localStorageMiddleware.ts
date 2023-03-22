import { MoviePreview } from '../types/moviePreview'
import { addFavorite, removeFavorite } from './favoritesSlice'

export const localStorageMiddleware =
  (store: any) => (next: any) => async (action: any) => {
    if (action.type === addFavorite.type) {
      const data = await getFavoritesFromLocalStorage()
      const favorites = [...data, action.payload]

      await saveFavoritesToLocalStorage(favorites)
    } else if (action.type === removeFavorite.type) {
      const data = await getFavoritesFromLocalStorage()
      const favorites = data.filter(
        (movie: MoviePreview) => movie.imdbID !== action.payload
      )

      await saveFavoritesToLocalStorage(favorites)
    }

    return next(action)
  }

const getFavoritesFromLocalStorage = async (): Promise<MoviePreview[]> => {
	const data = await Promise.resolve(localStorage.getItem('favorites'))
	
  return JSON.parse(data || '[]')
}

const saveFavoritesToLocalStorage = async (favorites: MoviePreview[]) => {
  await Promise.resolve(
    localStorage.setItem('favorites', JSON.stringify(favorites))
  )
}
