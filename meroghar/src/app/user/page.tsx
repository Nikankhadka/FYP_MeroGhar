import { cookies } from "next/headers"


export default function UserView(){
    //since use has been validated 
    const cookieStore=cookies()
    console.log(cookieStore.getAll())


    return(

        <h2>this is user view</h2>
    )
}