
import SideBar from '../../../components/sidebar';
import DashboardNav from '../../../components/DashboardNav';






export default async function Layout({children}: {children: React.ReactNode}) {


 
  

  return (
    //toggle dark mode by getting dark mode from 
    <html >
      <head />
      {/* body sets the root layout for entire application */}
      <body className='bg-white flex flex-col'>
        

       <DashboardNav />
        {/* this children represents each page component  that is rendered */}
        {children}
        <SideBar is_Admin={false} menu={false}  />
        
        
      </body>
    </html>
  )
}
