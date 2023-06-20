import React, { ReactNode, useReducer, createContext, useEffect } from 'react'
import Head from 'next/head'
import { inter900 } from '../pages/_app'

type Props = {
  children?: ReactNode
  title?: string
}

// define initials
interface FileState {
  file: File | null,
  fileURL: string | null,
  status: "awaiting upload" | "fetching" | "done",
  errorMsg: string | null,
  data: {
    classification: string,
    sim_images: string[],
  } | null
}

const initialFileState: FileState = {
  file: null,
  fileURL: null,
  status: "awaiting upload",
  errorMsg: null,
  data: null
}

interface FileAction {
  type: "update file" | "update fileURL" | "update status" | "update errorMsg" | "update data",
  payload: any
}

// define reducer
function fileReducer(fileState: FileState, action: FileAction): FileState {
  switch(action.type) {
    case "update file": {
      return {
        ...fileState,
        file: action.payload,
      }
    }
    case "update fileURL": {
      return {
        ...fileState,
        fileURL: action.payload,
      }
    }
    case "update status": {
      return {
        ...fileState,
        status: action.payload,
      }
    }
    case "update errorMsg": {
      return {
        ...fileState,
        errorMsg: action.payload,
      }
    }
    case "update data": {
      return {
        ...fileState,
        data: action.payload,
      }
    }
  }  
}

// // create context
// export const FileContext = createContext<{fileState: FileState, dispatch: React.Dispatch<FileAction>}>({
//   fileState: initialFileState,
//   dispatch: null
// });

export default function Layout({ children, title = 'This is the default title' }: Props) {
  const [fileState, dispatch] = useReducer(fileReducer, initialFileState)

  return (
  // <FileContext.Provider value={{fileState, dispatch}}>
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
 // </FileContext.Provider>
  )
}