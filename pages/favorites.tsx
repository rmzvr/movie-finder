import { Container, Typography, Stack, Box } from '@mui/material'
import { MoviePreview } from '../src/types/moviePreview'
import { useAppSelector } from '../src/hooks/useAppSelector'
import { selectFavorites, setFavorites } from '../src/store/favoritesSlice'
import { useEffect } from 'react'
import { useAppDispatch } from '../src/hooks/useAppDispatch'
import { NavigateButton } from '@/components/buttons'
import { MovieList } from '@/components'

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
            <NavigateButton text='Go Back' />
          </Box>

          {!favoriteMovies.length && (
            <Typography variant='h5' component='h5'>
              No favorite movies...
            </Typography>
          )}

          <MovieList movies={favoriteMovies} />
        </Stack>
      </Container>
    </>
  )
}
