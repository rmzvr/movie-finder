import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export const useMediaBreakPoints = () => {
  const theme = useTheme()

  const isPhonesMediaQuery = useMediaQuery(
    theme.breakpoints.between('xs', 'sm')
  )

  return [isPhonesMediaQuery]
}
