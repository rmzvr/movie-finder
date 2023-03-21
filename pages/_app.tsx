import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import '../src/styles/global.css'
import { wrapper } from '../src/store/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { Router } from 'next/router'
import Nprogress from 'nprogress'

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp({ ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      Nprogress.start()
    })

    Router.events.on('routeChangeComplete', (url) => {
      Nprogress.done(false)
    })
  }, [Router])

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
