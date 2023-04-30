//wil contain my reservations information 

import { checkSession } from "../../../../api/server/auth";
import {getOnBookings } from "../../../../api/server/property/getReservation";
import { NoAuth } from "../../../../components/NoAuth";
import ClientComp from "../../../../components/clientComp";
import  Link from 'next/link'
import TripBookingClient from "../../../../components/listing/trips";


export default async function MyTrips(){
    
    const {session,userData}=await checkSession()
    const trips=await getOnBookings(1,10)
    console.log("reservations",trips)
   
   


    if(!session){
        return(
          
            <main className="w-full">
            <div className=" mx-auto w-[95%]">
               
            <ClientComp>
                <NoAuth  Header="My Trips" header2="Log in to view your Trips/Reservations" header3="You can  View,Edit,Cancel your Trips once Logged In"/>
            </ClientComp>

            </div>
            </main>
           
    )
    }

//fetch trip/bookings made by me
    return(
        <main className="w-full bg-white ">
        <div className="mx-auto w-[95%] ">
           {
            trips.length==0&&<main className="w-full mt-12 ">
                                 <h1 className="text-3xl my-5 font-semibold">Reservations</h1>
                                 <hr className="border-gray-300 my-5" />
                                <h1 className="text-2xl my-5 font-semibold">No Reservations found !!!</h1>
                                <p className="text-gray-700 mb-6">Time to dust off your bags and start Promoting Your Place ....</p>
                                <Link href={'/Home/listings'} className=" font-semibold p-3 px-5 transition-all  text-black border-2 border-gray-900 rounded-lg hover:bg-gray-100">Start Renting Out</Link>
                               
                              
                            </main>

           }
           
           {
            trips.length!=0&&<main className="border-2 border-red-500">
                                <ClientComp>
                                    <TripBookingClient trips={false} bookings={trips} />
                                </ClientComp>
                            </main>

           }
        
        </div>
        </main>
    )
}