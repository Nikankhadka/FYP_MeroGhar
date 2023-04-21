'use client'

import Datepicker from 'react-tailwindcss-datepicker'
import { useState } from 'react'
import { inputStyle } from '../../styles/variants'
import Link from 'next/link'
import { ErrorText } from '../random'
import Api from '../../api/client/axios'
import { toast } from 'react-hot-toast'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'
import { checkout } from '../../configs/khalti'

import useModal from '../../customHoooks/useModal'
import { Property } from '../../interface/response'
import useBookingStore from '../../customHoooks/bookingStore'

interface Booking{
  reservations:{
    startDate:Date,
    endDate:Date
  }[]
  ,
  user:string,
  propertyData:Partial<Property>
}

export function BookProperty({reservations,user,propertyData}:Booking) {
    const [date, setdate] = useState({ 
        startDate:new Date(), 
        endDate: new Date()
        });

        console.log(reservations)
  const router=useRouter();
  const[guest,setguest]=useState(0)

  const[error,seterror]=useState(false);
  const modal=useModal()
  const bookingStore=useBookingStore()

const currentDate = new Date();
const maxDate = new Date();
maxDate.setFullYear(currentDate.getFullYear() + 1); // set the year to be one year after the current date
maxDate.setMonth(currentDate.getMonth()); // set the month to be the same as the current date
maxDate.setDate(currentDate.getDate()); // set the day to be the same as the current date

  const handleValueChange = (newValue:any) => {
    console.log('newValue:', newValue)
    
    setdate(newValue)
  }


  const onReserve=async(e:any)=>{
    e.preventDefault();

    // if(user==''){
    //   return modal.onOpen('login');
    // }

    // if(date.startDate==null||date.endDate==null||guest<=0){
    //   return seterror(true)
    // }

    bookingStore.setPropertyData(propertyData);
    bookingStore.setbookingInfo({
      guest:guest,
      startDate:date.startDate,
      endDate:date.endDate
    })
    modal.onOpen("booking")

    // // send post request 
    // const body={
    //   startDate:date.startDate,
    //   endDate:date.endDate,
    //   guest
    // }
    // try{
    //   const newBooking=await Api.post(`/property/v1/booking/64147e0b3f7adb1886790bfe`,body,{withCredentials:true});
    //   if(!newBooking.data.success){
    //     toast.error(newBooking.data.error)
    //     return seterror(true);
    //   }
    //    toast.success("Property reserved SuccessFully ")
    //     seterror(false);
    //     return router.refresh();
    // }catch(e:any){
    
    //   toast.error("This booking conflicts with an existing booking/Error occurred.");
    //   return seterror(true);
    // }
  }


  return (
    <main className="w-[95%] bg-white border-2 shadow-none my-4 p-3 rounded-xl md:w-[35%] md:shadow-lg  md:border-gray-200 ">
    
    <div className='flex justify-around items-center my-5'>
        <p className='text-lg font-bold'>$107 <span className='text-sm font-medium'>night</span></p>
        <div className='flex '>
            <img src="/rate.png" alt="rate"  className='h-5 w-5'/>
            <span>5.0</span>
            <button className='block mx-2 underline text-sm font-semibold text-gray-600'>reviews</button>
        </div>
    </div>
    
    <div className='w-[90%] mx-auto my-2 rounded-lg '>
    <div className='border-2 border-gray-300 rounded-lg my-2'>


{/* an array with start and end date for the dates to be disabled is passed */}
    <Datepicker value={date} onChange={handleValueChange}
    minDate={currentDate} 
    maxDate={maxDate} 
    disabledDates={reservations}/>
    </div>
   
    

    <form>
    <input type="number" className="w-full h-11 border-2 border-gray-300  my-1 rounded-md text-sm text-gray-700 text-md p-2 hover:bg-hoverColor" placeholder='No of Guest' value={guest}  onChange={(e)=>{
      console.log(guest)
      setguest(parseInt(e.target.value))}}/>
    
{   error&&<div className='my-2 '>
    <ErrorText text='Please Enter Valid Date/guest for Booking' />
    </div>}
   
    <hr className=' border-gray-300 my-2'/>
    {/* pass form value from rouet then use catch all routes to access query values */}
    <button type='submit'  className='block w-full my-2 font-semibold text-sm text-center p-3 px-3 rounded-lg bg-themeColor text-white hover:bg-mainColor' onClick={onReserve}>Reserve</button>

    <Link href="#" className='w-full block my-3 text-center  text-sm underline'>Contact Host</Link>

   

      
    </form>

   
    </div>

    {/* Review Section */}
    </main>
  )
}
