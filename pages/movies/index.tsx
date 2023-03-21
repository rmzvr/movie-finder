import {
  Button,
  Grid,
  Pagination,
  Typography,
  Container,
  Box,
  Stack,
} from '@mui/material'
import { useEffect, useState } from 'react'

import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { NextRouter, useRouter } from 'next/router'

import { BASE_RADIX, MAX_MOVIES_PER_PAGE } from '../../src/constants'
import { MoviePreview } from '../../src/types/moviePreview'
import MovieListItem from '../../src/components/MovieListItem'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  getMovieList,
  getRunningQueriesThunk,
  useGetMovieListQuery,
} from '../../src/store/movieApi'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { wrapper } from '../../src/store/store'
import { selectFavorites, setFavorites } from '../../src/store/favoritesSlice'
import { useAppSelector } from '../../src/hooks/useAppSelector'
import { useAppDispatch } from '../../src/hooks/useAppDispatch'

export default function Movies() {
  const dispatch = useAppDispatch()
  const isBrowser = () => typeof window !== 'undefined'

  const theme = useTheme()
  const isPhonesMediaQuery = useMediaQuery(
    theme.breakpoints.between('xs', 'sm')
  )

  const favoriteMovies = useAppSelector(selectFavorites)

  const siblingCount = isPhonesMediaQuery ? 0 : 1
  const boundaryCount = isPhonesMediaQuery ? 0 : 1

  const router: NextRouter = useRouter()

  let { search, page } = router.query

  search = search?.toString() ?? ''
  page = page?.toString() ?? ''

  const { data } = useGetMovieListQuery({
    search,
    page,
  })

  const movies = data?.Search ?? []
  const totalMovies = data?.totalResults ?? 0

  const totalPages: number = Math.ceil(+totalMovies / MAX_MOVIES_PER_PAGE)
  const initialPage: number = parseInt(
    router.query.page?.toString() ?? '1',
    BASE_RADIX
  )

  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  useEffect(() => {
    isPhonesMediaQuery && scrollToTop()
  }, [currentPage])

  useEffect(() => {
    const data = localStorage.getItem('favorites')
    const parsedData = data ? JSON.parse(data) : []

    dispatch(setFavorites(parsedData))
  }, [])

  function scrollToTop() {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleChange(
    event: React.ChangeEvent<unknown>,
    value: number
  ) {
    setCurrentPage(value)

    router.push(`/movies?search=${search}&page=${value}`, undefined, {
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

            {!!totalMovies && !isPhonesMediaQuery && (
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
            Found {totalMovies} results for "{search}"
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
                  isFavoriteButtonVisible={true}
                  isFavoriteMovie={favoriteMovies.some((m: MoviePreview) => {
                    return m.imdbID === movie.imdbID
                  })}
                />
              ))}
            </Grid>
          </Box>

          {!!totalMovies && isPhonesMediaQuery && (
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const search = context.query?.search?.toString() ?? ''
    const page = context.query?.page?.toString() ?? ''

    store.dispatch(getMovieList.initiate({ search, page }))

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
)
