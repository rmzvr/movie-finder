import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './store'
import { MoviePreview } from '@/types'

interface FavoritesState {
  favorites: MoviePreview[]
}

const initialState: FavoritesState = {
  favorites: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<MoviePreview[]>) {
      state.favorites = [...action.payload]
    },
    addFavorite(state, action: PayloadAction<MoviePreview>) {
      state.favorites = [...state.favorites, action.payload]
    },
    removeFavorite(state, action: PayloadAction<MoviePreview>) {
      state.favorites = [
        ...state.favorites.filter(
          (movie: MoviePreview) => movie.imdbID !== action.payload.imdbID
        ),
      ]
    },
  },
})

export const selectFavorites = (state: AppState) => state.favorites.favorites

export const { addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions

export default favoritesSlice.reducer
