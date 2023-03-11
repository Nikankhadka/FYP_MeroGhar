
import { headers } from 'next/headers';
import { authCheck } from '../../Api/auth';

export default async function User(){
await authCheck(false)

    
    return(
        <div className='my-24'>
            hello this is user
        </div>
    )
}