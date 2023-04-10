
import SideBar from '../../components/sidebar';
import DashboardNav from '../../components/navbar/DashboardNav';
import ClientComp from '../../components/clientComp';
import ToasterProvider from '../../components/toast/toastProvider';
import { ConfirmModal } from '../../components/modals/confirmModal';






export default async function Layout({children}: {children: React.ReactNode}) {


 
  

  return (

      <main className='bg-white flex flex-col'>
      


       <DashboardNav />
        {/* this children represents each page component  that is rendered */}
        {children}
        <SideBar is_Admin={true} menu={false}  />
        
        
      </main>
    
  )
}
