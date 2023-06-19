import Link from 'next/link'
import Layout from '../components/Layout'
import { inter800 } from './_app'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// async function getData() {
//   const res = await fetch()
// }

export default function IndexPage() {

  const [file, setFile] = useState<File>(null);
  const [fileURL, setFileURL] = useState<string>(null)
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const data = new FormData()
      data.append("image", file)
      fetch("https://shzs1c1u45.execute-api.ap-southeast-2.amazonaws.com/predict", {
        method: "POST",
        body: data,
      }).then((res) => res.json()).then((json) => console.log(json))
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
      {fileURL && <>
        <p>Selected file: {file.name}</p>
        <Image src={fileURL} alt="Uploaded image" width={100} height={100}/>
      </>}
      <h3 className={`mt-6 ${inter800.className} text-xl`}>
        or drag and drop anywhere on this screen
      </h3>
    </div>
  </Layout>
  );
}

