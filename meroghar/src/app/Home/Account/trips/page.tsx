//wil contain my reservations information 

import { checkSession } from "../../../../api/server/auth";
import { NoAuth } from "../../../../components/NoAuth";
import ClientComp from "../../../../components/clientComp";
import  Link from 'next/link'


export default async function MyTrips(){
    
    const {session,userData}=await checkSession()

    const trips=[]
   


    if(false){
        return(
          
            <main className="w-full">
            <div className="my-24 mx-auto w-[95%] md:w-[84%]">
               
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
        <div className="mx-auto w-[95%]  md:w-[84%]  ">
           {
            trips.length==0&&<main className="w-full mt-12 ">
                                 <h1 className="text-3xl my-5 font-semibold">Trips</h1>
                                 <hr className="border-gray-300 my-5" />
                                <h1 className="text-2xl my-5 font-semibold">No trips found !!!</h1>
                                <p className="text-gray-700 mb-6">Time to dust off your bags and start planning your next adventure ....</p>
                                <Link href={'/Home'} className=" font-semibold p-3 px-5 transition-all  text-black border-2 border-gray-900 rounded-lg hover:bg-gray-100">Start Searching</Link>
                               
                              
                            </main>

           }
           
           {
            trips.length!=0&& <main>

                            </main>

           }
        
        </div>
        </main>
    )
}