import { useContext } from "react";
import Image from 'next/image';
import { FileContext, fontBold } from "../pages/_app";

export default function Gallery() {
    const { fileState, dispatch } = useContext(FileContext)

    async function downloadImg(imgUrl: string, classification: string) {
        // fetch image
        const res = await fetch(imgUrl);
        const blob = await res.blob()

        const element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = classification + ".jpg";

        document.body.appendChild(element);
        element.click();
    }

    return (
        <div className=" mx-4">
            <h2 className={`${fontBold.className} text-3xl mb-2`}>{`${fileState.data.classification} (${fileState.data.sim_images.length})`}</h2>
            <h4 className="mb-5 text-gray-500">Click an image to download it</h4>
            <div className="columns-3 gap-6">
                {
                    fileState.data && fileState.data.sim_images.map((imgUrl) => (
                    <Image
                        className="mb-6 hover:cursor-pointer"
                        key={imgUrl}
                        src={imgUrl} 
                        alt={`Image from ${imgUrl}`} 
                        width={1000}
                        height={100}
                        onClick={() => downloadImg(imgUrl, fileState.data.classification)}
                    />
                    ))
                }    
            </div>    
        </div>
    )

}