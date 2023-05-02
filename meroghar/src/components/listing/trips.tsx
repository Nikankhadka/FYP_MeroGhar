
'use client'

import Link from 'next/link'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'

import { IBooking, Property } from '../../interface/response'
import Card from '../card/card'
import useRandom from '../../customHoooks/randomStore'
import { BookingTable } from './bookingTable'



interface Props{
trips:boolean
bookings:Partial<IBooking>[]
  
}

export default function TripBookingClient({trips,bookings}:Props) {

   

    


  return (
    <main>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex lg:mt-1.5">
        <div className="mb-1 mx-auto w-full sm:w-[98%]">
          <div className="mb-4">

            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
             {trips? "Trips !":"Reservations on Your Properties !"}
            </h1>
          </div>
         
        </div>
      </div>
     

        {bookings?.length!>0&&<div>
               {/* only available for kyc verified user */}
        
        
                          <BookingTable bookingData={bookings} trips={trips}  />
         

                
             
            
         </div>}
       


      

      {/* paginatioon footer */}
      {bookings?.length!>5&&<div className="sticky bottom-0 right-0 w-full  border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="#"
            className="bg-themeColor hover:bg-mainColor focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:ring-4"
          >
          <AiOutlineLeft className="mr-1 -ml-1 h-3 w-3 " strokeWidth='3'/>
            Previous
          </Link>
          <Link
            href="#"
            className="bg-themeColor hover:bg-mainColor focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:ring-4"
          >
            
            Next
            <AiOutlineRight className="ml-1 -mr-1 h-3 w-3 " strokeWidth='3'/>
          </Link>
        </div>
      </div>}

    </main>
  )
}
