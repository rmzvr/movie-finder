import { Rating, Stack, Typography } from '@mui/material'

interface Props {
  rating: string
}

export default function RatingSection({ rating }: Props) {
  return (
    <Stack direction='row' alignItems='center' gap='0.6rem'>
      <Typography variant='h5' fontWeight='bold'>
        {rating}
      </Typography>

      <Rating
        name='read-only'
        value={parseInt(rating) / 2}
        precision={0.5}
        readOnly
      />
    </Stack>
  )
}
