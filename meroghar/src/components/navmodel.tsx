'use client'

import Link from "next/link"

const btnstyle="w-full text-sm text-gray-600 text-left p-2 px-3 rounded-md hover:bg-hoverColor"

 interface InititailModal{
    authState:boolean
 }


export default function InititailModal({authState}:InititailModal):JSX.Element{

  if(!authState){
    return(
        <div className="absolute top-[68px]  w-60  border-2 border-gray-100 overflow-hidden translate-x-[-69%] p-1 shadow-xl bg-white  rounded-lg z-50  flex flex-col gap-2 transition-all  ">
            <button className={`${btnstyle} font-semibold`}>Log in</button>
            <button className={btnstyle}>Sign Up</button>
            <hr />
            <a href="#" className={btnstyle}>Post Property</a>
            <a href="#" className={btnstyle}>Rent Property</a>
            <a href="#" className={btnstyle}>Help</a>
        </div>
    )
  }  

  return(
    <div className="absolute top-[68px]  w-60  border-2 border-gray-100 overflow-hidden translate-x-[-69%] p-1 shadow-xl bg-white  rounded-lg z-50  flex flex-col gap-2 transition-all    ">
        <Link  href='/user/messages' className={`${btnstyle} font-semibold`}>Messages</Link>
        <Link  href='/user/wishList' className={`${btnstyle} font-semibold`}>WishLists</Link>
        <Link  href='/user/booking' className={`${btnstyle} font-semibold`}>Bookings</Link>
        
        <hr />
        <Link  href='/user/booking' className={`${btnstyle}`}>Manage Listings</Link>
        <Link  href='/user/booking' className={`${btnstyle}`}>Account</Link>
        <hr />
        <button className={btnstyle}>Log Out</button>
    </div>
)

}