import NavBar from "../../components/navbar/navbar"
import Card from "../../components/card"

export default async function UserHome(){



    return(
        <main className="w-full ">
        <NavBar theme="dark" authState={true}  img=''/>
        {/* for Property Viwed By users */}
        <div className="w-[95%] mx-auto my-24">
        <div className="text-left my-10 font-bold">Recently Viewed Property</div>
     
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