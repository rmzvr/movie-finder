import { Container, Grid, Button, Typography, Stack, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import MovieListItem from '../src/components/MovieListItem'
import { selectMovies } from '../src/store/movieApi'
import { MoviePreview } from '../src/types/moviePreview'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { NextRouter, useRouter } from 'next/router'

export default function Favorites() {
  const router: NextRouter = useRouter()

  const favoriteMovies = useSelector(selectMovies)

  function navigateBack(): void {
    router.back()
  }

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
                <MovieListItem
                  key={movie.imdbID}
                  movie={movie}
                  isFavoriteButtonVisible={false}
                  isFavoriteMovie={favoriteMovies.includes(movie.imdbID)}
                />
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </>
  )
}
