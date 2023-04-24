

import Link from "next/link"
import { forwardRef, useState} from "react"
import LoginSignup from "../loginSignup"
import useLoginModal from "../../customHoooks/useModal"

import Modal from "../modals/modal"
import useModal from "../../customHoooks/useModal"
import Api from "../../api/client/axios"
import { toast } from "react-hot-toast"
import {redirect, useRouter} from 'next/navigation'


const btnstyle="w-full text-sm text-gray-600 text-left p-2 px-3 rounded-md hover:bg-hoverColor"

 interface InitiailModal{
    authState:boolean
   
 }

 type Ref = HTMLDivElement;

 const InititailModalC =forwardRef<Ref,InitiailModal>((props,ref):JSX.Element=>{
    const modal=useModal();
    const router=useRouter()

  if(!props.authState){
    return(
        <div ref={ref} className="absolute top-[68px]  w-60  border-2 border-gray-100 overflow-hidden translate-x-[-69%] p-1 shadow-xl bg-white  rounded-lg z-50  flex flex-col gap-2   ">
            <button className={`${btnstyle} font-semibold`} 
            onClick={(e)=>{
                e.preventDefault();
               modal.onOpen('login')
                
            }}
            >Log in</button>


            <button onClick={(e)=>{
                e.preventDefault();
                modal.onOpen('signup')
                
                
            }}  className={btnstyle}>Sign Up</button>
            <hr />
            <Link href="/Account/listings" className={btnstyle}>Post Property</Link>
           

            

        </div>
    )
  }  

  return(
    <div  ref={ref} className="absolute top-[68px]  w-60  border-2 border-gray-100 overflow-hidden translate-x-[-69%] p-1 shadow-xl bg-white  rounded-lg z-50  flex flex-col gap-2    ">
        <Link  href='/wishlists' className={`${btnstyle} font-semibold`}>Trips</Link>
        <Link  href='/wishlists' className={`${btnstyle} font-semibold`}>WishLists</Link>
        <Link  href='/Bookings' className={`${btnstyle} font-semibold`}>Reservations</Link>
        
       
        
        <hr />
        <Link  href='/Account/listings' className={`${btnstyle}`}>Manage Listings</Link>
        <Link  href='/Account' className={`${btnstyle}`}>Account</Link>
        <hr />
        <button className={btnstyle}  onClick={(e)=>{
                e.preventDefault();
                const res= Api.delete('/auth/v1/logout',{withCredentials:true}).then((res)=>{
                    toast.success("User logged Out");
                    router.refresh()
                    return router.push('/Home')
                    
                }).catch((e)=>{
                  toast.success("User logged Out");
                  router.refresh()
                  return router.push('/Home')
                  
                })
                
            }}>Log Out</button>
    </div>
)

})


export default  InititailModalC