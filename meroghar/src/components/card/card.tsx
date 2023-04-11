
'use client'
import Link from 'next/link'
import { Arrow } from '../buttons'
import Wish from '../Svg/wishSvg'

// hover:-translate-y-1 hover:scale-105
export default function Card() {
  return (
    <main className="w-[98%] rounded-lg border-2 border-gray-300 hover:shadow-xl   duration-300">   

      <div className="margin-bottom-3">
        <Link href="/rooms/444">
          <img src="/prop1.jpg" alt="property" className=" w-full  rounded-lg" />
        </Link>
        
      </div>
       <div className='my-2 flex  justify-center gap-3'>
        <Arrow next={false}/>
        <Arrow next={true}/>
       </div>

      <div className=" flex px-2 items-center justify-between">
        <Wish active={false} />
        <p className="flex items-center">
          <img src="/rate.png" alt="rate" width={20} height={20} />
          <span className="text-md text-gray-600">5.0</span>
        </p>
      </div>

      <div className="my-2 w-[95%] mx-auto">
        <p className="text-sm font-semibold">Nepal,kathmandu-kapan</p>
        <p className="gray-600 text-sm">
          <span className="text-sm font-semibold">Rs 200</span> Night
        </p>
      </div>
    </main>
  )
}
