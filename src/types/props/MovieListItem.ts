import { MoviePreview } from '../moviePreview'

export interface Props {
  movie: MoviePreview
	isFavoriteMovie: boolean
	isFavoriteButtonVisible?: boolean
}
