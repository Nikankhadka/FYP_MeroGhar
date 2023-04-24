import { getMe } from "../../../api/server/user/getUser";
import Password from "../../../components/user/pasword";


export default async  function PasswordPage(){

    const {}=await getMe()

    return(
        <main  className="ml-0 my-20  p-3 md:ml-[230px] md:my-10 lg:ml-[260px]">
     
        <Password />
        </main>

    )
}