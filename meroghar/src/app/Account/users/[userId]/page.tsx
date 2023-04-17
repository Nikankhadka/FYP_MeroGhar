


import Card from '../../../../components/card/card'
import { getUser, getUserKyc } from '../../../../api/server/user/getUser';
import { authCheck, checkSession } from '../../../../api/server/auth';
import Link from 'next/link'
import { FiUserCheck,FiUserMinus } from 'react-icons/fi'
import { HiStar,HiMinus } from 'react-icons/hi'
import { bg } from '../../../../styles/variants';
import{HiCheck} from 'react-icons/hi'
import { IUserKyc } from '../../../../interface/response';
import ClientComp from '../../../../components/clientComp';


interface PageProps{
  params:{
    userId:string
  }
}

export default async function UserKycProfile({params:{userId}}:PageProps) {



 const Admin=authCheck(true);
 const userData=await getUserKyc(userId);
  
  const {kycInfo,email}=userData
  return (
    <ClientComp>
      <main className="my-20 ml-0 md:my-10 md:ml-[230px] lg:ml-[260px]">
      <div className="mx-auto w-[98%]  p-3  sm:w-[90%] lg:w-[85%]">
      

        <Profile userData={userData} />

    <div className={`mx-auto my-4 rounded-lg ${bg}  `} >   
    <div className=' p-3 w-full '>
    {/* for kyc header */}
    <h2 className='text-xl font-semibold  text-gray-700'> Personal Information</h2>
    <div className='mt-4'>
    <div>
    <Info title='First Name' value={kycInfo.firstName}/>
    <hr className="my-4 border-gray-400" />
    <Info title='Last Name' value={kycInfo.lastName}/>
    <hr className="my-4 border-gray-400" />
    <Info title='Gender' value={kycInfo.gender}/>
    <hr className="my-4 border-gray-400" />
    <Info title='Address' value={`${kycInfo.address.country},${kycInfo.address.state},${kycInfo.address.city}`} />
    <hr className="my-5 border-gray-400" />
    </div>
    
    <div>
    <Info title='Email' value={email.mail}/>
    <hr className="my-4 border-gray-400" />
    </div>

    <div>
    <Info title='Phone Number' value={kycInfo.phoneNumber}/>
    <hr className="my-4 border-gray-400" />
    </div>

   <div className=' p-3 flex items-center justify-between'>
    <p>
      <h1 className='font-semibold my-2'>Id</h1>
        <img src={kycInfo.img.imgUrl} alt="imghere" className='block h-auto w-[85%]  sm:w-[60%] rounded-lg my-2'/>
    </p>
  </div>
  </div>
  </div>
    </div>


        <div>
          <hr className="my-8 border-gray-400" />
          {/* show users listing kind of pagination in map */}
          <h2 className=" mx-2 my-2 text-lg font-semibold">Listings</h2>
          <div className="mx-auto my-2 grid w-full grid-cols-1 gap-x-2 gap-y-4 p-2 sm:grid-cols-2 md:grid-cols-3 ">
            <Card />
            <Card />
          </div>

          <Link href="#" className=" mx-2 my-2 text-sm font-semibold underline" >
            show Listings
          </Link>
        </div>
      </div>





    </main>
    </ClientComp>
    
  )
}



interface infoprops{
  title:string,
  value:string,
  
  }
function Info({title,value}:infoprops){
    return(
      <div className=' p-3 flex items-center justify-between'>
      <p>
        <h1 className='font-semibold my-1'>{title}</h1>
          <p className='text-sm text-gray-600'>{value}</p>
      </p>
      </div>
)}

interface ProfileProps{
  userData:IUserKyc
}

function Profile({userData}:ProfileProps){
  const {userName,created_At,profileImg,kyc,recieved_Reviewcount,avg_rating,email,kycInfo}=userData

  return(
    <main >
      
      <div className={`${bg} rounded-xl`}>
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
        {kyc.isVerified?<FiUserCheck className="h-6 w-6 stroke-themeColor  " />:
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
    {kyc.isVerified?<HiCheck className="h-6 w-6 fill-themeColor" />:
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


    </main>
  )
}