import Link from "next/link"
import { Arrow } from "./buttons"



export default function WishlistCard(){
    return(
        <main>
        <div className="w-[98%]  rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        
        <Link href="/wishlists/444" className="block">
          <img src="/prop1.jpg" alt="property" className=" w-full  rounded-lg" />
        </Link>
        </div>

        <h2 className=" w-[98%] mt-4 text-lg font-bold text-gray-700">WishLists</h2>
    </main>
       
    )
}