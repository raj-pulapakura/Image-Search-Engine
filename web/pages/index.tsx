import Layout from '../components/Layout'
import { FileAction, FileContext, FileState, fontBold } from './_app'
import { Dispatch, useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import DragAndDrop from '../components/DragAndDrop';
import { useRouter } from 'next/router';
import Gallery from '../components/Gallery';
import { ProgressBar } from 'react-loader-spinner'

export async function fetchSimilarImages(fileState: FileState, dispatch: Dispatch<FileAction>) {
  if (!fileState.file) return;

  // check if the file is an image
  if (!fileState.file.type.startsWith("image")) {
    return alert("Invalid file type");
  }

  // clear and update state
  dispatch({
    type: "update status",
    payload: "fetching similar images..."
  })

  dispatch({
    type: "update errorMsg",
    payload: ""
  })

  dispatch({
    type: "update data",
    payload: null
  })

  // create form data
  const data = new FormData();
  data.append("image", fileState.file);

  // fetch
  const res = await fetch(
    "https://shzs1c1u45.execute-api.ap-southeast-2.amazonaws.com/predict", 
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();
  console.log(json);

  // update status
  dispatch({
    type: "update status",
    payload: "done"
  })

  // check for errors
  if (json.message) {
    dispatch({
      type: "update errorMsg",
      payload: json.message
    })
  } else {
    // update data
    dispatch({
      type: "update data",
      payload: {
        classification: json.classification, 
        sim_images: json.sim_images
      }
    })
  }
}


export default function IndexPage() {

  const inputRef = useRef<HTMLInputElement>(null);
  const { fileState, dispatch } = useContext(FileContext);
  const router = useRouter();

  // update file and fileURL whenever input changes
  const handleFileInputChange = (event) => {
    dispatch({
      type: "update file",
      payload: event.target.files[0]
    })
    dispatch({
      type: "update fileURL",
      payload: URL.createObjectURL(event.target.files[0])
    })
  };

  // fetch similar images whenever fileURL changes
  useEffect(() => {
    fetchSimilarImages(fileState, dispatch);
  }, [fileState.fileURL])

  return (
    <Layout title="Home">
      <DragAndDrop>
        <div className="flex flex-col items-center">
          <button onClick={() => inputRef.current.click()} className={`bg-black hover:bg-white text-white hover:text-black border-white border-2 hover:border-black ${fontBold.className} px-14 py-2.5 rounded-md shadow hover:shadow-2xl`}>
            UPLOAD
          </button>
          <input
            ref={inputRef}
            type="file"
            id="file-upload"
            onChange={handleFileInputChange}
            hidden
          />
          <h3 className={`mt-6 ${fontBold.className} text-xl text-center`}>
            or drag and drop a file into this box
          </h3>
          {fileState.fileURL && 
            <>
              <div>
                <Image className="mt-6" src={fileState.fileURL} alt="Uploaded image" width={100} height={100} />
              </div>
            </>
          }
        </div>
      </DragAndDrop>

      <div className="w-3/4 m-auto flex justify-between mt-5 items-center">
        <div>
          <p>Status: {fileState.status}</p>
          <p>{fileState.errorMsg && `An error occurred: ${fileState.errorMsg}`}</p>
        </div>
        { fileState.status === "fetching similar images..." && 
          <ProgressBar
            width="50"
            height="50"
            borderColor='blue'
            barColor="blue"
          />
        }
      </div>
      
      {
        fileState.status === "done" && !fileState.errorMsg && (
          <div className="mt-20">
            <Gallery />
          </div>
        )
      }
    </Layout>
  );
}

