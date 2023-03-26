import Link from "next/link"
import { GoVerified} from "react-icons/go"
import { MdCancel } from "react-icons/md"


export default function UserCard(){
    return(
    <main className=" w-[95%] p-3 rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
     
      <div className="my-3">
        <img src="/prop1.jpg" alt="property" className=" mx-auto rounded-full h-24 w-24" />
      </div>

        <div className="my-3 text-gray-700 font-bold text-center"> Nikan Khadka</div>
        <Link href='#' className=" block my-3 text-gray-700 text-sm font-bold text-center underline">View Profile</Link>

        <hr className=' border-gray-300 my-3'/>
        <div className="my-2 flex justify-around items-center ">
         <button
            type="button"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
          >
            <GoVerified   className="mr-2 h-4 w-4" />
            Verify
          </button>
          <button
            type="button"
            className="inline-flex items-center  ml-2 rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
          >
            <MdCancel  className="mr-2 h-4 w-4" />
            Reject
          </button>
         </div>
    </main>
    )
}