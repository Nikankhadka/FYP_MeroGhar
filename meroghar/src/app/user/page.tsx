
import { headers } from 'next/headers';

export default async function User(){

    //simple validation setup 
    const headersInstance = headers()
    console.log(headersInstance.get('cookie'))
    
    return(
        <div>
            hello this is user
        </div>
    )
}