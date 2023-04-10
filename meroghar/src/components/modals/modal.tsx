'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import LoginSignup from "../loginSignup";
import useModal from "../../customHoooks/useModal";


interface modalProps{
    isOpen?:string
    children?:React.ReactElement
}

function Modal({isOpen,children}:modalProps) {
  const modal=useModal();
  const [showModal, setShowModal] = useState(isOpen);
  const modalRef=useRef<HTMLDivElement>();
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  
  useEffect(() => {
    const clickHandler = (e: any) => {
      //if event click is outsise the div ref of the modal clsoe modal
      if (!modalRef.current?.contains(e.target)) {
        return modal.onClose()
      }
     
    }
    document.addEventListener('mousedown', clickHandler)
    
    return () => {
      document.removeEventListener('mousedown', clickHandler)
    }
  });



  if(isOpen=='close'){
    return null;
  }
  return (
      <div>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
         
        "
      >
        <div className="
          relative 
          w-full
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          z-50 
         flex
         items-center
         justify-center
         border-2 border-red-500
          "
          
        >

     
      {/* this modal container is perfect for all conditio try to make the child component width fixed for md and for smaller full according to parent div */}

    {/* container for modal with ref to not close and have size of modal */}
     <div ref={modalRef} className=" border-2 border-red-500 w-[95%]  sm:w-[80%] md:w-fit">
     {children}
     </div>


    
     
    
    
      
      </div>
    </div>
      </div>
  )
}

export default Modal;