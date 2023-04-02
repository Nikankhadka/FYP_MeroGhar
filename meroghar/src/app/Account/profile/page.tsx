import Profile from '../../../components/user/profile'
import Card from '../../../components/card'
import Link from 'next/link'

export default function Dashboardprofile() {
  return (
    <main className="my-20 ml-0  md:my-10 md:ml-[230px] lg:ml-[260px]">
      <Profile />


      <div className='mx-auto  md:ml-10 p-3  w-[95%] sm:w-[90%] lg:w-[80%]'>
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
     


    </main>
  )
}
