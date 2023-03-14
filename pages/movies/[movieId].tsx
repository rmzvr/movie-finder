import Head from 'next/head'
import Image from 'next/image'
import { GetServerSidePropsContext } from 'next'
import { NextRouter, useRouter } from 'next/router'

import { NO_IMAGE_PLACEHOLDER } from '../../constants'
import { Props } from '../../types/props/MovieDetail'

import MovieCategoryItem from '../../components/MovieCategoryItem'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Stack,
} from '@mui/material'
import TitleSection from '../../components/MovieDetails/TitleSection'
import RatingSection from '../../components/MovieDetails/RatingSection'
import DetailsList from '../../components/MovieDetails/DetailsList'
import DetailsListItem from '../../components/MovieDetails/DetailsListItem'

export default function MovieDetails({ movie }: Props) {
  const router: NextRouter = useRouter()

  const imageURL: string =
    movie.Poster === 'N/A' ? NO_IMAGE_PLACEHOLDER : movie.Poster

  const genres = movie.Genre.split(', ')
  const actors = movie.Actors.split(', ')
  const languages = movie.Language.split(', ')

  function navigateBack(): void {
    router.back()
  }

  return (
    <>
      <Head>
        <title>Movie | {movie.Title}</title>
      </Head>

      <Container maxWidth='lg'>
        <Stack alignItems='start' spacing={3} my={3}>
          <Button
            variant='outlined'
            startIcon={<ArrowBackIosNewIcon fontSize='small' />}
            onClick={navigateBack}
          >
            Go back
          </Button>

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
                    alt={movie.Title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack spacing={2}>
                  <TitleSection title={movie.Title} />
                  <RatingSection rating={movie.imdbRating} />

                  <DetailsList>
                    <DetailsListItem title='Length' content={movie.Runtime} />
                    <DetailsListItem title='Language' content={languages[0]} />
                    <DetailsListItem title='Year' content={movie.Year} />
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
                    <Typography variant='body1'>{movie.Plot}</Typography>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const movieId = context.params?.movieId

  const res = await fetch(
    `${process.env.DB_HOST}?apikey=${process.env.API_KEY}&i=${movieId}&plot=full`
  )

  const movie = await res.json()

  return {
    props: {
      movie,
    },
  }
}
