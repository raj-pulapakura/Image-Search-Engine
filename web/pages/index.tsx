import Link from 'next/link'
import { inter800 } from './_app'
import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import DragAndDrop from '../components/DragAndDrop';

type APIResponse = {
  classification: string,
  message: string, 
  sim_images: string[],
}


export default function IndexPage() {

  const inputRef = useRef<HTMLInputElement>(null);
 
  useEffect(() => {
    console.log("index is crazy")
    console.log(fileState);
    console.log(dispatch);
  }, [fileState]);

  useEffect(() => {
    if (fileState.file) {
      dispatch({
        type: "update status",
        payload: "fetching"
      })

      dispatch({
        type: "update errorMsg",
        payload: ""
      })

      dispatch({
        type: "update data",
        payload: null
      })

      const data = new FormData();
      data.append("image", fileState.file);
      
      fetch("https://shzs1c1u45.execute-api.ap-southeast-2.amazonaws.com/predict", {
        method: "POST",
        body: data,
      })
      .then((res) => res.json())
      .then((json: APIResponse) => {
        dispatch({
          type: "update status",
          payload: "done"
        })
        if (json.message) {
          dispatch({
            type: "update errorMsg",
            payload: "File size too big."
          })
        } else {
          console.log(json);
          dispatch({
            type: "update data",
            payload: {
              classification: json.classification, 
              sim_images: json.sim_images
            }
          })
        }
      });
    }
  }, [fileState.fileURL])

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

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <DragAndDrop>
        <div className="text-center">
          <button onClick={() => inputRef.current.click()} className={`bg-black text-white ${inter800.className} px-10 py-2 rounded-md shadow-2xl`}>
            UPLOAD
          </button>

          <input
            ref={inputRef}
            type="file"
            id="file-upload"
            onChange={handleFileInputChange}
            hidden
          />
          <p>API status: {fileState.status}</p>
          <p>{fileState.errorMsg && `An error occurred: ${fileState.errorMsg}`}</p>
          {fileState.fileURL && <>
            <p>Selected file: {fileState.file.name}</p>
            <Image src={fileState.fileURL} alt="Uploaded image" width={100} height={100}/>
          </>}
          <h3 className={`mt-6 ${inter800.className} text-xl`}>
            or drag and drop anywhere on this screen
          </h3>
          {
            fileState.data && fileState.data.sim_images.map((imgUrl) => (
              <Image
              src={imgUrl} 
              alt={`Image from ${imgUrl}`} 
              width={100}
              height={100}
              />
            ))
          }
        </div>
      </DragAndDrop>
    </Layout>
  );
}