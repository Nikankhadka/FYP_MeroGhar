
import Card from "../../components/card/card"

import NavBar from "../../components/navbar/navbar"
import { SecondaryFooter } from "../../components/footer"
import ClientComp from "../../components/clientComp"
import { checkSession } from "../../api/server/auth"
import { getProperties } from "../../api/server/property/getProperty"
import{AiFillStar} from 'react-icons/ai'
import { getFavourites } from "../../api/server/property/getwishlist"

export default async function Home(){

    const properties=await getProperties(1,10)
    const {session,userData}=await checkSession()
   
  if(!session||userData.is_Admin)return(
        <main className="w-full ">

        {/* for Property Viwed By users */}
        <div className="w-[95%] mx-auto">
        Hello check 

        <ClientComp>
        <div className="w-full my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5"   >
            {
                properties.map((property,index)=>{
                    
                    return(
                        <Card use="card" index={index} data={property} user={userData.is_Admin?'admin':''} />
                    )
                })
            }
        </div>
        </ClientComp>
       
            <button className=" block mx-auto bg-themeColor text-sm text-white font-semibold hover:bg-mainColor px-3 py-2 border border-white transition-all rounded-lg hover:scale-105 ">LoadMore</button>
        </div>
       
    </main> 
    )

    //get wishlist
    const wishList=await getFavourites(1,20);
    console.log(wishList)
    return(
        <main className="w-full ">

        {/* for Property Viwed By users */}
        <div className="w-[95%] mx-auto">
        Hello for user

        <ClientComp>
        <div className="w-full my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5"   >
            {
                properties.map((property,index)=>{
                    
                    if(wishList.wishList.some((id)=>id._id==property._id)){
                        console.log("inwishlist")
                        return(
                            <Card use="card" index={index} wish={true} data={property} user={userData.is_Admin?'admin':(userData.docId==property.userId?'owner':"user")} />
                        )
                    }
                    
                    return(
                        <Card use="card" index={index} wish={false} data={property} user={userData.is_Admin?'admin':(userData.docId==property.userId?'owner':"user")} />
                    )
                })
            }
        </div>
        </ClientComp>
       
            <button className=" block mx-auto bg-themeColor text-sm text-white font-semibold hover:bg-mainColor px-3 py-2 border border-white transition-all rounded-lg hover:scale-105 ">LoadMore</button>
        </div>
       
    </main> 
    )
    
}