import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MoviePreview } from '../types/moviePreview'
import { AppState } from './store'

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
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = [
        ...state.favorites.filter((movie) => movie.imdbID !== action.payload),
      ]
    },
  },
})

export const selectFavorites = (state: AppState) => state.favorites.favorites

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
