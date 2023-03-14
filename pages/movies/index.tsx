import {
  Button,
  Grid,
  Pagination,
  Typography,
  Container,
  Box,
  Stack,
} from '@mui/material'

import { useState } from 'react'

import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { NextRouter, useRouter } from 'next/router'

import { BASE_RADIX, MAX_MOVIES_PER_PAGE } from '../../constants'
import { Props } from '../../types/props/MovieList'
import { MoviePreview } from '../../types/moviePreview'
import MovieListItem from '../../components/MovieListItem'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useSelector } from 'react-redux'
import { selectMovies } from '../../store/moviesSlice'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function Movies({ movieList, totalMovies }: Props) {
	const theme = useTheme()
	
	//! Create hook form queries
  const isPhonesMediaQuery = useMediaQuery(
    theme.breakpoints.between('xs', 'sm')
  )
  const isTabletsMediaQuery = useMediaQuery(
    theme.breakpoints.between('sm', 'md')
  )
  const isDesktopsMediaQuery = useMediaQuery(theme.breakpoints.up('md'))

  const siblingCount = isDesktopsMediaQuery ? 1 : isTabletsMediaQuery ? 1 : 0
  const boundaryCount = 1

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
      `${process.env.NEXT_PUBLIC_URL_WITH_API_KEY}&s=${searchQuery}&page=${value}`
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
        <Stack spacing={3} my={3}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Button
                variant='outlined'
                startIcon={<ArrowBackIosNewIcon fontSize='small' />}
                onClick={navigateToSearch}
              >
                Go to search
              </Button>
            </Grid>

            {!isPhonesMediaQuery && (
              <Grid item xs={8} display='flex' justifyContent='flex-end'>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  siblingCount={siblingCount}
                  boundaryCount={boundaryCount}
                  onChange={handleChange}
                  variant='outlined'
                  shape='rounded'
                  size='large'
                />
              </Grid>
            )}
          </Grid>

          <Typography variant='h5' component='h1'>
            Found {totalMovies} results for "{searchQuery}"
          </Typography>

          <Box>
            <Grid
              container
              columns={{ xs: 1, sm: 3, md: 4, lg: 5 }}
              spacing={5}
            >
              {movies.map((movie: MoviePreview) => (
                <MovieListItem
                  key={movie.imdbID}
                  movie={movie}
                  isFavoriteMovie={favoriteMovies.some(
                    (m: MoviePreview) => m.imdbID === movie.imdbID
                  )}
                />
              ))}
            </Grid>
          </Box>

          {isPhonesMediaQuery && (
            <Box display='flex' justifyContent='center'>
              <Pagination
                count={totalPages}
                page={currentPage}
                siblingCount={siblingCount}
                boundaryCount={boundaryCount}
                onChange={handleChange}
                variant='outlined'
                shape='rounded'
                size='large'
              />
            </Box>
          )}
        </Stack>
      </Container>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { page, search } = context.query

  const searchQuery: string = search ? `s=${search}` : ''
  const pageQuery: string = page ? `page=${page}` : ''

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_WITH_API_KEY}&${searchQuery}&${pageQuery}`
  )

  const { Search: movies, totalResults: totalMovies } = await res.json()

  return {
    props: {
      movieList: movies ? movies : [],
      totalMovies: totalMovies ? +totalMovies : 0,
    },
  }
}
