import React, { ReactNode } from 'react'
import Head from 'next/head'
import { fontBlack } from '../pages/_app'

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
      <div className="flex flex-col items-center">
        <header className="mt-10 w-4/5">
          <h1 className={`text-5xl ${fontBlack.className} text-center`}>Image Search Engine</h1>
        </header>
        <div className="w-full mt-10">
          {children}
        </div>
      </div>
    </>
  )
}