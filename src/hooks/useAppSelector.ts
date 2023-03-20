import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store/store'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
