
import { RiDeleteBin6Fill } from "react-icons/ri"
import {FiEdit } from 'react-icons/fi'
import Link from "next/link"


export  function PropertyRow(){

    const is_Admin=false;
    return(
        <div className="hover:bg-gray-100 p-3 dark:hover:bg-gray-700 flex items-center justify-around">
       
          <div className="flex items-center ">
            <input
              id="checkbox-{{ .id }}"
              aria-describedby="checkbox-1"
              type="checkbox"
              className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
            />
            <label className="sr-only">checkbox</label>
          </div>
       

       
          <div className="text-md font-semibold text-gray-700 dark:text-white">
            Rooom1
          </div>
          <div className="text-md dark:text-gray-400">
            status
          </div>


          <Link href='#' className=" block text-sm font-semibold underline dark:text-gray-400">
            View
          </Link>

          <Link href='#' className=" block text-sm font-semibold underline dark:text-gray-400">
            Host
          </Link>

          <div className="text-md dark:text-gray-400">
            Price
          </div>
     
         <div>
         <button
            type="button"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
          >
            <FiEdit   className="mr-2 h-4 w-4" />
            Update
          </button>
          <button
            type="button"
            className="inline-flex items-center  ml-2 rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
          >
            <RiDeleteBin6Fill  className="mr-2 h-4 w-4" />
            Delete item
          </button>
         </div>
       
      </div>
    )
}




export function TableHeader(){
  const is_Admin=false;
  const userheader=['LISTING','VIEW',"STATUS","HOST","PRICE",]
  const adminheader=['LISTING','VIEW',"STATUS","HOST","PRICE"]
  return(
    <div className="hover:bg-gray-100 bg-gray-100  p-3 dark:hover:bg-gray-700 flex items-center justify-around">
       
    <div className="flex items-center ">
      <input
       
        type="checkbox"
        className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
      />
      <label className="sr-only">checkbox</label>
    </div>
    
    {
      is_Admin?adminheader:userheader.map((Head)=>{
        return(
          <div className="text-sm text-gray-600 font-bold dark:text-gray-400">
          {Head}
        </div>
        )
      })
    }

      <div className="text-sm  p-2 w-[220px] text-gray-600 font-bold dark:text-gray-400">
        ACTIONS
      </div>
 
</div>
  )
}