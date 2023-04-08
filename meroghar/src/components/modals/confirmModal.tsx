

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
  return(
    <div>
              {/* modal content here */}
              <div className="inline-block  w-full md:w-[570px] transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all ">
          <div className="flex items-center justify-end ">
            <button onClick={(e)=>{
                e.preventDefault();
              
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
               
            }}>
              Cancel
            </button>
            <button className="rounded-lg bg-themeColor px-4 py-2 text-white transition-all hover:bg-mainColor">
              Submit
            </button>
          </div>
        </div>
    </div>
  )
}