

'use client'

import useModal from "../../customHoooks/useModal"

import LoginSignup from "../loginSignup"
import { RxCross1 } from "react-icons/rx"
import Modal from "./modal"

export function ConfirmModal(){
    const confirmModal=useModal()
    if(confirmModal.isOpen!='confirm'){
        return null;
    }
    return(
        <>
        <Modal isOpen={confirmModal.isOpen}>
          <ConfirmComp />
        </Modal>
        
        </>
    )
}


function ConfirmComp(){
  const modal=useModal();


  return(
   
             
          <div className="w-full border-2 border-blue-500 md:w-[570px]  rounded-lg bg-white px-4 pt-5 pb-4   shadow-xl  ">
          <div className="flex items-center justify-end ">
            <button onClick={(e)=>{
                e.preventDefault();
                modal.onClose();
            }}><RxCross1 className="h-5 w-5 rounded-full hover:bg-slate-200" /></button>
          </div>

          {/* <hr className='border-[1px] border-gray-300 my-2' /> */}

          <h2 className="my-8 text-center text-xl font-bold text-gray-700">
            Are You Sure You want to Continue?
          </h2>

          <div className="flex justify-around">
            <button className="rounded-lg bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-700"
            
            onClick={(e)=>{
                e.preventDefault();
               modal.onClose();
            }}>
              Cancel
            </button>
            <button className="rounded-lg bg-themeColor px-4 py-2 text-white transition-all hover:bg-mainColor">
              Submit
            </button>
          </div>
        </div>
   
  )
}