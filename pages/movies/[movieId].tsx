import Image from 'next/image'
import { GetServerSidePropsContext } from 'next'
import { Box, Button, Container, Rating, Typography, Grid } from '@mui/material'
import { NO_IMAGE_PLACEHOLDER } from '../../constants'
import { Props } from '../../types/props/MovieDetail'
import MovieCategoryItem from '../../components/MovieCategoryItem'
import MovieCategorySubList from '../../components/MovieCategorySubList'
import MovieCategorySubItem from '../../components/MovieCategorySubItem'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { NextRouter, useRouter } from 'next/router'
import Head from 'next/head'
import { join } from 'path'

export default function MovieDetail({ movie }: Props) {
  const router: NextRouter = useRouter()

  const imageURL: string =
    movie.Poster === 'N/A' ? NO_IMAGE_PLACEHOLDER : movie.Poster

  function navigateBack(): void {
    router.back()
  }

  return (
    <>
      <Head>
        <title>Movie | {movie.Title}</title>
      </Head>
      <Container maxWidth='lg'>
        <Grid container flexDirection='column' minHeight='100vh'>
          <Grid item marginTop='2rem'>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '2rem',
              }}
            >
              <Button
                variant='outlined'
                startIcon={<ArrowBackIosNewIcon fontSize='small' />}
                onClick={navigateBack}
              >
                Go back
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            flexGrow='1'
            display='flex'
            justifyContent='center'
            alignItems='center'
            marginBottom='2rem'
          >
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
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

              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant='h3' component='h1'>
                      {movie.Title}
                    </Typography>
                  </Grid>

                  <Grid item display='flex' gap='1rem' alignItems='center'>
                    <Typography variant='h5' fontWeight='bold'>
                      {movie.imdbRating}
                    </Typography>
                    <Rating
                      name='read-only'
                      value={parseInt(movie.imdbRating) / 2}
                      precision={0.5}
                      readOnly
                    />
                  </Grid>

                  <MovieCategorySubList>
                    <MovieCategorySubItem
                      title='Length'
                      content={movie.Runtime}
                    />
                    <MovieCategorySubItem
                      title='Language'
                      content={movie.Language.split(', ')[0]}
                    />
                    <MovieCategorySubItem title='Year' content={movie.Year} />
                  </MovieCategorySubList>

                  <MovieCategoryItem title='Genres'>
                    <Box display='flex' gap='0.6rem' mt='0.2rem'>
                      {movie.Genre.split(', ').map((genre: string) => (
                        <Button
                          key={genre}
                          variant='outlined'
                          size='small'
                          disabled
                        >
                          {genre}
                        </Button>
                      ))}
                    </Box>
                  </MovieCategoryItem>

                  <MovieCategoryItem title='Synopsis'>
                    <Typography variant='subtitle1'>{movie.Plot}</Typography>
                  </MovieCategoryItem>

                  <MovieCategoryItem title='Actors'>
                    <Box display='flex' gap='0.6rem' mt='0.2rem'>
                      {movie.Actors.split(', ').map((actor: string) => (
                        <Button
                          key={actor}
                          variant='outlined'
                          size='small'
                          disabled
                        >
                          {actor}
                        </Button>
                      ))}
                    </Box>
                  </MovieCategoryItem>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
