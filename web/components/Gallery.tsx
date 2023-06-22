import { useContext } from "react";
import Image from 'next/image';
import { FileContext, fontBold } from "../pages/_app";

export default function Gallery() {
    const { fileState } = useContext(FileContext)

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
        <div className="">
            <h2 className={`${fontBold.className} text-center text-3xl mb-2`}>{`${fileState.data.classification} (${fileState.data.sim_images.length})`}</h2>
            <h4 className="mb-10 text-gray-500 text-center">Click an image to download it</h4>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {
                    fileState.data && fileState.data.sim_images.map((imgUrl) => (
                    <Image
                        className="mb-6 hover:cursor-pointer"
                        key={imgUrl.full}
                        src={imgUrl.full} 
                        alt={`Image from ${imgUrl.full}`} 
                        width={1000}
                        height={100}
                        onClick={() => downloadImg(imgUrl.full, fileState.data.classification)}
                    />
                    ))
                }    
            </div>    
        </div>
    )

}