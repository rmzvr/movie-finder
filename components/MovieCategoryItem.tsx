import { Grid, Typography } from '@mui/material'
import { Props } from '../types/props/MovieCategoryItem'

export default function MovieCategoryItem({ title, children }: Props) {
  return (
    <Grid item mt='1rem' xs={12} sm={12} md={12} lg={12} xl={12}>
      <Typography variant='h6'>{title}</Typography>
      {children}
    </Grid>
  )
}
