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
        <ListingComp is_Admin={false} properties={properties} />
      </ClientComp>
    </main>
  )
}
