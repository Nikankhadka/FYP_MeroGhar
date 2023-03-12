
import LoginSignupModal from "../../components/loginSignupModal";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage(){


    // const cookieStore = cookies();
    // const session = cookieStore.get('session')?.value
    
    // if(session){
    //     const sessionObj=await JSON.parse(session!)
    //     if(sessionObj.is_Admin) return redirect('/admin')
    //     if(!sessionObj.is_Admin) return redirect ('/user')
    // }
   
    
    return(
        <main className="my-20">
             <LoginSignupModal  login={true}/>
        </main>
    )
}  