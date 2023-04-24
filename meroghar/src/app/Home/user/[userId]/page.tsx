
import Profile from "../../../../components/user/profile"
import Card from "../../../../components/card/card"
import Link from "next/link"
import NavBar from "../../../../components/navbar/navbar"
import { getUser } from "../../../../api/server/user/getUser"
import { checkSession } from "../../../../api/server/auth"
type Params = {
    params: {
      userId: string
    }
  }
  
export default async  function UserProfile({ params: { userId } }: Params) {
  
    const userData=await getUser(userId);
    const session=await checkSession();

    return(
    <main>

     
      <div className=" my-24 mx-auto   p-3  w-[98%] sm:w-[90%]  lg:w-[75%]">
      <Profile userId={session.session?session.userData.userId:""} profileData={userData} />


      <div className='mx-auto '>
      <hr className="my-8 border-gray-400" />
      {/* show users listing kind of pagination in map */}
      <h2 className=" mx-2 my-2 text-lg font-semibold">Listings</h2>
      
      {/* <div className="mx-auto my-2 grid w-full grid-cols-1 gap-x-2 gap-y-4 p-2 sm:grid-cols-2 md:grid-cols-3 ">
        <Card />
        <Card />
      </div> */}

      <Link href="#" className=" mx-2 my-2 text-sm font-semibold underline">
        show Listings
      </Link>
      </div>
      </div>
      
     


    </main>
         
       
    )

}