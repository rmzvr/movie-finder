import {
  Button,
  Grid,
  Pagination,
  Typography,
  Container,
  Box,
  Stack,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { NextRouter, useRouter } from 'next/router'

import { MAX_MOVIES_PER_PAGE } from '../../src/constants'
import { MoviePreview } from '../../src/types/moviePreview'
import MovieListItem from '../../src/components/MovieListItem'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  getMovieList,
  getRunningQueriesThunk,
  useGetMovieListQuery,
} from '../../src/store/movieApi'
import { wrapper } from '../../src/store/store'
import { selectFavorites, setFavorites } from '../../src/store/favoritesSlice'
import { useAppSelector } from '../../src/hooks/useAppSelector'
import { useAppDispatch } from '../../src/hooks/useAppDispatch'
import { useMediaBreakPoints } from '../../src/hooks/useMediaBreakPoints'
import { useScrollToTop } from '../../src/hooks/useScrollToTop'

export default function Movies() {
  const router: NextRouter = useRouter()

  const dispatch = useAppDispatch()

  const scrollToTop = useScrollToTop()

  const [isPhonesMediaQuery] = useMediaBreakPoints()

  const { search: searchQuery = '', page: pageQuery = 1 } = router.query

  const { data } = useGetMovieListQuery({
    searchQuery: searchQuery.toString(),
    pageQuery: pageQuery.toString(),
  })

  const movies: MoviePreview[] = data?.Search ?? []

  const totalMovies: number = Number(data?.totalResults ?? 0)
  const totalPages: number = Math.ceil(totalMovies / MAX_MOVIES_PER_PAGE)

  const paginationSiblingCount: number = isPhonesMediaQuery ? 0 : 1
  const paginationBoundaryCount: number = isPhonesMediaQuery ? 0 : 1

  const [currentPage, setCurrentPage] = useState<number>(+pageQuery)

  const favoriteMovies: MoviePreview[] = useAppSelector(selectFavorites)

  useEffect(() => {
    isPhonesMediaQuery && scrollToTop()
  }, [currentPage])

  useEffect(() => {
    const data = localStorage.getItem('favorites')
    const parsedData = data ? JSON.parse(data) : []

    dispatch(setFavorites(parsedData))
  }, [])

  function handleChange(event: ChangeEvent<unknown>, value: number) {
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

            {!!totalMovies && !isPhonesMediaQuery && (
              <Grid item xs={8} display='flex' justifyContent='flex-end'>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  siblingCount={paginationSiblingCount}
                  boundaryCount={paginationBoundaryCount}
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
                  isFavoriteButtonVisible={true}
                  isFavoriteMovie={
                    !!favoriteMovies.find(
                      (m: MoviePreview) => m.imdbID === movie.imdbID
                    )
                  }
                />
              ))}
            </Grid>
          </Box>

          {!!totalMovies && isPhonesMediaQuery && (
            <Box display='flex' justifyContent='center'>
              <Pagination
                count={totalPages}
                page={currentPage}
                siblingCount={paginationSiblingCount}
                boundaryCount={paginationBoundaryCount}
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
    const { search: searchQuery = '', page: pageQuery = 1 } = context.query

    store.dispatch(
      getMovieList.initiate({
        searchQuery: searchQuery.toString(),
        pageQuery: pageQuery.toString(),
      })
    )

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
)
