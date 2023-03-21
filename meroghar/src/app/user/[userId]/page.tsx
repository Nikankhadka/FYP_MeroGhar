
import Profile from "../../../components/user/profile"

type Params = {
    params: {
      userId: string
    }
  }
  
  export default async  function Room({ params: { userId } }: Params) {


    

    return(
        
           <main className="my-20">
               <Profile />
           </main>
         
       
    )

}