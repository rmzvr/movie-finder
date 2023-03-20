import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store/store'

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
