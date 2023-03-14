import { Typography } from '@mui/material'

interface Props {
  title: string
}

export default function TitleSection({ title }: Props) {
  return (
    <Typography variant='h3' component='h1'>
      {title}
    </Typography>
  )
}
