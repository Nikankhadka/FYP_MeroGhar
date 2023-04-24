
import Card from "../../components/card/card"

import NavBar from "../../components/navbar/navbar"
import { SecondaryFooter } from "../../components/footer"
import ClientComp from "../../components/clientComp"
import { checkSession } from "../../api/server/auth"
import { getProperties } from "../../api/server/property/getProperty"

export default async function Home(){

    const properties=await getProperties(1,10)
   
    return(
        <main className="w-full ">

        {/* for Property Viwed By users */}
        <div className="w-[95%] mx-auto my-24">
        Hello check 

        <ClientComp>
        <div className="w-full my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5"   >
            {
                properties.map((property,index)=>{
                    return(
                        <Card index={index} data={property}/>
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