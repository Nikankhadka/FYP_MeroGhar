import { checkSession } from "../api/auth"
import Card from "../components/card"

export default async function Home(){

    const session=await checkSession()

   if(session){
    return(
        <main className="my-20">
            hello user
        </main>
    )}

   if(!session) return(
        <main className="my-20 w-full ">
            {/* for Property Viwed By users */}
            <div className="w-[95%] mx-auto">
            <h3 className="w- text-left">Recently Viewed Property</h3>
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