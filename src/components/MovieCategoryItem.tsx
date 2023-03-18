import { Box, Grid, Typography } from '@mui/material'
import { Props } from '../types/props/MovieCategoryItem'

export default function MovieCategoryItem({ title, children }: Props) {
  return (
    <Box>
      <Typography variant='h6'>{title}</Typography>
      {children}
    </Box>
  )
}
