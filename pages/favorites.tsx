import { Container, Grid, Typography, Stack, Box } from '@mui/material'
import MovieListItem from '../src/components/MovieListItem'
import { MoviePreview } from '../src/types/moviePreview'
import { useAppSelector } from '../src/hooks/useAppSelector'
import { selectFavorites, setFavorites } from '../src/store/favoritesSlice'
import { useEffect } from 'react'
import { useAppDispatch } from '../src/hooks/useAppDispatch'
import NavigateBackButton from '../src/components/NavigateBackButton'

export default function Favorites() {
  const dispatch = useAppDispatch()

  const favoriteMovies: MoviePreview[] = useAppSelector(selectFavorites)

  useEffect(() => {
    const data = localStorage.getItem('favorites')
    const parsedData = data ? JSON.parse(data) : []

    dispatch(setFavorites(parsedData))
  }, [])

  return (
    <>
      <Container maxWidth='xl'>
        <Stack spacing={3} my={3}>
          <Box>
            <NavigateBackButton />
          </Box>

          {!favoriteMovies.length && (
            <Typography variant='h5' component='h5'>
              No favorite movies...
            </Typography>
          )}

          <Box>
            <Grid
              container
              columns={{ xs: 1, sm: 3, md: 4, lg: 5 }}
              spacing={5}
            >
              {favoriteMovies.map((movie: MoviePreview) => (
                <MovieListItem key={movie.imdbID} movie={movie} />
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </>
  )
}
