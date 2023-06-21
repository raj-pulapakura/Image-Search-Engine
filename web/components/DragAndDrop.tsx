import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { FileContext } from "../pages/_app";
import { fetchSimilarImages } from "../pages";

type Props = {
    children?: ReactNode
}

export default function DragAndDrop({children}: Props) {
    // drag state
    const [dragActive, setDragActive] = useState(false);
    const { fileState, dispatch } = useContext(FileContext)
    
    // handle drag events
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        if (!dragActive) {
            setDragActive(true);
        }
      } else if (e.type === "dragleave") {
        if (dragActive) {
            setDragActive(false);
        }
      }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        dispatch({
          type: "update file",
          payload: e.dataTransfer.files[0]
        })
        dispatch({
          type: "update fileURL",
          payload: URL.createObjectURL(e.dataTransfer.files[0])
        })
    }
    };
    
      // fetch similar images whenever fileURL changes
    useEffect(() => {
      fetchSimilarImages(fileState, dispatch);
    }, [fileState.fileURL])
    
    return (
      <form 
        className={`w-3/4 m-auto ${dragActive ? "bg-blue-100" : "bg-white"} border-black border-2 p-10 rounded-lg border-dashed`}
        id="form-file-upload" 
        onSubmit={(e) => e.preventDefault()} 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag} 
        onDragOver={handleDrag}  
        onDrop={handleDrop}>
        <label id="label-file-upload" htmlFor="input-file-upload">
        </label>
        {children}
      </form>
    );
  };