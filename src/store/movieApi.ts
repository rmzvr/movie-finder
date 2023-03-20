import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

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
    getMovieList: builder.query<any, any | void>({
      query(args) {
        const { search, page } = args

        return `?apikey=885b04f0${search && '&s=' + search}${
          page && '&page=' + page
        }`
      },
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetMovieListQuery,
  util: { getRunningQueriesThunk },
} = movieApi

// export endpoints for use in SSR
export const { getMovieList } = movieApi.endpoints
