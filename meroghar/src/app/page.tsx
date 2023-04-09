import { checkSession } from "../api/server/auth"
import Card from "../components/card"

import NavBar from "../components/navbar/navbar"

export default async function Home(){

    const session= await checkSession()
    if(!session){
        return(
            <main className="w-full ">
                <NavBar theme="dark" authState={false}  img='' Z={'0'}/>
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

    return(
        <main className="w-full ">
        <NavBar theme="dark" authState={true}  img='' Z={'50'}/>
        {/* for Property Viwed By users */}
        <div className="w-[95%] mx-auto my-24">
        <div className="text-left my-10 font-bold">Recently Viewed Property</div>
        <button>check toast</button>
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