import { useContext } from "react";
import { FileContext, fontBold } from "../pages/_app";
import GalleryImage from "./GalleryImage";

export default function Gallery() {
    const { fileState } = useContext(FileContext);

    return (
        <div className="mb-10">
            <h2 className={`${fontBold.className} text-center text-3xl mb-2`}>{`${fileState.data.classification} (${fileState.data.sim_images.length})`}</h2>
            <h4 className="mb-10 text-gray-500 text-center">Hover over an image and click the download button</h4>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {
                    fileState.data && fileState.data.sim_images.map((imgUrl) => (
                    <GalleryImage
                        key={imgUrl.full}
                        src={imgUrl.full} 
                        alt={`Image from ${imgUrl.full}`} 
                        width={1000}
                        height={100} 
                    /> 
                    ))
                }    
            </div>    
        </div>
    )

}