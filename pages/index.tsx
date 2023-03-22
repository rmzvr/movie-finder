import { useState, FormEvent } from 'react'

import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'

import { Box, IconButton, TextField } from '@mui/material'
import BookmarksIcon from '@mui/icons-material/Bookmarks'

export default function App() {
  const router: NextRouter = useRouter()

  const [search, setSearch] = useState<string>(
    router.query.search?.toString() ?? ''
  )

  function findMovies(event: FormEvent): void {
    event.preventDefault()

    if (!search.length) return

    router.push(`/movies?search=${search}&page=1`)
  }

  function navigateToFavorites(): void {
    router.push('/favorites')
  }

  return (
    <>
      <Head>
        <title>Movie Finder</title>
      </Head>
      <Box
        minHeight='100vh'
        display='grid'
        sx={{
          placeContent: 'center',
        }}
      >
        <Box
          component='form'
          onSubmit={findMovies}
          display='flex'
          gap={2}
          sx={{
            transform: {
              xs: 'scale(1)',
              sm: 'scale(1.5)',
            },
          }}
        >
          <TextField
            label='Search for movies'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <IconButton
            disableTouchRipple
            aria-label='favorites'
            size='large'
            onClick={navigateToFavorites}
            sx={{
              width: '56px',
              height: '56px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.23)',
              '&:hover': {
                borderColor: 'white',
              },
            }}
          >
            <BookmarksIcon fontSize='inherit' />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}
