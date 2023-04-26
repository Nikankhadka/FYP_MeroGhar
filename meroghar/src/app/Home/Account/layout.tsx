

import { checkSession } from '../../../api/server/auth';

import { cookies } from 'next/headers';






export default async function Layout({children}: {children: React.ReactNode}) {

    const {session,userData}=await checkSession()
    const cookieStore=cookies();
    const theme=cookieStore.get("theme")?.value||'light'
  

  return (

      <main className=' flex flex-col'>
      

       
      
        {/* this children represents each page component  that is rendered */}

        
        <div className={`mx-auto my-5 rounded-lg  w-[95%] sm:w-[90%] lg:w-[80%]`}  >
          {children}
        </div>
      
      
      
        
       
       
        
        
        
      </main>
    
  )
}
