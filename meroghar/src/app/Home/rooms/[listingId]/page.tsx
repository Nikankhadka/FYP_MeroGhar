import getReservations, { getPropertyBookings } from '../../../../api/server/property/getReservation'

import { getPropertyById } from '../../../../api/server/property/getProperty'
import ClientComp from '../../../../components/clientComp'
import { RoomClient } from './client'
import { checkSession } from '../../../../api/server/auth'

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
  const reservationsData =getPropertyBookings(params.listingId)
  const {session,userData}=await checkSession()
  const [{ property, user, inWishList }, reservations] = await Promise.all([
    propertyData,
    reservationsData,
  ])

  const updatedReservations = reservations.map(reservation => {
    const newStartDate = new Date(reservation.startDate!)
    newStartDate.setDate(newStartDate.getDate() - 1)
    return {
      startDate: newStartDate,
      endDate: reservation.endDate!
    }
  })

  console.log('property population',property)
  
  return (
    <ClientComp>
      <RoomClient
        reservations={updatedReservations!}
        propertyData={property}
        user={user}
        is_Admin={userData.is_Admin}
        inWishList={inWishList}
      />
    </ClientComp>
  )
}
