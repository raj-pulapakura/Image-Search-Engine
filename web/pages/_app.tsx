import React, {useReducer, createContext} from 'react'
import { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import '../styles/index.css'
import { FileAction, FileState } from '../interfaces/fileState'

export const fontNormal = Poppins({weight: "400", subsets: ["latin"]})
export const fontBold = Poppins({weight: "800", subsets: ["latin"]})
export const fontBlack = Poppins({weight: "900", subsets: ["latin"]})

const initialFileState: FileState = {
  file: null,
  fileURL: null,
  status: "awaiting upload",
  errorMsg: null,
  data: null
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

  return <main className={fontNormal.className}>
    <FileContext.Provider value={{fileState, dispatch}}>
      <Component {...pageProps} />
    </FileContext.Provider>
  </main>
}