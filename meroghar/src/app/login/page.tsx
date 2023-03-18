
import { checkSession } from "../../api/auth"
import LoginSignup from "../../components/loginSignup"
import { redirect } from 'next/navigation';

export default async function LoginPage(){

    const session=await checkSession()
    
   
    
   if(!session)return(
        <main className="my-20">
             <LoginSignup  login={true} modal={false}/>
        </main>
    )

    //else redirect to home 
    return redirect('/')
}  