import AccountComponent from "../../../components/user/account";
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import { HiStar } from 'react-icons/hi'
 import Link from "next/link";
import{HiCheck} from 'react-icons/hi'






export default function AccountSetting(){
    return(
        <main  className="ml-0 my-20  md:ml-[230px] md:my-10 lg:ml-[260px]">

        <div className="mx-auto  md:ml-10 p-3  w-[95%] sm:w-[90%] lg:w-[80%]  ">
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
    </div>
        
    <AccountComponent/>
    </main>

    )
}