import AccountComponent from "../../../components/user/account";
import { checkSession } from "../../../api/server/auth";
import ClientComp from "../../../components/clientComp";
import { getMe } from "../../../api/server/user/getUser";
import Profile from "../../../components/user/profile";
import { bg } from "../../../styles/variants";





export default async function AccountSetting(){

  const session=await checkSession();

  const userData= await getMe();
  const{userName,createdAt,profileImg,kyc,recievedReviewcount,avgRating,email,kycInfo} =userData

    return(
    


    <ClientComp>
    <div className={`mx-auto my-5 rounded-lg  w-[95%] sm:w-[90%] lg:w-[80%]`}  >
    <Profile userId={session.session?session.userData.docId:""} profileData={userData} />
    </div>
    </ClientComp>
    
    
  
   
      
   
    
   

    )
}