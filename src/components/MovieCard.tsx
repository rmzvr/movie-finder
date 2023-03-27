import { createContext, useContext } from 'react'

import Image from 'next/image'

import { Box, Button, Grid, Rating, Stack, Typography } from '@mui/material'

import { MovieDetails } from '@/types'
import { NO_IMAGE_PLACEHOLDER } from '@/constants'

const MovieCardContext = createContext<MovieDetails | any>(null)

export const MovieCard = ({ movie, children }: any) => {
  return (
    <MovieCardContext.Provider value={movie}>
      <Box>
        <Grid container spacing={5}>
          {children}
        </Grid>
      </Box>
    </MovieCardContext.Provider>
  )
}

MovieCard.ImageSection = ({ children }: any) => {
  return (
    <Grid item xs={12} md={4}>
      {children}
    </Grid>
  )
}

MovieCard.Image = () => {
  const movie = useContext(MovieCardContext)

  const imageURL: string = movie?.Poster
    ? movie.Poster === 'N/A'
      ? NO_IMAGE_PLACEHOLDER
      : movie.Poster
    : ''

  return (
    <Box
      position='relative'
      minHeight='530px'
      borderRadius='10px'
      overflow='hidden'
    >
      <Image
        src={imageURL}
        alt={movie.Title}
        style={{ objectFit: 'cover' }}
        fill
      />
    </Box>
  )
}

MovieCard.ContentSection = ({ children }: any) => (
  <Grid item xs={12} md={8}>
    <Stack spacing={2}>{children}</Stack>
  </Grid>
)

MovieCard.Title = () => {
  const movie = useContext(MovieCardContext)

  return (
    <Typography variant='h3' component='h1'>
      {movie?.Title ?? ''}
    </Typography>
  )
}

MovieCard.Ratings = () => {
  const movie = useContext(MovieCardContext)

  return (
    <Stack direction='row' alignItems='center' gap='0.6rem'>
      <Typography variant='h5' fontWeight='bold'>
        {movie.imdbRating}
      </Typography>

      <Rating
        name='read-only'
        value={parseInt(movie.imdbRating) / 2}
        precision={0.5}
        readOnly
      />
    </Stack>
  )
}

MovieCard.HorizontalList = ({ children }: any) => (
  <Grid container columns={3}>
    {children}
  </Grid>
)

MovieCard.Duration = () => {
  const movie = useContext(MovieCardContext)

  return (
    <Grid item xs={1}>
      <Typography color='gray' variant='h6'>
        Length
      </Typography>
      <Typography variant='h6' fontWeight='bold'>
        {movie?.Runtime ?? ''}
      </Typography>
    </Grid>
  )
}

MovieCard.Language = () => {
  const movie = useContext(MovieCardContext)

  const languages: string[] = movie?.Language.split(', ') ?? []

  return (
    <Grid item xs={1}>
      <Typography color='gray' variant='h6'>
        Language
      </Typography>
      <Typography variant='h6' fontWeight='bold'>
        {languages[0]}
      </Typography>
    </Grid>
  )
}

MovieCard.Date = () => {
  const movie = useContext(MovieCardContext)

  return (
    <Grid item xs={1}>
      <Typography color='gray' variant='h6'>
        Year
      </Typography>
      <Typography variant='h6' fontWeight='bold'>
        {movie.Year}
      </Typography>
    </Grid>
  )
}

MovieCard.Genres = () => {
  const movie = useContext(MovieCardContext)

  const genres: string[] = movie?.Genre.split(', ') ?? []

  return (
    <Box>
      <Typography variant='h6'></Typography>
      <Stack direction='row' gap='0.6rem'>
        {genres.map((genre: string) => (
          <Button key={genre} variant='outlined' size='small' disabled>
            {genre}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}

MovieCard.Synopsis = () => {
  const movie = useContext(MovieCardContext)

  return (
    <Box>
      <Typography variant='h6'>Synopsis</Typography>
      <Typography variant='body1'>{movie.Plot}</Typography>
    </Box>
  )
}

MovieCard.Actors = () => {
  const movie = useContext(MovieCardContext)

  const actors: string[] = movie?.Actors.split(', ') ?? []

  return (
    <Box>
      <Typography variant='h6'>Actors</Typography>
      <Stack direction='row' gap='0.6rem'>
        {actors.map((actor: string) => (
          <Button key={actor} variant='outlined' size='small' disabled>
            {actor}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}
