'use client'

import { RxCross1 } from 'react-icons/rx'


interface props{
    setopenConfirm:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Cmodal({setopenConfirm}:props) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* modal content here */}
        <div className="inline-block w-[95%] transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="flex items-center justify-end ">
            <button onClick={(e)=>{
                e.preventDefault();
                setopenConfirm(false)
            }}><RxCross1 className="h-5 w-5 rounded-full hover:bg-slate-200" /></button>
          </div>

          {/* <hr className='border-[1px] border-gray-300 my-2' /> */}

          <h2 className="my-8 text-center text-xl font-bold text-gray-700">
            Are You Sure?
          </h2>

          <div className="flex justify-around">
            <button className="rounded-lg bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-700"
            
            onClick={(e)=>{
                e.preventDefault();
                setopenConfirm(false)
            }}>
              Cancel
            </button>
            <button className="rounded-lg bg-themeColor px-4 py-2 text-white transition-all hover:bg-mainColor">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
