'use client'

import { useState } from 'react'

export default function Review() {
  const [isActive, setIsActive] = useState(0)

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
          {rating.map((rate,index) => {
            return (
              <button
                onClick={(e) => {
                  setIsActive(index)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  className={
                    index<=isActive
                      ? 'h-7  w-7 fill-themeColor stroke-gray-100'
                      : 'h-7 w-7 fill-gray-400  stroke-gray-100  transition-all  hover:stroke-themeColor'
                  }
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Leave a comment..."
          ></textarea>

          <button className="my-2  block rounded-lg bg-themeColor p-2 px-3 text-center text-sm text-white hover:bg-mainColor">
            submit
          </button>
        </form>
      </div>
    </main>
  )
}
