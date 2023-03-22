import { Props } from '../../types/props/FavoriteButton'

import Checkbox from '@mui/material/Checkbox'

import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

export default function FavoriteButton({ isFavorite, handleClick }: Props) {
  return (
    <Checkbox
      color='error'
      icon={<BookmarkBorderIcon />}
      checkedIcon={<BookmarkIcon />}
      checked={isFavorite}
      onClick={(event) => handleClick(event, isFavorite)}
      sx={{ position: 'absolute', zIndex: '1', right: '0' }}
    />
  )
}
