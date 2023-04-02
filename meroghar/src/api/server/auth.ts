import 'server-only'


import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


//for protected routes that canbe acessed by user/admin
export const authCheck=async(is_Admin:boolean)=>{
  try{
    const cookieStore = cookies();
    const session = cookieStore.get('session')?.value
    console.log('sessioninpage',session)
    if(!session){
        return redirect('/')
    }
    const sessionObj=await JSON.parse(session!)
    console.log("poagesobj",sessionObj)
    if(sessionObj.is_Admin!==is_Admin) {
      console.log(is_Admin)
        if(is_Admin)  return redirect('/admin');
        return redirect('/')
    }
  }catch(e){
    console.log(e)
  }
}

//for common routes can only be accessed by user/non user
export const checkSession=async():Promise<boolean>=>{
  const cookieStore=cookies();
  const session=cookieStore.get("session")?.value;
  if(!session) return false;
  const sessionObj=await JSON.parse(session);
  if(sessionObj.is_Admin) return redirect("/admin");
  return true
    
}