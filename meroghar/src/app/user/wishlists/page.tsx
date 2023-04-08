import NavBar from "../../../components/navbar/navbar";
import WishlistCard from "../../../components/WishlistCard";



export default function WishlistPage(){


    //conditionally render 2 component if user then fetch user data and gove wish list pack else render component with login button
    return(
        <main className="my-20 w-full ">
        <NavBar theme="dark" authState={false}  img=''/>
        <div className=" mx-auto w-[95%] sm:w-[80%] ">
        <h2 className="text-2xl font-bold text-gray-700">WishLists</h2>

        <div className="w-full mx-auto my-4 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
            <WishlistCard />
            <WishlistCard />
            <WishlistCard />
            <WishlistCard />
        </div>
        </div>
          
           
        </main>
    )
}