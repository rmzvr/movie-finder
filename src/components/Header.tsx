import { Grid } from '@mui/material'

import { NavigateButton } from './buttons'
import { PaginationBar } from './PaginationBar'

interface Props {
  pageQuery: string
  searchQuery: string
  totalResults: number
}

export const Header = ({ pageQuery, searchQuery, totalResults }: Props) => (
  <Grid container>
    <Grid item xs={12} sm={4}>
      <NavigateButton path='/' text='Go to search' />
    </Grid>

    <Grid item xs={8} display='flex' justifyContent='flex-end'>
      <PaginationBar
        pageQuery={+pageQuery}
        searchQuery={searchQuery}
        totalResults={totalResults}
      />
    </Grid>
  </Grid>
)
