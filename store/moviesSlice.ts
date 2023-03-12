import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'
import { HYDRATE } from 'next-redux-wrapper'

// Type for our state
export interface moviesState {
  movies: any[]
}

// Initial state
const initialState: moviesState = {
  movies: [],
}

// Actual Slice
export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorite(state, action) {
      state.movies = [...state.movies, action.payload]
    },
    removeFromFavorite(state, action) {
      state.movies = [
        ...state.movies.filter((movie) => movie.imdbID !== action.payload.id),
      ]
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.movies,
      }
    },
  },
})

export const { addToFavorite, removeFromFavorite } = moviesSlice.actions

export const selectMovies = (state: AppState) => state.movies.movies

export default moviesSlice.reducer
