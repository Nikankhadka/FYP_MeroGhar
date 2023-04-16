'use client'

import { FiUserCheck,FiUserMinus } from 'react-icons/fi'
import { HiStar,HiMinus } from 'react-icons/hi'
 
import{HiCheck} from 'react-icons/hi'
import { EditBasic } from './Edit'
import {useState} from 'react'
import Link from 'next/link'
import Card from '../card/card'
import { FetchedUserData } from '../../interface/response'


interface ProfileProps{
  userId:string
  profileData:FetchedUserData
}

export default function Profile({userId,profileData}:ProfileProps) {
  
  const{profileImg,kycInfo,email,kyc,About,listing_Count,recieved_Reviewcount,avg_rating,created_At,_id,userName} =profileData

  const [EditProfile,setEditProfile]=useState(false)

  return (
    <main >
      
      <div className='bg-white p-3  rounded-xl border-2 border-gray-200 shadow-xl sm:border-white sm:shadow-none'>
      <div className="flex justify-between items-center flex-wrap-reverse">
        <div>
          <h2 className="text-2xl font-semibold">Hi, I am {userName}</h2>
          <p className="text-sm my-1 font-semibold text-gray-700">Joined in {new Date(created_At).getFullYear()} </p>
        </div>
        <img
          src={profileImg.imgUrl==""? '/user.png':profileImg.imgUrl}
          alt="user"
          className="rounded-full my-2 border-2 p-1 border-gray-300 shadow-lg w-[100px] h-[100px] md:w-[150px] md:h-[150px]" 
        />
      </div>

      <div className="my-3 flex flex-col gap-2">

        <div>
        {userId==profileData._id&&<Link href='/account-settings' className=" block mb-2 text-left text-sm font-semibold underline">Account-Settings</Link>}
        
        {userId==profileData._id&&<button onClick={(e)=>{
          e.preventDefault();
          setEditProfile(true)
        }} className="mb-2 text-left text-sm font-semibold underline">
          Edit Profile
        </button>}

       
        </div>
        

        <div className="my-2 flex items-center gap-x-2">
        {kyc.is_verified?<FiUserCheck className="h-6 w-6 stroke-themeColor  " />:
          <FiUserMinus className="h-6 w-6 stroke-themeColor  " />}
          <span className="block">Identity Verified</span>

          
        </div>

        <div className="flex items-center gap-x-2 ">
          <HiStar className="h-6 w-6 fill-themeColor" />
          <span>{recieved_Reviewcount} Reviews</span>
         { recieved_Reviewcount>0&&<Link href='#' className='underline font-semibold text-sm'> Show all reviews</Link>}
        </div>

        <div className="flex items-center gap-x-2 ">
          <HiStar className="h-6 w-6 fill-themeColor" />
          <span>{avg_rating} Average Rating</span>
        </div>

      </div>
      <hr className="my-5 border-gray-400" />

<div className=' my-5  flex  items-center justify-around '>
<div className="flex items-center gap-x-2 ">
    {kyc.is_verified?<HiCheck className="h-6 w-6 fill-themeColor" />:
    <HiMinus className="h-6 w-6 fill-themeColor" />}
    <span>Identity</span>
  </div>

  <div className="flex items-center gap-x-2 ">
  {email.is_verified?<HiCheck className="h-6 w-6 fill-themeColor" />:
    <HiMinus className="h-6 w-6 fill-themeColor" />}
    <span>Email</span>
  </div>

  <div className="flex items-center gap-x-2 ">
  {kycInfo.phoneNumber?<HiCheck className="h-6 w-6 fill-themeColor" />:
    <HiMinus className="h-6 w-6 fill-themeColor" />}
    <span>Phone Number</span>
  </div>

</div>


<hr className="my-5 border-gray-400" />
      </div>

        




      {/* this all will not be rendered on  */}
      {
        !EditProfile&&<div className='my-2 p-2 w-[95%] md:w-[80%]'>
         <h2 className='my-2 text-lg font-semibold'>About</h2>
         <p className='text-md bg-white text-gray-700 p-2 border-2 border-gray-200 shadow-lg rounded-lg'>{About? About:'..................'}</p>
       </div>
      }
     

      {
        EditProfile&& <EditBasic img={profileImg.imgUrl} setEditProfile={setEditProfile} userName={userName} About={About}/>
      }

  


    </main>
  )
}
