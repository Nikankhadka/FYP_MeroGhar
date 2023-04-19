import getReservations from '../../../api/server/property/getReservation'

import { getPropertyById } from '../../../api/server/property/getProperty'
import ClientComp from '../../../components/clientComp'
import { RoomClient } from './client'

// type Params = {
//   params: {
//     listingId: string
//   }
// }
// { params: { listingId }}:params

interface IParams {
  listingId: string
}

export interface Reservation {
  startDate: Date
  endDate: Date
}

export default async function Room({ params }: { params: IParams }) {
  // since get resevation can be used for multiple cases betrter to pass entire param obj

  const propertyData =getPropertyById(params.listingId)
  // const reservationsData = getReservations(params.listingId, '')

  // const [{ property, user, inWishList }, reservations] = await Promise.all([
  //   propertyData,
  //   reservationsData,
  // ])

  return (
    <ClientComp>
      <RoomClient
        reservations={reservations}
        propertyData={property}
        user={user}
        inWishList={inWishList}
      />
    </ClientComp>
  )
}
