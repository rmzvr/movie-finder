import { MoviePreviewCard } from './MoviePreviewCard'
import { Box, Grid } from '@mui/material'

import { MoviePreview } from '@/types'

import {
  useAppDispatch,
  useAppSelector,
  useFavoritesFromLocalStorage,
} from '@/hooks'

import { selectFavorites } from '@/store/favoritesSlice'

interface Props {
  movies: MoviePreview[]
}

export const MovieList = ({ movies }: Props) => {
  useFavoritesFromLocalStorage()

  const favoriteMovies: MoviePreview[] = useAppSelector(selectFavorites)

  return (
    <Box>
      <Grid container columns={{ xs: 1, sm: 3, md: 4, lg: 5 }} spacing={5}>
        {movies.map((movie: MoviePreview) => (
          <Grid item xs={1} key={movie.imdbID}>
            <MoviePreviewCard
              movie={movie}
              isFavorite={
                !!favoriteMovies.find(
                  (m: MoviePreview) => m.imdbID === movie.imdbID
                )
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
