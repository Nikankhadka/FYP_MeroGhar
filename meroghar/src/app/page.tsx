import { checkSession } from "../api/auth"
import Card from "../components/card"
import NavBar from "../components/navbar"

export default async function Home(){

    return(
        <main className="w-full ">
            <NavBar theme="dark" authState={false}  img=''/>
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