'use client'
import {useForm,SubmitHandler} from 'react-hook-form'

interface LoginRegister{
    userId:string,
    password:string
}

interface SocialLoginProps{
    placeholder:string,
    url:string,
    img:string
}

function SocialLogin({placeholder,url,img}:SocialLoginProps):JSX.Element{
    return(
        <a href={url} className='group w-[95%] my-1 border-2 border-gray-500  rounded-md  p-3 flex  items-center text-md text-mainColor hover:bg-mainColor' >
                <img src={img} alt="google" className='h-5 w-5 rounded' />
                <span className=' w-[90%] text-center group-hover:text-white'>{placeholder}</span>
        </a>
    )
}


const inputStyle='w-[95%] h-11 border-2 border-gray-400  my-1 rounded-md  text-gray-700 text-md p-2 hover:bg-hoverColor'
export default function LoginSignupModal():JSX.Element{
    const{register,handleSubmit,watch,formState:{errors}}=useForm()

    // const onSubmit:SubmitHandler<LoginRegister>=(data)=>{
    //     console.log(formData)
    // }

    return(
        <div className="w-4/5   md:w-[540px] mx-auto my-5 shadow-lg rounded-lg flex flex-col justify-center items-center">
      
            <div className=' w-full border-b-2 border-gray-200  p-3 flex items-center'>
                <p className='w-11/12 text-mainColor text-lg text-center font-semibold '>Log in or Sign up</p>
                <button className='p-1 rounded-full hover:bg-hoverColor'><img src="close.png" alt="cros" className='h-4 w-4 ' /></button>
            </div>

            <div className='w-full p-2 flex justify-center'>

            <form  className='w-11/12  flex flex-col justify-center items-center gap-1 '>

            <p className=' w-[95%] text-xl font-semibold my-3 text-mainColor text-left'>Welcome to MeroGhar</p>

            <input type="text" placeholder='userId' className='w-[95%] h-11 border-2 border-gray-400  my-1 rounded-md  text-gray-700 text-md p-2 hover:bg-hoverColor' {...register("userId",{required:true,minLength:4,maxLength:10})} />
           
            <input type='password' placeholder='password' className={inputStyle}{...register("password",{required:true,minLength:4,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/})} />
           
            <a href="#" className='text-md text-mainColor mr-6 my-1 self-end hover:underline'>Forgot Password?</a>
            <input type="submit" className='w-[95%] my-1 rounded-md text-md text-white p-3 bg-themeColor hover:bg-mainColor cursor-pointer' value="Login" />


            <div className='w-full flex justify-center items-center'>     
            <hr className='w-[44%] my-4 border-[1px] border-gray-400'  />
            <span className='text-md mx-1'>or</span>
            <hr className='w-[44%] my-4 border-[1px] border-gray-400'  />
            </div>

            
            <SocialLogin placeholder='Continue with Google' url='#' img='google.png'/>
            <SocialLogin placeholder='Continue with Facebook' url='#' img='facebook.png'/>
            <div className='w-full  my-1 flex justify-center items-center'>     
            
            <span className='text-md my-2'>Dont Have Account? <a href="#" className='text-md text-mainColor hover:underline'>Sign Up</a></span>
           
            </div>
        </form>
            </div>

      
        </div>

    )
}   