import { Grid, Typography } from '@mui/material'

interface Props {
  title: string
  content: string
}

export default function DetailsListItem({ title, content }: Props) {
  return (
    <Grid item xs={1}>
      <Typography color='gray' variant='h6'>
        {title}
      </Typography>
      <Typography variant='h6' fontWeight='bold'>
        {content}
      </Typography>
    </Grid>
  )
}
