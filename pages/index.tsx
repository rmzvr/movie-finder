import {
  FormControl,
  Grid,
  IconButton,
  TextField,
} from '@mui/material'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import BookmarksIcon from '@mui/icons-material/Bookmarks'

export default function App() {
  const router: NextRouter = useRouter()

  const [search, setSearch] = useState<string>(
    router.query.search?.toString() ?? ''
  )

  function submitForm(event: FormEvent): void {
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
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <Grid item xs={5} sm={5} md={5} lg={3} xl={3} display='flex'>
          <form onSubmit={submitForm}>
            <FormControl fullWidth sx={{ display: 'flex' }}>
              <TextField
                label='Search for movies'
                size='medium'
                fullWidth
                inputProps={{ height: '80px' }}
                sx={{ transform: 'scale(1.5)' }}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </FormControl>
          </form>
          <IconButton
            onClick={navigateToFavorites}
            sx={{
              width: '56px',
              height: '56px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.23)',
              transform: 'scale(1.5)',
              position: 'relative',
              left: '100px',
            }}
            aria-label='delete'
            size='large'
          >
            <BookmarksIcon sx={{ transform: 'scale(1.2)' }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
