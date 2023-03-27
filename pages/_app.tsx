import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'
import Nprogress from 'nprogress'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'

import { wrapper } from '../src/store/store'
import createEmotionCache from '../src/createEmotionCache'
import theme from '../src/theme'
import '../src/styles/global.css'

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp({ ...rest }: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      Nprogress.start()
    })

    Router.events.on('routeChangeComplete', () => {
      Nprogress.done(false)
    })
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
