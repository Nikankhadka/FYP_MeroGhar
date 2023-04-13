import AccountComponent from "../../../components/user/account";
import { HiOutlineBadgeCheck } from 'react-icons/hi'

 import Link from "next/link";

import ClientComp from "../../../components/clientComp";
import { getMe } from "../../../api/server/user/getUser";
import { FiUserCheck,FiUserMinus } from 'react-icons/fi'
import { HiStar,HiMinus } from 'react-icons/hi'
 
import{HiCheck} from 'react-icons/hi'





export default async function AccountSetting(){

  const userData= await getMe();
  const{userName,created_At,profileImg,kyc,recieved_Reviewcount,avg_rating,email,kycInfo} =userData

    return(
      <main  className=" ml-0 my-24  md:ml-[230px] md:my-10 lg:ml-[260px]">


    <div className='mx-auto my-5 rounded-lg  bg-white  p-3  w-[95%] sm:w-[90%] lg:w-[85%] '>
      
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
      
    <ClientComp>
    <AccountComponent/>
    </ClientComp>
    
    </main>

    )
}