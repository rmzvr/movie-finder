import { useState, MouseEvent, useEffect } from 'react'

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
import { useAppDispatch } from '../hooks/useAppDispatch'
import { addFavorite, removeFavorite } from '../store/favoritesSlice'

export default function MovieListItem({
  movie,
  isFavoriteMovie = false,
  isFavoriteButtonVisible = false,
}: Props) {
  const router: NextRouter = useRouter()
  const dispatch = useAppDispatch()

  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteMovie)

  useEffect(() => {
    setIsFavorite(isFavoriteMovie)
  }, [isFavoriteMovie])

  const imageURL: string =
    movie.Poster === 'N/A' ? NO_IMAGE_PLACEHOLDER : movie.Poster

  function toggleFavorite(
    event: MouseEvent<HTMLButtonElement>,
    isFavorite: boolean
  ): void {
    event.stopPropagation()

    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID))
    } else {
      dispatch(addFavorite(movie))
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
