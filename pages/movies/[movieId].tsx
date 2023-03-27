import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'

import { Box, Container, Stack } from '@mui/material'

import { MovieCard } from '@/components'
import { NavigateButton } from '@/components/buttons'

import { useRouterQueries } from '@/hooks'

import {
  getMovieById,
  getRunningQueriesThunk,
  useGetMovieByIdQuery,
} from '@/store/movieApi'

import { wrapper } from '@/store/store'

export default function MovieDetails() {
  const { movieId } = useRouterQueries('movieId')

  const { data: movie } = useGetMovieByIdQuery(movieId)

  return (
    <>
      <Head>
        <title>{movie?.Title ?? ''} | Movie</title>
      </Head>

      <Container maxWidth='lg'>
        <Stack spacing={3} my={3}>
          <Box>
            <NavigateButton text='Go Back' />
          </Box>

          <MovieCard movie={movie}>
            <MovieCard.ImageSection>
              <MovieCard.Image />
            </MovieCard.ImageSection>

            <MovieCard.ContentSection>
              <MovieCard.Title />

              <MovieCard.Ratings />

              <MovieCard.HorizontalList>
                <MovieCard.Duration />
                <MovieCard.Language />
                <MovieCard.Date />
              </MovieCard.HorizontalList>

              <MovieCard.Genres />

              <MovieCard.Synopsis />

              <MovieCard.Actors />
            </MovieCard.ContentSection>
          </MovieCard>
        </Stack>
      </Container>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const movieId = context.params?.movieId?.toString() ?? ''

    store.dispatch(getMovieById.initiate(movieId))

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
)
