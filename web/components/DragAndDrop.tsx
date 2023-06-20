import { ReactNode, useRef, useState } from "react";

type Props = {
    children?: ReactNode
}

export default function DragAndDrop({children}: Props) {
    // drag state
    const [dragActive, setDragActive] = useState(false);
    
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
        console.log(e.dataTransfer.files[0]);
        if (!(e.dataTransfer.files[0] as File).type.startsWith("image")) {
            alert("Invalid file type.")
        }
    }
    };                                  
    
    return (
      <form 
        className={dragActive ? "bg-blue-200" : "bg-blue-100"} 
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