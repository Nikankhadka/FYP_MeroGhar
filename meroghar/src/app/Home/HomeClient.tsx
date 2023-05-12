'use client'

import { SessionUser, sessionData } from "../../api/server/auth"
import Card from "../../components/card/card"
import { Property, wishlist } from "../../interface/response"
interface HomeProps{
    properties:Partial<Property>[],
    wishList:wishlist,
    userData:SessionUser
}
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export function HomeClient({properties,wishList,userData}:HomeProps){
    const router=useRouter();

    useEffect(()=>{
        return router.refresh();
    },[])


    return (
        <main className="w-full ">

        {/* for Property Viwed By users */}
        <div className="w-[95%] mx-auto">
        Hello for user

        
        <div className="w-full my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5"   >
            {
                properties.map((property,index)=>{
                    
                    if(wishList.wishList.some((id)=>id._id==property._id)){
                        console.log("inwishlist")
                        return(
                            <Card use="card" key={index} wish={true} data={property} user={userData.is_Admin?'admin':(userData.docId==property.userId?'owner':"user")} />
                        )
                    }
                    
                    return(
                        <Card use="card" key={index} wish={false} data={property} user={userData.is_Admin?'admin':(userData.docId==property.userId?'owner':"user")} />
                    )
                })
            }
        </div>
       
       
            <button className=" block mx-auto bg-themeColor text-sm text-white font-semibold hover:bg-mainColor px-3 py-2 border border-white transition-all rounded-lg hover:scale-105 ">LoadMore</button>
        </div>
       
    </main> 

    )
}