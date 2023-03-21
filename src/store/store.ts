import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { movieApi } from './movieApi'
import favoritesReducer from '../store/favoritesSlice'
import { localStorageMiddleware } from './localStorageMiddleware'

const makeStore = () =>
  configureStore({
    reducer: {
      favorites: favoritesReducer,
      [movieApi.reducerPath]: movieApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        movieApi.middleware,
        localStorageMiddleware
      ),
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)
