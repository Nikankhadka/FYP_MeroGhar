
import SideBar from '../../components/sidebar';
import DashboardNav from '../../components/navbar/DashboardNav';
import ClientComp from '../../components/clientComp';
import ToasterProvider from '../../components/toast/toastProvider';
import { ConfirmModal } from '../../components/modals/confirmModal';






export default async function Layout({children}: {children: React.ReactNode}) {


 
  

  return (

      <main className=' flex flex-col'>
      

        <ClientComp>
        <DashboardNav />
        </ClientComp>
      
        {/* this children represents each page component  that is rendered */}
        {children}
        <ClientComp>  
        <SideBar is_Admin={true} menu={false}  />
        </ClientComp>
        
        
        
      </main>
    
  )
}
