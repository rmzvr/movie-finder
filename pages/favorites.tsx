import { Container, Grid, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import MovieListItem from '../components/MovieListItem'
import { selectMovies } from '../store/moviesSlice'
import { MoviePreview } from '../types/moviePreview'
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
        <Grid container paddingBottom='2rem'>
          <Grid item sm={4} sx={{ paddingTop: '2rem' }}>
            <Button
              variant='outlined'
              onClick={navigateBack}
              startIcon={<ArrowBackIosNewIcon fontSize='small' />}
            >
              Go back
            </Button>
          </Grid>
        </Grid>

        {!favoriteMovies.length && (
          <Typography variant='h5' component='h5' mb='2rem'>
            No favorite movies...
          </Typography>
        )}

        <Grid container spacing={4} marginBottom='2rem'>
          {favoriteMovies.map((movie: MoviePreview) => (
            <MovieListItem
              key={movie.imdbID}
              movie={movie}
              isFavoriteButtonVisible={false}
              isFavoriteMovie={favoriteMovies.includes(movie.imdbID)}
            />
          ))}
        </Grid>
      </Container>
    </>
  )
}
