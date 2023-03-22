import { Button } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { NextRouter, useRouter } from 'next/router'

export default function NavigateBackButton() {
  const router: NextRouter = useRouter()

  function navigateBack(): void {
    router.back()
  }

  return (
    <Button
      variant='outlined'
      onClick={navigateBack}
      startIcon={<ArrowBackIosNewIcon fontSize='small' />}
    >
      Go back
    </Button>
  )
}
