

import Link from "next/link"
import { forwardRef, useState} from "react"
import LoginSignup from "../loginSignup"
import useLoginModal from "../../customHoooks/useModal"

import Modal from "../modals/modal"
import useModal from "../../customHoooks/useModal"



const btnstyle="w-full text-sm text-gray-600 text-left p-2 px-3 rounded-md hover:bg-hoverColor"

 interface InitiailModal{
    authState:boolean
   
 }

 type Ref = HTMLDivElement;

 const InititailModalC =forwardRef<Ref,InitiailModal>((props,ref):JSX.Element=>{
    const modal=useModal();


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
            <Link href="/postProperty" className={btnstyle}>Post Property</Link>
            <Link href="/use" className={btnstyle}>Rent Property</Link>
            <Link href="#" className={btnstyle}>Help</Link>

            

        </div>
    )
  }  

  return(
    <div  ref={ref} className="absolute top-[68px]  w-60  border-2 border-gray-100 overflow-hidden translate-x-[-69%] p-1 shadow-xl bg-white  rounded-lg z-50  flex flex-col gap-2    ">
        <Link  href='/user/messages' className={`${btnstyle} font-semibold`}>Messages</Link>
        <Link  href='/user/wishlists' className={`${btnstyle} font-semibold`}>WishLists</Link>
        <Link  href='/user/booking' className={`${btnstyle} font-semibold`}>Bookings</Link>
        
        <hr />
        <Link  href='/user/dashboard/listings' className={`${btnstyle}`}>Manage Listings</Link>
        <Link  href='/user/dashboard' className={`${btnstyle}`}>Account</Link>
        <hr />
        <button className={btnstyle}>Log Out</button>
    </div>
)

})


export default  InititailModalC