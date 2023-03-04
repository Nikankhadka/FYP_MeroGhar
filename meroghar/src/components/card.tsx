import Link from 'next/link'
import { Arrow } from './buttons'
import Wish from './Svg/wishSvg'

export default function Card() {
  return (
    <main className=" w-[98%]  rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      <div className="margin-bottom-3">
        <Link href="#">
          <img src="/prop1.jpg" alt="property" className=" w-full  rounded-lg" />
        </Link>
        
      </div>
       <div className='flex justify-center gap-3'>
        <Arrow next={false}/>
        <Arrow next={true}/>
       </div>

      <div className=" flex w-[95%] items-center justify-between">
        <Wish active={false} />
        <p className="flex items-center">
          <img src="/rate.png" alt="rate" width={20} height={20} />
          <span className="text-md text-gray-600">5.0</span>
        </p>
      </div>

      <div className="my-2 w-[95%] mx-auto">
        <p className="text-sm font-bold">Nepal,kathmandu-kapan</p>
        <p className="gray-600 text-sm">
          <span className="text-sm font-bold">Rs 200</span> Night
        </p>
      </div>
    </main>
  )
}
