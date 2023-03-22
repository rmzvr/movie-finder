import Head from 'next/head'
import Image from 'next/image'
import { GetServerSidePropsContext } from 'next'
import { NextRouter, useRouter } from 'next/router'

import { NO_IMAGE_PLACEHOLDER } from '../../src/constants'

import MovieCategoryItem from '../../src/components/MovieCategoryItem'

import { Box, Button, Container, Typography, Grid, Stack } from '@mui/material'
import TitleSection from '../../src/components/MovieDetails/TitleSection'
import RatingSection from '../../src/components/MovieDetails/RatingSection'
import DetailsList from '../../src/components/MovieDetails/DetailsList'
import DetailsListItem from '../../src/components/MovieDetails/DetailsListItem'
import { wrapper } from '../../src/store/store'
import {
  getMovieById,
  getRunningQueriesThunk,
  useGetMovieByIdQuery,
} from '../../src/store/movieApi'
import NavigateBackButton from '../../src/components/NavigateBackButton'

export default function MovieDetails() {
  const router: NextRouter = useRouter()

  const movieId: string = router.query?.movieId?.toString() ?? ''

  const { data: movie } = useGetMovieByIdQuery(movieId)

  const imageURL: string = movie?.Poster
    ? movie.Poster === 'N/A'
      ? NO_IMAGE_PLACEHOLDER
      : movie.Poster
    : ''

  const genres: string[] = movie?.Genre.split(', ') ?? []
  const actors: string[] = movie?.Actors.split(', ') ?? []
  const languages: string[] = movie?.Language.split(', ') ?? []

  return (
    <>
      <Head>
        <title>{movie?.Title ?? ''} | Movie</title>
      </Head>

      <Container maxWidth='lg'>
        <Stack spacing={3} my={3}>
          <Box>
            <NavigateBackButton />
          </Box>

          <Box>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Box
                  position='relative'
                  minHeight='530px'
                  borderRadius='10px'
                  overflow='hidden'
                >
                  <Image
                    src={imageURL}
                    alt={movie?.Title ?? ''}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack spacing={2}>
                  <TitleSection title={movie?.Title ?? ''} />
                  <RatingSection rating={movie?.imdbRating ?? ''} />

                  <DetailsList>
                    <DetailsListItem
                      title='Length'
                      content={movie?.Runtime ?? ''}
                    />
                    <DetailsListItem title='Language' content={languages[0]} />
                    <DetailsListItem title='Year' content={movie?.Year ?? ''} />
                  </DetailsList>

                  <MovieCategoryItem title='Genres'>
                    <Stack direction='row' gap='0.6rem'>
                      {genres.map((genre: string) => (
                        <Button
                          key={genre}
                          variant='outlined'
                          size='small'
                          disabled
                        >
                          {genre}
                        </Button>
                      ))}
                    </Stack>
                  </MovieCategoryItem>

                  <MovieCategoryItem title='Synopsis'>
                    <Typography variant='body1'>{movie?.Plot ?? ''}</Typography>
                  </MovieCategoryItem>

                  <MovieCategoryItem title='Actors'>
                    <Stack direction='row' gap='0.6rem'>
                      {actors.map((actor: string) => (
                        <Button
                          key={actor}
                          variant='outlined'
                          size='small'
                          disabled
                        >
                          {actor}
                        </Button>
                      ))}
                    </Stack>
                  </MovieCategoryItem>
                </Stack>
              </Grid>
            </Grid>
          </Box>
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
