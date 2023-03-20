'use client '

import {HiOutlineBadgeCheck} from "react-icons/hi";
import {HiStar} from "react-icons/hi";

export default function Profile(){
    
    return(
        <main className="w-[95%]  border-2 p-2 border-red-500 mx-auto md:w-[80%] lg:w-[70%]">
            
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Hi, I am Ronnin</h2>
                    <p className="text-sm text-gray-700">Joined in 2022</p>
                </div>
                <img src="/user.png" alt="user" className="block h-17 w-17 sm:h-20 sm:w-20" />
            </div>

        <div className="flex my-3 flex-col gap-2">
            <button className="underline text-sm font-bold text-left mb-2">Edit Profile</button>

           <div className="flex items-center gap-x-2 my-2">
           <HiOutlineBadgeCheck  className="h-6 w-6 "/>
           <span className="block">Identity Verified</span>

           {/* for the form set default value by fetching information which ever values he chnges is updated using same api  */}
           <button className="underline  text-sm font-bold ">Edit Kyc</button>
           </div>
           
           <div className="flex items-center gap-x-2 ">
           <HiStar className="h-6 w-6 " />
           <span>76 Reviews</span>
           </div> 
        </div>

        <hr className="my-5 border-gray-400" />
            
        </main>
    )
}