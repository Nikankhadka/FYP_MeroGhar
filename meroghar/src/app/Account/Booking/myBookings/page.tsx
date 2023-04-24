import { checkSession } from '../../../../api/server/auth'
import Card from '../../../../components/card/card'
import ClientComp from '../../../../components/clientComp'

export default async function MyBookings() {
  const { session, userData } = await checkSession()
  

  //fetch booking on made on my properties use my id and find host id then populate the property information using property id 
  return (
    <main className="my-20 ml-0 border-2 border-red-600 md:my-10 md:ml-[230px] lg:ml-[260px]">
      <div className="mx-auto w-[90%]">
        <h2 className="text-xl font-bold ">Bookings</h2>
        <p className="text-sm text-gray-700">
          Reservation/Bookings Made By You!
        </p>

        <ClientComp>
          <div className="mx-auto my-2 grid grid-cols-1 gap-x-2 gap-y-4 border-2 border-red-500 p-2 sm:grid-cols-2 lg:grid-cols-3 ">
            <Card />
          </div>
        </ClientComp>
      </div>
    </main>
  )
}
