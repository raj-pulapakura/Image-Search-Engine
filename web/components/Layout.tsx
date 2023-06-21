import React, { ReactNode } from 'react'
import Head from 'next/head'
import { inter900 } from '../pages/_app'

type Props = {
  children?: ReactNode
  title?: string
}


export default function Layout({ children, title = 'This is the default title' }: Props) {

  return (
   <>
   <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="flex-none border-b-2 border-black">
      <h1 className={`text-5xl ${inter900.className} text-center`}>Image Search Engine</h1>
    </header>
    <div className="flex-1">
      {children}
    </div>
 </>
  )
}