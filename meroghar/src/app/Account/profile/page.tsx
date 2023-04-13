import Profile from '../../../components/user/profile'
import Card from '../../../components/card/card'
import { getUser } from '../../../api/server/user/getUser';
import { checkSession } from '../../../api/server/auth';
import Link from 'next/link'

export default async function Dashboardprofile() {
  const session=await checkSession();
  const userData=await getUser(session.userData.userId);
  
  return (
    <main className="my-20 ml-0 md:my-10 md:ml-[230px] lg:ml-[260px]">
      <div className="mx-auto w-[98%]  p-3  sm:w-[90%] lg:w-[85%]">
      <Profile userId={session.session?session.userData.userId:""} profileData={userData} />

        <div>
          <hr className="my-8 border-gray-400" />
          {/* show users listing kind of pagination in map */}
          <h2 className=" mx-2 my-2 text-lg font-semibold">Listings</h2>
          <div className="mx-auto my-2 grid w-full grid-cols-1 gap-x-2 gap-y-4 p-2 sm:grid-cols-2 md:grid-cols-3 ">
            <Card />
            <Card />
          </div>

          <Link href="#" className=" mx-2 my-2 text-sm font-semibold underline">
            show Listings
          </Link>
        </div>
      </div>
    </main>
  )
}
