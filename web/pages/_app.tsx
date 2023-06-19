import React from 'react'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import '../styles/index.css'

export const inter400 = Inter({weight: "400", subsets: ["latin"]})
export const inter800 = Inter({weight: "800", subsets: ["latin"]})
export const inter900 = Inter({weight: "900", subsets: ["latin"]})

export default function MyApp({ Component, pageProps }: AppProps) {
  return <main className={inter400.className}>
    <Component {...pageProps} />
  </main>
}

