'use client'

import { useEffect, useState } from "react"
import { FetchedMe, IBooking, Property } from "../../interface/response"
import Api from "../../api/client/axios"
import TripBookingClient from "../listing/TripsReservationClient"
import {BsFillHouseCheckFill,BsFillHouseSlashFill} from 'react-icons/bs'

import{FaUserCheck,FaUserTimes} from 'react-icons/fa'
import Link from "next/link"
import * as lodash from 'lodash'
import useReject from "../../customHoooks/useReject"
import useModal from "../../customHoooks/useModal"

interface AdminTable{
    use?:string,
    bookings?:Partial<IBooking>[],
    users?:Partial<FetchedMe>[],
    properties?:Partial<Property>[]
}


export default function AdminTable({use,users,properties,bookings}:AdminTable) {

        // const [stateBookings,setStateBookings]=useState()
        // const [stateUsers,setStateUsers]=useState(users)
        // const [stateProperties,setStateProperties]=useState(properties)
        const [search,setSearch]=useState('')
        const modal=useModal()
        const reject=useReject()

        

        useEffect(()=>{


            const onSearch=async()=>{
                Api.get
            }


            onSearch();
        },[search])

        
        const banUser=(userId:string)=>{
            console.log('ban')
            // first set content
            reject.setbtn('BanUser');
            reject.onContent({
                onReject:(message:string)=>{
                    
                }
            })

            return modal.onOpen('reject')
        }




    if(use=='booking'){
        return(
            <TripBookingClient trips={false} is_Admin={true} bookings={bookings!} />
        )
    }




  return (
    <main>
      <div className="mx-auto mb-1  w-[96%] p-2">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl sm:font-bold">
            {use=='user'&&'Total Users'}
            {use=='property'&&'Total Properties'}
            {use=='booking'&&'Total Bookings'}
          </h1>
        </div>

       { use!=='booking'&&<div className="block items-center justify-between dark:divide-gray-700 sm:flex md:divide-x md:divide-gray-100">
            <div className="mb-4 flex items-center sm:mb-0">
              <form className="sm:pr-3">
                <label className="sr-only">Search</label>
                <div className="relative mt-1 w-48 sm:w-64 xl:w-96">
                  <input
                    type="text"
                  
                  
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Search "
                  />
                </div>
              </form>
            </div>

          </div>}
      </div>

      <hr className="my-4 border-gray-400" />


        {/* for Actual Table Content  */}
      <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    S.No
                  </th>

                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    {use=='user'&&'userName'}
                    {use=='property'&& 'Property Name'}
                    
                  </th>

                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                   {use=='user'&&'About'}
                    {use=='property'&& 'Host'}
                 
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

        {
        
        use=='property'&& properties!.map((data,index)=>{
            console.log(data);
            return(
              <tbody key={index} className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">

              <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
                  {index+1}.
                </td>
                
                <Link href={`/Home/rooms/${data._id}` } target='_space' ><td className="mr-12 flex items-center space-x-3 whitespace-nowrap p-4">
                  <img className="h-16 w-20 rounded-lg" src={data.images![0]!.imgUrl} />

                  <div className="text-base font-semibold  text-gray-800 dark:text-white">
                    {data.name}
                  </div>
                </td></Link>

                <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
                  {data.isBanned?.status? "Banned":"Active"}
                </td>

             
              <td className="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-900 dark:text-gray-400 xl:max-w-xs">
              <Link href={`/Home/user/${typeof(data.userId)=='object'?data!.userId!._id!:''}`} className='underline'>  {lodash.capitalize(typeof(data.userId)=='object'?data!.userId!.userName!:'')}</Link>  
               </td>

               

              
                {/* for owner */}
                <td className="space-x-2 whitespace-nowrap p-4">
                 { !data.isBanned?.status&&<button
                    type="button"
                    
                    className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
                 >
                <BsFillHouseSlashFill className="mr-2 h-5 w-5" />
                    BanProperty
                  </button>}

                  {data.isBanned?.status&&<button
                    type="button"
                    className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                   
                    >
                <BsFillHouseCheckFill className="mr-2 h-5 w-5" />
                  UnBan Property
                  </button>}
                </td>

                
              </tr>
            </tbody>
            )
          })

        }

          {
            use=='user'&& users!.map((data,index)=>{
                console.log(data);
                return(
                  <tbody key={index} className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
    
                  <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
                      {index+1}.
                    </td>
                    
                    <Link href={`/Home/user/${data._id}` } target='_space' ><td className="mr-12 flex items-center space-x-3 whitespace-nowrap p-4">
                      <img className="h-16 w-16 rounded-full" src={data.profileImg!.imgUrl==''?'/user.png':data.profileImg!.imgUrl} />
    
                      <div className="text-base font-semibold  text-gray-800 dark:text-white">
                        {data.userName}
                      </div>
                    </td></Link>
    
                    <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
                      {data.isBanned?.status? "Banned":"Active"}
                    </td>
    
                 
                  <td className="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-900 dark:text-gray-400 xl:max-w-xs">
                    {data.about==''? '.........................................':data.about }
                   </td>
    
                   
    
                  
                    {/* for owner */}
                    <td className="space-x-2 whitespace-nowrap p-4">
                      {data.isBanned?.status&&<button
                        type="button"
                        
                        className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
                     >
                        <FaUserCheck className="mr-2 h-5 w-5" />
                        UnBanUser
                      </button>}
    
                   { !data.isBanned?.status&&<button
                        type="button"
                        className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                        onClick={(e)=>banUser(data.userId!)}
                        >
                    <FaUserTimes className="mr-2 h-5 w-5" />
                      Ban User
                      </button>}
                    </td>
    
                    
                  </tr>
                </tbody>
                )
              })
          }
         


       

            </table>
          </div>
        </div>
      </div>
    </div>




    </main>
  )
}
