import { checkSession } from "../api/auth"


export default async function Home(){

    const session=await checkSession()

   if(session){
    return(
        <main className="my-20">
            hello user
        </main>
    )}

   if(!session) return(
        <main className="my-20">
            hello 
        </main>
    )
}