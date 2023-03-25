
import { checkSession } from "../../api/auth"
import LoginSignup from "../../components/loginSignup"
import { redirect } from 'next/navigation';

import NavBar from "../../components/navbar";
export default async function Singup(){

    const session=await checkSession()
    
   
    
   if(!session)return(
        <main className="w-full">
        <NavBar theme="dark" authState={false}  img=''/>
        <div className="mt-24">
        <LoginSignup  login={false} modal={false}/>
        </div>
            
        </main>
    )

    //else redirect to home 
    return redirect('/')
}  