import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { MovieDetails } from '../types/movieDetails'
import { MoviePreview } from '../types/moviePreview'

interface Response {
  Search: MoviePreview[]
  totalResults: string
  Response: string
}

interface Request {
  searchQuery: string
  pageQuery: string
}

export const movieApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://www.omdbapi.com',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getMovieList: builder.query<Response, Request>({
      query(args) {
        const { searchQuery, pageQuery } = args

        return `?apikey=885b04f0${searchQuery && '&s=' + searchQuery}${
          pageQuery && '&page=' + pageQuery
        }`
      },
    }),
    getMovieById: builder.query<MovieDetails, string>({
      query(id) {
        return `?apikey=885b04f0${id && '&plot=full&i=' + id}`
      },
    }),
  }),
})

export const {
  useGetMovieListQuery,
  useGetMovieByIdQuery,
  util: { getRunningQueriesThunk },
} = movieApi

export const { getMovieList, getMovieById } = movieApi.endpoints
