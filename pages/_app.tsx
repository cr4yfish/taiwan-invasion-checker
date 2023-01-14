import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const darkTheme = createTheme({
  type: "dark",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider 
      theme={darkTheme}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextUIProvider>)
}
