import { authCheck } from "../../Api/auth"





export default async function AdminPage(){
    await authCheck(true)

    return(
        <main className='my-24'>
            hello admin here
        </main>
    )
}