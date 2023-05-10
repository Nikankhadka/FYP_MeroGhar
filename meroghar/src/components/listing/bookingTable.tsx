import { RiDeleteBin6Fill } from 'react-icons/ri'
import {

  AiOutlineCheckCircle,
} from 'react-icons/ai'
import {  IBooking, } from '../../interface/response'
import {BiCalendarEdit} from 'react-icons/bi'
import {BsHouseCheckFill} from 'react-icons/bs'
import Link from 'next/link'
import moment from 'moment'
import Api from '../../api/client/axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useConfirm from '../../customHoooks/useConfirm'
import useModal from '../../customHoooks/useModal'
import * as lodash from 'lodash'

interface Props{
  bookingData:Partial<IBooking>[],
  trips:boolean
 
}


export function BookingTable({bookingData,trips}:Props) {
  const router=useRouter();
  const confirm=useConfirm();
  const modal=useModal();
  console.log(trips);

  return (
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
                    Property
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
                   {trips? 'Host':"Tennant"}
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    StartDate
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    EndDate
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                   Bill
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
          bookingData.map((data,index)=>{
            console.log(data);
            return(
              <tbody key={index} className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">

              <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
                  {index+1}.
                </td>
                
                <Link href={`/Home/rooms/${data.propertyId?._id}` } target='_space' ><td className="mr-12 flex items-center space-x-3 whitespace-nowrap p-4">
                  <img className="h-16 w-20 rounded-lg" src={data.propertyId?.images![0]!.imgUrl} />

                  <div className="text-base font-semibold  text-gray-800 dark:text-white">
                    {data.propertyId?.name}
                  </div>
                </td></Link>

                <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
                  {data.status}
                </td>

             
              <td className="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-900 dark:text-gray-400 xl:max-w-xs">
              <Link href={`/Home/user/${data.userId?._id}`} className='underline'>  {lodash.capitalize(data.userId?.userName)}</Link>  
               </td>

                <td className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                  {moment(data.startDate).format('DD/MM/YY')}
                </td>
                <td className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                {moment(data.endDate).format('DD/MM/YY')}
                </td>
                <td className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                 $ {data.paymentId?.totalAmount}
                </td>

                <td className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                <button className='px-3 text-sm font-semibold py-1 border-gray-500 border-[1px] rounded-lg hover:bg-gray-200'>
                  Bill
                </button>
                </td>

                {/* for owner */}
                {(!trips&&!data.checkInStatus)&&<td className="space-x-2 whitespace-nowrap p-4">
                  <button
                    type="button"
                    className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
                   onClick={()=>{
                    
                    confirm.onContent({
                      header:"Are you Sure You want to Check In!",
                      onAction:()=>{ Api.patch(`/property/v1/booking/confirmCheckIn/${data._id}`,{},{withCredentials:true}).then(()=>{
                        console.log("user checkedIn");
                        toast.success("Checked In Successfully!");
                        return router.refresh();
                      })
                      .catch(()=>{
                        toast.error("Check In Failed/Check In repeated!!");
                        return router.refresh();
                      })},
                      actionBtn:"Check In"
                    });

                    //now open confirm modal 
                    modal.onOpen("confirm");
                   

                   }}

                  >
                    <AiOutlineCheckCircle className="mr-2 h-5 w-5" />
                    CheckIn
                  </button>

                  <button
                    type="button"
                    className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                   
                  >
                    <RiDeleteBin6Fill className="mr-2 h-5 w-5" />
                    Cancel Booking
                  </button>
                </td>}

                {/* for tennant */}
                {trips&&(!data.checkInStatus)&&<td className="space-x-2 whitespace-nowrap p-4">
                  <button
                    type="button"
                    className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
                   onClick={()=>{
                    
                    confirm.onContent({
                      header:"Are you Sure You want to Check In!",
                      onAction:()=>{ Api.patch(`/property/v1/booking/confirmCheckIn/${data._id}`,{},{withCredentials:true}).then(()=>{
                        console.log("user checkedIn");
                        toast.success("Checked In Successfully!");
                        return router.refresh();
                      })
                      .catch(()=>{
                        toast.error("Check In Failed/Check In repeated!!");
                        return router.refresh();
                      })},
                      actionBtn:"Check In"
                    });

                    //now open confirm modal 
                    modal.onOpen("confirm");
                   

                   }}

                  >
                    <BiCalendarEdit className="mr-2 h-5 w-5" />
                    Edit
                  </button>

                  <button
                    type="button"
                    className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                   
                  >
                    <RiDeleteBin6Fill className="mr-2 h-5 w-5" />
                    Cancel Booking
                  </button>
                </td>}


                {(!trips&&!data.checkOutStatus&&data.checkInStatus)&&<td className="space-x-2 whitespace-nowrap p-4">
                  <button
                    type="button"
                    className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
                    
                    onClick={(e)=>{
                 

                    confirm.onContent({
                      header:"Are you Sure You want to Check Out!",
                      actionBtn:"Check Out",
                      onAction:()=>{ Api.patch(`/property/v1/booking/confirmCheckOut/${data._id}`,{},{withCredentials:true}).then(()=>{
                        console.log("user checkedIn");
                        toast.success("Checked Out Successfully!");
                        return router.refresh();
                      })
                      .catch(()=>{
                        toast.error("Check In Failed!!");
                        return router.refresh();
                      })},
                     
                    });

                    //now open confirm modal 
                    modal.onOpen("confirm");
                   

                   }}

                  >
                    <AiOutlineCheckCircle className="mr-2 h-5 w-5" />
                    CheckOut
                  </button>

                
                </td>}

              {/* for both client and owner */}
              {data.checkInStatus&&<td className="space-x-2 text-sm font-semibold text-gray-600 whitespace-nowrap p-4">
                
                <div className='flex items-center gap-x-2'>
                {(trips?data.checkInStatus:data.checkOutStatus)&&<BsHouseCheckFill className='h-6 w-6' />}
               {data.status=='Completed'&&<p>  Booking Completed!   </p>}
               {(trips&&data.checkInStatus&&data.status!="Completed")&& <p>  Checked In!   </p>}
                </div>
              
                
                </td>}


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
  )
}
