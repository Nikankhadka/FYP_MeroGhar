'use client'

import Link from "next/link"
import { GoVerified} from "react-icons/go"
import { MdCancel } from "react-icons/md"
import { kycRequests } from "../../api/server/user/getUser"
import useModal from "../../customHoooks/useModal"
import useConfirm from "../../customHoooks/useConfirm"
import { verifyKyc } from "../../api/client/admin"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import useVerify from "../../customHoooks/useVerify"
import * as _ from 'lodash'

interface UserProps{
  userData:kycRequests
}

export default function UserCard({userData}:UserProps){
  const modal=useModal();
  const confirm=useConfirm()
  const verify=useVerify()
  const router=useRouter()
  const{userName,userId,_id,profileImg,about}=userData


    return(
    <main className="w-[95%] sm:w-[80%] mx-auto p-4 rounded-lg border-2 bg-white border-gray-200  hover:shadow-xl  duration-300 ">
     
      <div className="my-3">
        <img src={profileImg.imgUrl!=''?profileImg.imgUrl:'/user.png'} alt="property" className="  rounded-full h-28 w-28 " />
      </div>

      <div className="mt-3 text-gray-700 text-md font-semibold ">{_.capitalize(userName)}</div>
      <p className="mt-1  text-gray-500 text-sm font-semibold">{about} dfsa sd fsadf sadf asd fsd fasdfsdfsdf</p>

      

        <div className="mt-4 flex items-center gap-x-2  ">
         <button
            type="button"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
          onClick={(e)=>{
            e.preventDefault();
            console.log('verify')

            confirm.onContent({
              header:'Are You Sure To Verify?',
              actionBtn:"Verify",
              onAction:async()=>{
                const res=await verifyKyc(_id,{isVerified:true});
                if(res){
                  toast.success(`User ${userId} verified successfully`);
                   modal.onClose();
                  return router.refresh();
                }

                toast.error("Failed to verify User");
                return modal.onClose()
              }
            })

            modal.onOpen('confirm')

          }}
          >
          <GoVerified   className="mr-2 h-4 w-4" />
            Verify
          </button>
          <button
            type="button"
            className="inline-flex items-center  ml-2 rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
          onClick={(e)=>{
            e.preventDefault();
            console.log('reject')
            verify.onContent({
              onReject:async(message:string)=>{
                const res=await verifyKyc(_id,{isVerified:false,message});
                  if(res){
                    toast.success("User kyc Rejected");
                    modal.onClose();
                    return router.refresh();
                  }
                  toast.error("Kyc rejection Failed!");
                  return modal.onClose();
              }
            })





            modal.onOpen("reject")
          }}
          >
            <MdCancel  className="mr-2 h-4 w-4" />
            Reject
          </button>
         </div>
    </main>
    )
}