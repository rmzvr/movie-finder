import { Middleware, Dispatch, AnyAction } from 'redux'
import { MoviePreview } from '../types/moviePreview'
import { addFavorite, removeFavorite } from './favoritesSlice'

type FavoritesState = {
  favorites: MoviePreview[]
}

type AppState = {
  favorites: FavoritesState
}

export const localStorageMiddleware: Middleware<
  {},
  AppState,
  Dispatch<AnyAction>
> = (store) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  const { type, payload } = action

  if (type === addFavorite.type) {
    const favorites = [...store.getState().favorites.favorites, payload]

    saveFavoritesToLocalStorage(favorites)
  } else if (type === removeFavorite.type) {
    const favorites = [
      ...store
        .getState()
        .favorites.favorites.filter(
          (movie: MoviePreview) => movie.imdbID !== payload.imdbID
        ),
    ]

    saveFavoritesToLocalStorage(favorites)
  }

  return next(action)
}

const saveFavoritesToLocalStorage = (favorites: MoviePreview[]) =>
  localStorage.setItem('favorites', JSON.stringify(favorites))
