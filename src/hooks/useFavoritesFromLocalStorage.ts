import { setFavorites } from '@/store/favoritesSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useFavoritesFromLocalStorage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const data = localStorage.getItem('favorites')
    const parsedData = data ? JSON.parse(data) : []

    dispatch(setFavorites(parsedData))
  }, [])
}
