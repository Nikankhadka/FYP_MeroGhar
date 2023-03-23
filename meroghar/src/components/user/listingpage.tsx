
'use client'

import Link from 'next/link'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import  {PropertyRow, TableHeader } from '../Row'
import {useState} from 'react'
import PostPropertyForm from '../postproperty'

export default function ListingComp() {

    const [listPorperty,setlistProperty]=useState(false)
    const columnHeader=["Listing","View","Status","Host","Price","Actions"]
    const rowData=['Room1','room2' ,'room3','room4']

  return (
    <main>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex lg:mt-1.5">
        <div className="mb-1 w-full">
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
            <button
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-themeColor px-5 py-2.5 text-sm font-medium text-white hover:bg-mainColor focus:outline-none focus:ring-4"
              type="button"
              onClick={(e)=>{
                e.preventDefault();
                setlistProperty(!listPorperty)
              }}
              >
              List Property
            </button>
          </div>
        </div>
      </div>
     
        {
          listPorperty&&<PostPropertyForm/>
        }
          
           {!listPorperty&&<div className="overflow-hidden shadow border-2 border-red-500">
             
    
                <TableHeader /> 
                {
                    rowData.map((data)=>{
                        return(
                            <div>
                              <PropertyRow />
                            </div>
                            
                        )
                    })
                }

                
              
            </div>}
          
        
     

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
