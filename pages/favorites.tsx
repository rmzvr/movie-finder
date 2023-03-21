import { Container, Grid, Button, Typography, Stack, Box } from '@mui/material'
import MovieListItem from '../src/components/MovieListItem'
import { MoviePreview } from '../src/types/moviePreview'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { NextRouter, useRouter } from 'next/router'
import { useAppSelector } from '../src/hooks/useAppSelector'
import { selectFavorites, setFavorites } from '../src/store/favoritesSlice'
import { useEffect } from 'react'
import { useAppDispatch } from '../src/hooks/useAppDispatch'

export default function Favorites() {
  const dispatch = useAppDispatch()

  const router: NextRouter = useRouter()

  const favoriteMovies = useAppSelector(selectFavorites)

  function navigateBack(): void {
    router.back()
  }

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
            <Button
              variant='outlined'
              onClick={navigateBack}
              startIcon={<ArrowBackIosNewIcon fontSize='small' />}
            >
              Go back
            </Button>
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
