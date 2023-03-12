import {
  Button,
  Grid,
  Pagination,
  Typography,
  Container,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import { BASE_RADIX, MAX_MOVIES_PER_PAGE } from '../../constants'
import { Props } from '../../types/props/MovieList'
import { MoviePreview } from '../../types/moviePreview'
import MovieListItem from '../../components/MovieListItem'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectMovies } from '../../store/moviesSlice'

export default function Movies({ movieList, totalMovies }: Props) {
  const router: NextRouter = useRouter()

  const totalPages: number = Math.ceil(totalMovies / MAX_MOVIES_PER_PAGE)
  const initialPage: number = parseInt(
    router.query.page?.toString() ?? '1',
    BASE_RADIX
  )
  const searchQuery: string = router.query.search?.toString() || ''

  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [movies, setMovies] = useState<MoviePreview[]>(movieList)
  const favoriteMovies = useSelector(selectMovies)

  async function handleChange(
    event: React.ChangeEvent<unknown>,
    value: number
  ) {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=885b04f0&s=${searchQuery}&page=${value}`
    )

    const { Search: movies } = await res.json()

    setMovies(movies)
    setCurrentPage(value)

    router.push(`/movies?search=${searchQuery}&page=${value}`, undefined, {
      shallow: true,
    })
  }

  function navigateToSearch(): void {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Container maxWidth='xl'>
        <Grid container paddingBottom='2rem'>
          <Grid item sm={4} sx={{ paddingTop: '2rem' }}>
            <Button
              variant='outlined'
              startIcon={<ArrowBackIosNewIcon fontSize='small' />}
              onClick={navigateToSearch}
            >
              Go to search
            </Button>
          </Grid>
          <Grid
            item
            sm={8}
            display='flex'
            justifyContent='flex-end'
            sx={{ paddingTop: '2rem' }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              siblingCount={0}
              boundaryCount={1}
              onChange={handleChange}
              variant='outlined'
              shape='rounded'
              size='large'
            />
          </Grid>
        </Grid>

        <Typography variant='h5' component='h5' mb='2rem'>
          Found {totalMovies} results for "{searchQuery}"
        </Typography>

        <Grid container spacing={4} marginBottom='2rem'>
          {movies.map((movie: MoviePreview) => (
            <MovieListItem
              key={movie.imdbID}
              movie={movie}
              isFavoriteMovie={favoriteMovies.some(
                (m) => m.imdbID === movie.imdbID
              )}
            />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { page, search } = context.query

  const searchQuery: string = search ? `s=${search}` : ''
  const pageQuery: string = page ? `page=${page}` : ''

  const res = await fetch(
    `${process.env.DB_HOST}?apikey=${process.env.API_KEY}&${searchQuery}&${pageQuery}`
  )

  const { Search: movies, totalResults: totalMovies } = await res.json()

  return {
    props: {
      movieList: movies ? movies : [],
      totalMovies: totalMovies ? +totalMovies : 0,
    },
  }
}
