

import ClientComp from "../../components/clientComp"
import { checkSession } from "../../api/server/auth"
import { getProperties } from "../../api/server/property/getProperty"
import { getFavourites } from "../../api/server/property/getwishlist"
import { HomeClient } from "./HomeClient"


export default async function Home(){

    const properties=await getProperties(1,10)
    const {session,userData}=await checkSession()



    //for admin since admin/non logged no wishlist

  if(!session||userData.is_Admin)return(
    <ClientComp>
    <HomeClient properties={properties}  userData={userData}/>
    </ClientComp>
    )

  
    //user exclusive
    const wishList=await getFavourites(1,20);
   
    return(
      <ClientComp>
        <HomeClient properties={properties} wishList={wishList} userData={userData}/>
      </ClientComp>
    )
    
}