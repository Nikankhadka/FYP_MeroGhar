import { redirect } from 'next/navigation'
import { checkSession } from '../../../api/server/auth'
import ClientComp from '../../../components/clientComp'
import ListingComp from './listingClient'
import {
  getMyProperties,
  getPropertyRequests,
} from '../../../api/server/property/getProperty'

export default async function UserListing() {
  const { session, userData } = await checkSession()

  if (userData.is_Admin) {
    const properties = await getPropertyRequests(1, 10)

    if(properties.length==0){
      return(
        <main className="my-20 ml-0  md:my-10 md:ml-[230px] lg:ml-[260px]">
          <h1 className='text-center font-semibold text-lg'>
            No Properties to Verify!
          </h1>
      </main>
      )
    }

    return (
      <main className="my-20 ml-0 border-2 border-red-600 md:my-10 md:ml-[230px] lg:ml-[260px]">
        <ClientComp>
          <ListingComp is_Admin={true} properties={properties} />
        </ClientComp>
      </main>
    )
  }

  const properties = await getMyProperties(1, 10)
  return (
    <main className="my-20 ml-0 border-2 border-red-600 md:my-10 md:ml-[230px] lg:ml-[260px]">
      <ClientComp>
        <ListingComp is_Admin={false} properties={properties} kycVerified={userData.kycVerified}/>
      </ClientComp>
    </main>
  )
}
