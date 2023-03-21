import { AnyAction, Dispatch, Store } from '@reduxjs/toolkit'
import { MoviePreview } from '../types/moviePreview'
import { addFavorite, removeFavorite } from './favoritesSlice'

export const localStorageMiddleware =
  (store: Store) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
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
