import Link from 'next/link'
import Layout from '../components/Layout'
import { inter800 } from './_app'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type status = "awaiting upload" | "fetching" | "done";

type apiResponse = {
  classification: string,
  message: string, 
  sim_images: string[],
}

type apiData = {
  classification: string,
  sim_images: string[],
}


export default function IndexPage() {

  const [file, setFile] = useState<File>(null);
  const [fileURL, setFileURL] = useState<string>(null)
  
  const [status, setStatus] = useState<status>("awaiting upload");
  const [errorMsg, setErrorMsg] = useState<string>(null);
  
  const [data, setData] = useState<apiData>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      setStatus("fetching");
      setErrorMsg("");
      setData(null);

      const data = new FormData();
      data.append("image", file);
      
      fetch("https://shzs1c1u45.execute-api.ap-southeast-2.amazonaws.com/predict", {
        method: "POST",
        body: data,
      })
      .then((res) => res.json())
      .then((json: apiResponse) => {
        setStatus("done");
        if (json.message) {
          setErrorMsg("File size too big.")
        } else {
          setData({
            classification: json.classification, 
            sim_images: json.sim_images
          })
        }
      });
    }
  }, [fileURL])

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0])
    setFileURL(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Layout title="Home | Next.js + TypeScript Example">
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
      <p>API status: {status}</p>
      <p>{errorMsg && `An error occurred: ${errorMsg}`}</p>
      {fileURL && <>
        <p>Selected file: {file.name}</p>
        <Image src={fileURL} alt="Uploaded image" width={100} height={100}/>
      </>}
      <h3 className={`mt-6 ${inter800.className} text-xl`}>
        or drag and drop anywhere on this screen
      </h3>
      {
        data && data.sim_images.map((imgUrl) => (
          <Image
           src={imgUrl} 
           alt={`Image from ${imgUrl}`} 
           width={100}
           height={100}
           />
        ))
      }
    </div>
  </Layout>
  );
}

