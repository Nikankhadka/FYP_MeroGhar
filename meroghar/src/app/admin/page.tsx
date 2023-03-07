import { redirect } from 'next/navigation';

import { cookies } from 'next/headers';


export default function AdminPage(){
    const cookieStore = cookies();
    const session = cookieStore.get('session')?.value
    console.log('session',session)
    const sessionObj=JSON.parse(session!)
    
     if(!sessionObj.is_Admin) return redirect('/user')

    return(
        <main className='my-24'>
            <h1>Hello this is admin page</h1>
        </main>
    )
}