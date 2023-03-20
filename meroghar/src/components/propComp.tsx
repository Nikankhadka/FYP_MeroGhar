'use client'

import Datepicker from 'react-tailwindcss-datepicker'
import { useState } from 'react'
import { inputStyle } from '../styles/variants'
import Link from 'next/link'


export function BookProperty() {
    const [value, setValue] = useState({ 
        startDate: new Date(), 
        endDate: new Date().setMonth(11) 
        });

  const handleValueChange = (newValue:any) => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  return (
    <main className="w-[95%] border-2 shadow-none my-4  rounded-lg md:w-[35%] md:shadow-lg  md:border-gray-300 ">
    
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
    <Datepicker value={value} onChange={handleValueChange} />
    </div>
   
    

    <form>
    <input type="number" className="w-full h-11 border-2 border-gray-300  my-1 rounded-md text-sm text-gray-700 text-md p-2 hover:bg-hoverColor" placeholder='No of Guest' />
    <button className='w-full border-2 border-gray-300 my-2 p-2 rounded-lg text-sm hover:border-themeColor'>Check Availability</button>
    
    <hr className=' border-gray-300 my-2'/>
    {/* pass form value from rouet then use catch all routes to access query values */}
    <Link href='#' className='block w-full my-2 text-sm text-center p-3 px-3 rounded-lg bg-themeColor text-white hover:bg-mainColor'>Reserve</Link>
    </form>


    </div>


    {/* Review Section */}
    </main>
  )
}
