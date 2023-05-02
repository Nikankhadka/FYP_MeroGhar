'use client'

import { BiDotsHorizontalRounded } from "react-icons/bi"
import { AiFillStar,AiOutlineEdit,AiOutlineDelete } from "react-icons/ai"
import ReviewCard from "./reviewCard"
import { useState } from "react"


export default function Review(){
    const [edit,setedit]=useState(true)
    const [pop,setpop]=useState(false)
    return(
        <div className="rounded-lg p-4 border-2 border-gray-100 shadow-lg">

                  <div className='flex justify-between items-center'>
                  <div className="flex w-full items-center gap-x-3 ">
                    <img
                      src="/user.png"
                      alt="User"
                      className="block h-12 w-12 b-2 border-gray-300"
                    />
                    <p>
                      <span className="text-md block font-bold">UserId</span>
                      <span className="text-sm text-gray-700 ">
                        Date October
                      </span>
                    </p>
                  </div>
                
                <div>
                <button className='mr-4 mb-4 border-2 border-gray-200 px-2 py-1 rounded-lg hover:shadow-lg'
                  onClick={(e)=>{
                    setpop(!pop)
                  }}
                  >
                    <BiDotsHorizontalRounded className='h-5 w-5' />
                  </button>

                  {/* pop ko lagi */}
                  {pop&&<div className="p-2 border-2 border-gray-100 shadow-lg rounded-lg">
                  <button className=" text-sm text-left font-semibold mb-2 p-2 rounded-lg w-full hover:bg-hoverColor">
                  
                    Edit
                  </button>

                  <button className=" text-sm text-left font-semibold mb-2 p-2 rounded-lg w-full hover:bg-hoverColor">
                  
                    Delete
                  </button>
                  </div>}

                 </div>
                  
                </div>
                  

                  
                  <p className="text-md my-3 text-gray-700">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged
                  </p>
                  <div className='flex items-center justify-between'>

                  <p className="my-2 ml-1 flex items-center gap-x-2">
                    <AiFillStar className='h-4 w-4 mt-[2px]' />
                    <span className="block text-sm font-semibold">5.0</span>
                  </p>

                  {/* send api request to report this review so it can be checked by admin  can only be seen by owner*/}
                  <button className="flex items-center gap-x-2 underline mr-4">
                    <img src="/flag.png" alt="flag" className="block h-5 w-5" />
                    <span className="block text-sm font-semibold text-gray-700">
                      Report Review
                    </span>
                  </button>
                  </div>
                  
                  {/* render other comp here */}
                  {edit&&<div>
                    <ReviewCard />
                  </div>}
                </div>
    )
}