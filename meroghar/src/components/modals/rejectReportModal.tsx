'use client'

import useModal from "../../customHoooks/useModal"
import ConfirmComp from "./confirmComp"

import { RxCross1 } from "react-icons/rx"
import Modal from "./modal"

import { inputStyle } from "../../styles/variants"
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { ErrorText } from "../random"
import { verifyKyc } from "../../api/client/admin"
import useVerify from "../../customHoooks/useVerify"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
interface formProps{
    message:string
}


export function MessageModal(){
    const confirmModal=useModal()
      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
      } = useForm<formProps>()
      const verify=useVerify();
      const router=useRouter()

    if(confirmModal.isOpen=='verify'||confirmModal.isOpen=='reject'){
        
    
    return(
        <>
        <Modal isOpen={confirmModal.isOpen}>
          <div className="bg-white w-full p-4 rounded-lg shadow-lg border-2 border-gray-300 md:w-[550px]">

          <div className='w-full my-4'>
        <label className='block my-1 text-sm font-semibold'>Message</label>
            <input
            type="textarea"
            placeholder="message"
            className={inputStyle}
            {...register('message', { required: true, minLength:1 })}
          />
          {errors.message && ( <ErrorText text='Please Enter Accept/Reject Message for clarity'/>)}
        </div>



            <hr className="border-gray-400"/>
            <div className=" mt-4 flex items-center justify-around">
                <button className="font-sm font-semibold underline" 
                onClick={(e)=>{
                    e.preventDefault();
                    confirmModal.onClose()
                }}>Cancel</button>


                <button type='submit' onClick={handleSubmit(async(data)=>{
                    verify.action.onReject(data.message)
                  
                  
                })} className={`py-2 px-4 text-white font-semibold rounded-lg ${confirmModal.isOpen=='verify'? 'bg-themeColor hover:bg-mainColor':'bg-red-500 hover:bg-red-700'}`}>{confirmModal.isOpen=='verify'?'Verify':"Reject"}</button>
            </div>

          </div>
        </Modal>
        
        </>
    )}
    return null;
}


