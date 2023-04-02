
import { checkSession } from "../../api/server/auth"
import LoginSignup from "../../components/loginSignup"
import { redirect } from 'next/navigation';

import NavBar from "../../components/navbar";
export default async function Singup(){

    const session=await checkSession()
    
   
    
   if(!session)return(
        <main className="w-full">
        <NavBar theme="dark" authState={false}  img='' Z='0'/>
        <div className="my-24">
        <LoginSignup  login={false} modal={false}/>
        </div>
            
        </main>
    )

    //else redirect to home 
    return redirect('/')
}  