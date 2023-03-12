import { Grid } from '@mui/material'
import { Props } from '../types/props/MovieCategorySubList'

export default function MovieCategorySubList({ children }: Props) {
  return (
    <Grid item mt='1rem' xs={12} sm={12} md={12} lg={12} xl={12}>
      <Grid container>{children}</Grid>
    </Grid>
  )
}
