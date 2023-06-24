import React, { ReactNode } from 'react'
import Head from 'next/head'
import { fontBlack } from '../pages/_app'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  children?: ReactNode
  title?: string
}


export default function Layout({ children, title = 'This is the default title' }: Props) {

  return (
    <div className="min-h-screen flex flex-col">
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
      <footer className="bg-black px-3 py-3 mt-auto flex items-center justify-between">
        <h1 className="text-white">Made by Raj</h1>
          <div className="flex gap-3">
            <Link target='_blank' href="https://github.com/raj-pulapakura/Image-Search-Engine">
              <Image src="/images/github.png" alt="GitHub" width="35" height="35" />
            </Link>
            <Link target='_blank' about="LinkedIn" href="https://www.linkedin.com/in/raj-pulapakura-9b2348234/">
              <Image src="/images/linkedin.png" alt="GitHub" width="35" height="35" />
            </Link>
          </div>
        </footer>
    </div>
  )
}