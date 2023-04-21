'use client'

import { useState } from 'react'
import {AiFillStar} from 'react-icons/ai'
import { ErrorText } from './random';

export default function Review() {
  const [rate, setrate] = useState(0)
  const [review,setreview]=useState("");
  const [err,seterr]=useState(false);
  
  

  const rating = [1, 2, 3, 4, 5]
  return (
    <main className="my-3">
      <div>
        <div className="flex w-full items-center gap-x-3 ">
          <img src="/user.png" alt="User" className="block h-10 w-10" />
          <p>
            <span className="text-md block font-bold">UserId</span>
            <span className="text-sm text-gray-700 ">Date October</span>
          </p>
        </div>

        {/* rating stars */}
        <div className='my-2'>
          {rating.map((ratevalue,index) => {
            return (
              <button
                onClick={(e) => {
                  setrate(index)
                }}
              >
                <AiFillStar className={
                    index<=rate
                      ? 'h-7  w-7 fill-themeColor stroke-gray-100'
                      : 'h-7 w-7 fill-gray-400  stroke-gray-300  transition-all  hover:fill-themeColor'
                  }/>
                
                
              </button>
            )
          })}
        </div>
        <form>
          <label className="mb-2 mt-2 block text-left text-sm font-medium text-gray-900 dark:text-white">
            Your Review
          </label>
          <textarea
            id="message"
            rows={4}
            className="block w-full rounded-lg border my-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Leave a comment..."
            onChange={(e)=>setreview(e.target.value)}
          ></textarea>

          {err&&<ErrorText  text='please Provide rating and review Both!'/>}
          <button type='button' className="my-2  block rounded-lg bg-themeColor p-2 px-3 text-center text-sm text-white hover:bg-mainColor"
          onClick={(e)=>{
            e.preventDefault;
            if(rate+1<1||review.length<=2){
              return seterr(true)
            }
            console.log(rate+1,review);
          }}
          >
            submit
          </button>
        </form>
      </div>
    </main>
  )
}
