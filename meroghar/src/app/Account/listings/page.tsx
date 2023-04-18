import { redirect } from 'next/navigation'
import { checkSession } from "../../../api/server/auth";
import ClientComp from "../../../components/clientComp";
import ListingComp from "./listingClient";
import { getPropertyRequests } from '../../../api/server/property/getProperty';


export default async function UserListing(){
    
    const {session,userData}=await checkSession();
    

    if(userData.is_Admin){
        const properties=await getPropertyRequests(1,10);

        return(
            <main className="ml-0 my-20 border-2 border-red-600 md:ml-[230px] md:my-10 lg:ml-[260px]">
           <ClientComp>
           <ListingComp  is_Admin={true} properties={properties} />
           </ClientComp>
            
            </main>
           )
    }   

    // //get user property lisitng here
    return(
        <main className="ml-0 my-20 border-2 border-red-600 md:ml-[230px] md:my-10 lg:ml-[260px]">
       <ClientComp>
       <ListingComp  is_Admin={false} />
       </ClientComp>
        
        </main>
       )
   
 }