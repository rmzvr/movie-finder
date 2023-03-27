import { memo } from 'react'

import { Typography } from '@mui/material'

interface Props {
  totalResults: number
  searchQuery: string
}

export const ResultInfo = memo(({ totalResults, searchQuery }: Props) => (
  <Typography variant='h5' component='h1'>
    Found {totalResults} results for "{searchQuery}"
  </Typography>
))
