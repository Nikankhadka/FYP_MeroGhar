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


interface sessionData{
  session:boolean,
  userData:{
    userId:string,
    is_Admin:boolean,
    img:string
  }
}
//for common routes can only be accessed by user/non user
export const checkSession=async():Promise<sessionData>=>{
  const cookieStore=cookies();
  const session=await cookieStore.get("session")?.value;
    if(!session){
      return {session:false,userData:{userId:"",is_Admin:false,img:''}}  
    }
    const sessionObj=await JSON.parse(session!)
    console.log("poagesobj",sessionObj)

    // role mismatched so unauthorized throw custom un authorized erorr 
    // if(sessionObj.is_Admin!==is_Admin){
    //   return {session:false,userData:{userId:"",is_Admin:false,img:''}} 
    // }
    
    //here if admin and redirection was here 
    return {session:true,userData:{userId:sessionObj.userId,is_Admin:sessionObj.is_Admin,img:sessionObj.img}}
    
}



export const getAccessToken=()=>{
  try{
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value
    if(!accessToken) throw new Error("no access token");
    const cookie=`accessToken=${accessToken}`
    console.log(cookie)
    return cookie;
  }catch(e){
    console.log(e);
    return '';
  }
}