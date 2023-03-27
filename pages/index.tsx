import Head from 'next/head'

import { Stack } from '@mui/material'
import { SearchForm } from '@/components'
import { BookmarksButton } from '@/components/buttons'

export default function App() {
  return (
    <>
      <Head>
        <title>Movie Finder</title>
			</Head>
			
      <Stack
        component='main'
        minHeight='100vh'
        justifyContent='center'
        alignItems='center'
      >
        <Stack
          direction='row'
          spacing={2}
          sx={{
            transform: {
              xs: 'scale(1)',
              sm: 'scale(1.5)',
            },
          }}
        >
          <SearchForm />
          <BookmarksButton />
        </Stack>
      </Stack>
    </>
  )
}
