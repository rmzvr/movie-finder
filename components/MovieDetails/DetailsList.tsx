import { Grid } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function DetailsList({ children }: Props) {
  return (
    <Grid container columns={3}>
      {children}
    </Grid>
  )
}
