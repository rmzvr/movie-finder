import {
  Box,
  CardActionArea,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { NO_IMAGE_PLACEHOLDER } from '../constants'
import { Props } from '../types/props/MovieListItem'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToFavorite, removeFromFavorite } from '../store/moviesSlice'

export default function MovieListItem({
  movie,
  isFavoriteMovie = false,
  isFavoriteButtonVisible = true,
}: Props) {
  const dispatch = useDispatch()

  const [isFavorite, setIsFavorite] = useState(isFavoriteMovie)

  const imageURL: string =
    movie.Poster === 'N/A' ? NO_IMAGE_PLACEHOLDER : movie.Poster

  function markAsFavorite(e: any): void {
    e.preventDefault()

    dispatch(addToFavorite(movie))
    setIsFavorite((prev) => !prev)
  }

  function unmarkAsFavorite(e: any): void {
    e.preventDefault()

    dispatch(removeFromFavorite({ id: movie.imdbID }))
    setIsFavorite((prev) => !prev)
  }

  return (
    <Grid item xs={12} sm={6} md={2.4} lg={2.4} xl={2.4}>
      <Link href={`/movies/${movie.imdbID}`}>
        <Card sx={{ position: 'relative' }}>
          <IconButton
            sx={{ position: 'absolute', zIndex: '1', right: '0' }}
            onClick={isFavorite ? unmarkAsFavorite : markAsFavorite}
          >
            {isFavoriteButtonVisible ? (
              isFavorite ? (
                <BookmarkIcon />
              ) : (
                <BookmarkBorderIcon />
              )
            ) : (
              ''
            )}
          </IconButton>
          <CardActionArea>
            <Box sx={{ position: 'relative', height: '23rem' }}>
              <Image
                src={imageURL}
                alt={movie.Title}
                fill
                style={{ objectFit: 'cover' }}
                placeholder='blur'
                blurDataURL={NO_IMAGE_PLACEHOLDER}
              />
            </Box>
            <CardContent>
              <Typography gutterBottom variant='h6'>
                {movie.Title}
              </Typography>
              <Typography color='text.secondary' variant='body2'>
                {movie.Year}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  )
}
