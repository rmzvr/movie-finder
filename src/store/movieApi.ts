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
  search: string
  page: string
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
        const { search, page } = args

        return `?apikey=885b04f0${search && '&s=' + search}${
          page && '&page=' + page
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
