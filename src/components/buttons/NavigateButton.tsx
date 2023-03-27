import { NextRouter, useRouter } from 'next/router'

import { Button } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { memo } from 'react'

interface Props {
  path?: string
  text: string
}

export const NavigateButton = memo(({ path, text }: Props) => {
  const router: NextRouter = useRouter()

  function navigate(path?: string): void {
    if (path) {
      router.push(path)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant='outlined'
      onClick={() => navigate(path)}
      startIcon={<ArrowBackIosNewIcon fontSize='small' />}
    >
      {text}
    </Button>
  )
})
