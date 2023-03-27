import { memo } from 'react'

import Image from 'next/image'
import { NextRouter, useRouter } from 'next/router'

import {
  Box,
  Card,
  Typography,
  CardContent,
  CardActionArea,
} from '@mui/material'

import { FavoriteButton } from './buttons'

import { MoviePreview } from '@/types'
import { NO_IMAGE_PLACEHOLDER } from '@/constants'

export interface Props {
  movie: MoviePreview
  isFavorite?: boolean
}

export const MoviePreviewCard = ({ movie, isFavorite = false }: Props) => {
  const router: NextRouter = useRouter()

  const imageURL: string =
    movie.Poster === 'N/A' ? NO_IMAGE_PLACEHOLDER : movie.Poster

  function handleCLick(): void {
    router.push(`/movies/${movie.imdbID}`)
  }

  return (
    <Card onClick={handleCLick}>
      <CardActionArea>
        <FavoriteButton isFavorite={isFavorite} movie={movie} />

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
  )
}
