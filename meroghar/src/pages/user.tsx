import axios from "axios"
import { GetServerSideProps } from "next"
import { AppContextType } from "next/dist/shared/lib/utils"

export default function User(){
    return(
        <main>
            hello user
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log('inside get sss')
    const{req,res}=context
    try{
        
        
       
        console.log(req.headers.cookie)
        const response = await axios.post(
            'http://localhost:2900/auth/v1/refreshToken',
            {},
            {
              withCredentials: true,
              headers: {
                cookie:req.headers.cookie
              },
            })
        
            if(!response.data.success) console.log("fuck u")

            const cookies=response.headers['set-cookie'] 
            req.headers.cookie =cookies!
            res.setHeader('set-cookie',cookies!)

            console.log(req.headers.cookie)

            
        return {
            props:{
                fsdfsa:'hello'
            }
        }

    }catch(e){
        
    }

  }