import { useState, MouseEvent } from 'react'

import { useDispatch } from 'react-redux'
import { addToFavorite, removeFromFavorite } from '../store/movieApi'

import {
  Box,
  CardActionArea,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material'

import Image from 'next/image'

import FavoriteButton from './FavoriteButton'

import { NO_IMAGE_PLACEHOLDER } from '../constants'

import { Props } from '../types/props/MovieListItem'
import { NextRouter, useRouter } from 'next/router'

export default function MovieListItem({
  movie,
  isFavoriteMovie = false,
  isFavoriteButtonVisible = true,
}: Props) {
  const router: NextRouter = useRouter()
  const dispatch = useDispatch()

  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteMovie)

  const imageURL: string =
    movie.Poster === 'N/A' ? NO_IMAGE_PLACEHOLDER : movie.Poster

  function toggleFavorite(
    event: MouseEvent<HTMLButtonElement>,
    isFavorite: boolean
  ): void {
    event.stopPropagation()

    if (isFavorite) {
      dispatch(removeFromFavorite({ id: movie.imdbID }))
    } else {
      dispatch(addToFavorite(movie))
    }

    setIsFavorite((prev) => !prev)
  }

  function navigateToMovie(): void {
    router.push(`/movies/${movie.imdbID}`)
  }

  return (
    <Grid item xs={1}>
      <Card onClick={navigateToMovie}>
        <CardActionArea>
          {isFavoriteButtonVisible && (
            <FavoriteButton
              isFavorite={isFavorite}
              handleClick={toggleFavorite}
            />
          )}

          <Box position='relative' height='23rem'>
            <Image
              src={imageURL}
              alt={movie.Title}
              fill
              placeholder='blur'
              blurDataURL={NO_IMAGE_PLACEHOLDER}
              style={{ objectFit: 'cover' }}
            />
          </Box>

          <CardContent>
            <Typography gutterBottom variant='h6' component='h2'>
              {movie.Title}
            </Typography>

            <Typography variant='subtitle1' component='h3'>
              {movie.Year}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
