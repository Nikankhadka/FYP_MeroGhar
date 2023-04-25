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
        
          <h1 className='text-center font-semibold text-lg'>
            No Properties to Verify!
          </h1>
     
      )
    }

    return (
     
        <ClientComp>
          <ListingComp is_Admin={true} properties={properties} />
        </ClientComp>
     
    )
  }

  const properties = await getMyProperties(1, 10)
  return (
   
      <ClientComp>
        <ListingComp is_Admin={false} properties={properties} kycVerified={userData.kycVerified}/>
      </ClientComp>
  
  )
}
