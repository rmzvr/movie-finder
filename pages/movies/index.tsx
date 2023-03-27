import { useEffect } from 'react'

import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'

import { Container, Stack } from '@mui/material'

import { Header, MovieList, ResultInfo } from '@/components'

import { MoviePreview } from '@/types'
import { useMediaBreakPoints, useRouterQueries, useScrollToTop } from '@/hooks'

import {
  getMovieList,
  useGetMovieListQuery,
  getRunningQueriesThunk,
} from '@/store/movieApi'

import { wrapper } from '@/store/store'

export default function Movies() {
  const { search: searchQuery, page: pageQuery } = useRouterQueries(
    'search',
    'page'
  )

  const { data } = useGetMovieListQuery({
    searchQuery,
    pageQuery,
  })

  const movies: MoviePreview[] = data?.Search ?? []

  const totalResults: number = Number(data?.totalResults ?? 0)

  const scrollToTop = useScrollToTop()
  const [isPhonesMediaQuery] = useMediaBreakPoints()

  useEffect(() => {
    isPhonesMediaQuery && scrollToTop()
  }, [pageQuery])

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>

      <Container maxWidth='xl'>
        <Stack spacing={3} my={3}>
          <Header
            pageQuery={pageQuery}
            searchQuery={searchQuery}
            totalResults={totalResults}
          />
          <ResultInfo searchQuery={searchQuery} totalResults={totalResults} />
          <MovieList movies={movies} />
        </Stack>
      </Container>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const { search: searchQuery = '', page: pageQuery = '1' } = context.query

    store.dispatch(
      getMovieList.initiate({
        searchQuery: searchQuery.toString(),
        pageQuery: pageQuery.toString(),
      })
    )

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
)
