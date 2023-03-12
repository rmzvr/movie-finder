import { Grid, Typography } from '@mui/material'
import { Props } from '../types/props/MovieCategorySubItem'

export default function MovieCategorySubItem({ title, content }: Props) {
  return (
    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
      <Typography color='GrayText' variant='h6'>
        {title}
      </Typography>
      <Typography variant='h6' fontWeight='bold'>
        {content}
      </Typography>
    </Grid>
  )
}
