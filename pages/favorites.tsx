import { Container, Typography, Stack, Box } from '@mui/material'
import { MoviePreview } from '../src/types/moviePreview'
import { useAppSelector } from '../src/hooks/useAppSelector'
import { selectFavorites, setFavorites } from '../src/store/favoritesSlice'
import { NavigateButton } from '@/components/buttons'
import { MovieList } from '@/components'
import { useFavoritesFromLocalStorage } from '@/hooks'

export default function Favorites() {
  useFavoritesFromLocalStorage()

  const favoriteMovies: MoviePreview[] = useAppSelector(selectFavorites)

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
