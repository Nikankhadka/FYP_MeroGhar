
'use client'

import Link from 'next/link'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import  {PropertyRow, TableHeader } from '../../../components/Row'
import {useState} from 'react'
import PostPropertyForm from '../../../components/postproperty'
import { Property } from '../../../interface/response'
import Card from '../../../components/card/card'


interface Props{
  is_Admin:boolean,
  properties?:Partial<Property>[]
}

export default function ListingComp({is_Admin,properties}:Props) {

    const [listPorperty,setlistProperty]=useState(false)
    
    
    if(properties?.length===0){
      return(
        <main className="ml-0 my-20 border-2 border-red-600 md:ml-[230px] md:my-10 lg:ml-[260px]">
        <p className="text-lg font-semibold text-center">{is_Admin?"No properties to Verify":"No Propert here"}</p>
      </main>
      )
    }

  return (
    <main>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex lg:mt-1.5">
        <div className="mb-1 mx-auto w-full sm:w-[98%]">
          <div className="mb-4">

            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Listings
            </h1>
          </div>
          <div className="block items-center justify-between dark:divide-gray-700 sm:flex md:divide-x md:divide-gray-100">
            <div className="mb-4 flex items-center sm:mb-0">
              <form className="sm:pr-3">
                <label className="sr-only">Search</label>
                <div className="relative mt-1 w-48 sm:w-64 xl:w-96">
                  <input
                    type="text"
                  
                  
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Search for Property"
                  />
                </div>
              </form>
            </div>

      {/* only for normal user */}
            {!is_Admin&&<button
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-themeColor px-5 py-2.5 text-sm font-medium text-white hover:bg-mainColor focus:outline-none focus:ring-4"
              type="button"
              onClick={(e)=>{
                e.preventDefault();
                setlistProperty(!listPorperty)
              }}
              >
              List Property
            </button>}


          </div>
        </div>
      </div>
     
        {/* only available for kyc verified user */}
        {
          listPorperty&&<PostPropertyForm setlistProperty={setlistProperty}/>
        }
          

           {!listPorperty&&<div className="w-[96%]  p-2 mx-auto my-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
             
    
               
                {
                    properties!.map((property)=>{
                        return(
                            // property card
                            <Card user={is_Admin? 'admin':'user'} data={property}/>
                    
                            
                        )
                    })
                }

                
              </div>
            }
          
        
     

      {/* paginatioon footer */}
      {!listPorperty&&<div className="sticky bottom-0 right-0 w-full  border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
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
