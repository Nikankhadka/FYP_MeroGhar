import ClientComp from "../../../components/clientComp";
import ListingComp from "../../listings/listingClient";


export default function UserListing(){
    

    return(
     <main className="ml-0 my-20 border-2 border-red-600 md:ml-[230px] md:my-10 lg:ml-[260px]">
    <ClientComp>
    <ListingComp />
    </ClientComp>
     
     </main>
    )
 }