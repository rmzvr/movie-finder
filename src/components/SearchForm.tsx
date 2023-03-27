import { FormEvent, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

import { Box, TextField } from '@mui/material'

export const SearchForm = () => {
  const router: NextRouter = useRouter()

  const searchQuery: string = router.query.search?.toString() ?? ''

  const [search, setSearch] = useState<string>(searchQuery)

  function handleSubmit(event: FormEvent): void {
    event.preventDefault()

    if (!search.length) return

    router.push(`/movies?search=${search}&page=1`)
  }

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <TextField
        value={search}
        label='Search for movies'
        onChange={(event) => setSearch(event.target.value)}
      />
    </Box>
  )
}
