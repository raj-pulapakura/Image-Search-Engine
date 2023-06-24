import Image from "next/image";
import { MouseEventHandler, useContext, useEffect, useRef, useState } from "react";
import { FileContext } from "../pages/_app";

interface Props {
    src: string;
    key: string;
    alt: string;
    width: number;
    height: number;
}

export default function GalleryImage({ src, key, alt, width, height }: Props) {
    
    const { fileState } = useContext(FileContext);
    const [hovering, setHovering] = useState(false);
    const imageRef = useRef(null);

    async function downloadImg() {
        // fetch image
        const res = await fetch(src);
        const blob = await res.blob()

        const element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = fileState.data.classification + ".jpg";

        document.body.appendChild(element);
        element.click();
    }
    
    function handleHover(event)  {
        event.stopPropagation();
        setHovering(true);
    }

    function handleLeave(event) {
        event.stopPropagation();
        setHovering(false);
    }

    function handleClick(event) {
        event.stopPropagation();
        setHovering(false);
    }

    return (
        <div className="relative mb-6" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            {hovering && <>
                {/* image backdrop */}
                <div onClick={handleClick} className="absolute w-full h-full bg-black/20"></div>
                {/* download button */}
                <button onClick={downloadImg} className="rounded-sm p-1.5 absolute bottom-3 right-3 bg-white hover:bg-slate-300 active:bg-slate-400"><Image src="../images/download.png" alt="download button" width={24} height={24} /></button>
            </> }
            {/* image */}
            <Image
                ref={imageRef}
                src={src}
                alt={alt}
                width={width}
                height={height}
            />  
        </div>
    );
}