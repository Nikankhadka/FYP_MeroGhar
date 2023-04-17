
import Card from "../components/card/card"

import NavBar from "../components/navbar/navbar"
import { SecondaryFooter } from "../components/footer"
import ClientComp from "../components/clientComp"
import { checkSession } from "../api/server/auth"

export default async function Home(){

    const session=await checkSession()
   
    if(!session.session){
        return(
            <main className="w-full ">
                <ClientComp>
                <NavBar theme="dark" authState={false}  img='' Z={'0'}/>
                </ClientComp>
               
                {/* for Property Viwed By users */}
                <div className="w-[95%] my-24 mx-auto">
                
                <div className="w-full mx-auto my-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>

               
                </div>
                
            </main>
        )
    }

    console.log("session xa hai",session)
    return(
        <main className="w-full ">
        <ClientComp>
        <NavBar theme="dark" authState={true}  img={session.userData.img} Z={'0'}/>
        </ClientComp>
        {/* for Property Viwed By users */}
        <div className="w-[95%] mx-auto my-24">
        <div className="text-left text-lg font-semibold underline">Recently Viewed Property</div>

       <ClientComp>
      
       </ClientComp>
       
        </div>
       
    </main> 
    )
    
}