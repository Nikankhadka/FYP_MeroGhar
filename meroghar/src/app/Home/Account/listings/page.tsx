import { checkSession } from "../../../../api/server/auth";
import { getMyProperties } from "../../../../api/server/property/getProperty"
import ClientComp from "../../../../components/clientComp";
import ListingComp from "../../../../components/listing/listingClient";


export default async function Listing(){
    const properties=await getMyProperties(1,10);
    const {session,userData}=await checkSession()

    return(
        <ClientComp>
            <div className="border-2 border-red-500 mx-auto ">
            <ListingComp is_Admin={false} properties={properties} kycVerified={userData.kycVerified} />
            </div>
           
        </ClientComp>
    )
}