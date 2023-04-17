
import { RiDeleteBin6Fill } from "react-icons/ri"
import {FiEdit } from 'react-icons/fi'
import Link from "next/link"
import {BsFillClipboardCheckFill,BsHouseCheckFill,BsFillHouseDashFill} from'react-icons/bs'

export  function PropertyRow(){

    const is_Admin=true;
    return(
        <div className="bg-white hover:bg-slate-200 p-3 dark:hover:bg-gray-700 flex items-center justify-around">
       
          
       

       
          <div className="text-md font-semibold text-gray-700 dark:text-white">
            Rooom1
          </div>
          <div className="text-md dark:text-gray-400">
            status
          </div>


          <Link href='#' className=" block text-sm font-semibold underline dark:text-gray-400">
            View
          </Link>

          {is_Admin&&<Link href='#' className=" block text-sm font-semibold underline dark:text-gray-400">
            Host
          </Link>}

          <div className="text-md dark:text-gray-400">
            Price
          </div>
     
         {!is_Admin&&<div>  
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
         </div>}

         {is_Admin&&<div>  
         <button
            type="button"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
          >
            <BsHouseCheckFill  className="mr-2 h-4 w-4" />
            Verify
          </button>

          <button
            type="button"
            className="inline-flex items-center  ml-2 rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
          >
            <BsFillHouseDashFill  className="mr-2 h-4 w-4" />
            Reject
          </button>
         </div>}
       
      </div>
    )
}




export function TableHeader(){
  const is_Admin=false;
  const userheader=['LISTING','STATUS',"VIEW","PRICE",]
  const adminheader=['LISTING','STATUS',"VIEW","HOST","PRICE"]
  return(
    <div className="  bg-hoverColor  p-3 dark:hover:bg-gray-700 flex items-center justify-around">
       
  
     
    
    
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