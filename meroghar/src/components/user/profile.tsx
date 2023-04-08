'use client'

import { HiOutlineBadgeCheck } from 'react-icons/hi'
import { HiStar } from 'react-icons/hi'
 
import{HiCheck} from 'react-icons/hi'
import { EditBasic } from './Edit'
import {useState} from 'react'
import Link from 'next/link'
import Card from '../card'

export default function Profile() {
  


  const [EditProfile,setEditProfile]=useState(false)

  return (
    <main className="mx-auto  md:ml-10 p-3  w-[95%] sm:w-[90%] lg:w-[80%]">
      
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hi, I am Ronnin</h2>
          <p className="text-sm text-gray-700">Joined in 2022</p>
        </div>
        <img
          src="/user.png"
          alt="user"
          className="h-17 w-17 block sm:h-20 sm:w-20"
        />
      </div>

      <div className="my-3 flex flex-col gap-2">

        <div>
        <Link href='/account-settings' className=" block mb-2 text-left text-sm font-bold underline">Account-Settings</Link>
        <button onClick={(e)=>{
          e.preventDefault();
          setEditProfile(true)
        }} className="mb-2 text-left text-sm font-bold underline">
          Edit Profile
        </button>

       
        </div>
        

        <div className="my-2 flex items-center gap-x-2">
          <HiOutlineBadgeCheck className="h-6 w-6 stroke-themeColor  " />
          <span className="block">Identity Verified</span>

          
        </div>

        <div className="flex items-center gap-x-2 ">
          <HiStar className="h-6 w-6 fill-themeColor" />
          <span>76 Reviews</span>
          <Link href='#' className='underline font-semibold text-sm'> Show all reviews</Link>
        </div>

        <div className="flex items-center gap-x-2 ">
          <HiStar className="h-6 w-6 fill-themeColor" />
          <span>5.0 Average Rating</span>
        </div>

      </div>
        

      <hr className="my-5 border-gray-400" />

      <div className=' my-5  flex  items-center justify-around '>
      <div className="flex items-center gap-x-2 ">
          <HiCheck className="h-6 w-6 fill-themeColor" />
          <span>Identity</span>
        </div>

        <div className="flex items-center gap-x-2 ">
          <HiCheck className="h-6 w-6 fill-themeColor" />
          <span>Email</span>
        </div>

        <div className="flex items-center gap-x-2 ">
          <HiCheck className="h-6 w-6 fill-themeColor" />
          <span>Phone Number</span>
        </div>

      </div>


      <hr className="my-5 border-gray-400" />


      {/* this all will not be rendered on  */}
      {
        !EditProfile&&<div className='my-2 p-2 w-[95%] md:w-[80%]'>
         <h2 className='my-2 text-lg font-semibold'>About</h2>
         <p className='text-md text-gray-700'> Lorem Ipsum is simply dummy text of the printing and typesetting
               industry. Lorem Ipsum has been the industry's standard dummy text
               ever since the 1500s, when an unknown printer took a galley of
               type and scrambled it to make a type specimen book. It has
               survived not only five centuries, but also the leap into
               electronic typesetting, remaining essentially unchanged</p>
       </div>
      }
     

      {
        EditProfile&& <EditBasic setEditProfile={setEditProfile} />
      }

  


    </main>
  )
}
