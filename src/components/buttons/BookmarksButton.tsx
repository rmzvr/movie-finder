import { memo } from 'react'

import { useRouter, NextRouter } from 'next/router'

import { IconButton } from '@mui/material'
import BookmarksIcon from '@mui/icons-material/Bookmarks'

export const BookmarksButton = memo(() => {
  const router: NextRouter = useRouter()

  function navigateToFavorites(): void {
    router.push('/favorites')
  }

  return (
    <IconButton
      disableTouchRipple
      aria-label='favorites'
      size='large'
      onClick={navigateToFavorites}
      sx={{
        width: '56px',
        height: '56px',
        borderRadius: '4px',
        border: '1px solid rgba(255, 255, 255, 0.23)',
        '&:hover': {
          borderColor: 'white',
        },
      }}
    >
      <BookmarksIcon fontSize='inherit' />
    </IconButton>
  )
})
