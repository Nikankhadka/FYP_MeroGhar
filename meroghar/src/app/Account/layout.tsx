
import SideBar from '../../components/sidebar';
import DashboardNav from '../../components/navbar/DashboardNav';
import ClientComp from '../../components/clientComp';
import { checkSession } from '../../api/server/auth';






export default async function Layout({children}: {children: React.ReactNode}) {


  const {session,userData}=await checkSession()
  

  return (

      <main className=' flex flex-col'>
      

        <ClientComp>
        <DashboardNav />
        </ClientComp>
      
        {/* this children represents each page component  that is rendered */}
        {children}
        <ClientComp>  
        <SideBar is_Admin={userData.is_Admin} menu={false}  />
        </ClientComp>
        
        
        
      </main>
    
  )
}
