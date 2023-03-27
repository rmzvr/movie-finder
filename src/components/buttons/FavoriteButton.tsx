import { memo, MouseEvent, useState } from 'react'

import { Checkbox } from '@mui/material'

import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useAppDispatch } from '@/hooks'
import { addFavorite, removeFavorite } from 'src/store/favoritesSlice'

interface Props {
  isFavorite: boolean
  movie: any
}

export const FavoriteButton = ({ isFavorite, movie }: Props) => {
  const dispatch = useAppDispatch()

  const [isChecked, setIsChecked] = useState<boolean>(isFavorite)

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation()

    isChecked ? dispatch(removeFavorite(movie)) : dispatch(addFavorite(movie))

    setIsChecked((prevState) => !prevState)
  }

  return (
    <Checkbox
      color='error'
      icon={<BookmarkBorderIcon />}
      checkedIcon={<BookmarkIcon />}
      checked={isFavorite}
      onClick={handleClick}
      sx={{ position: 'absolute', zIndex: '1', right: '0' }}
    />
  )
}
