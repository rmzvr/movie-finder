import { MouseEvent } from 'react'

export interface Props {
  isFavorite: boolean
  handleClick: (
    event: MouseEvent<HTMLButtonElement>,
    isFavorite: boolean
  ) => void
}
