import React, {useReducer, createContext} from 'react'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import '../styles/index.css'

export const inter400 = Inter({weight: "400", subsets: ["latin"]})
export const inter800 = Inter({weight: "800", subsets: ["latin"]})
export const inter900 = Inter({weight: "900", subsets: ["latin"]})

// define initials
export interface FileState {
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

export interface FileAction {
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

// create context
export const FileContext = createContext<{fileState: FileState, dispatch: React.Dispatch<FileAction>}>({
  fileState: initialFileState,
  dispatch: null
});


export default function MyApp({ Component, pageProps }: AppProps) {
  const [fileState, dispatch] = useReducer(fileReducer, initialFileState)

  return <main className={inter400.className}>
    <FileContext.Provider value={{fileState, dispatch}}>
      <Component {...pageProps} />
    </FileContext.Provider>
  </main>
}