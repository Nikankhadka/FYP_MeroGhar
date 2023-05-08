'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SocialLogin } from './buttons'
import { inputStyle } from '../styles/variants'
import { loginSignupModal } from '../interface/buttons'
import { LoginRegisterInput } from '../interface/request'
import { ErrorText } from './random'
import axios from 'axios'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {useState} from 'react'
import { useRouter } from 'next/navigation'
import useModal from '../customHoooks/useModal'
import { toast } from 'react-hot-toast'


//since this component will be used multiple places always check the page before rendering the component

export default function LoginSignup({ login,modal }: loginSignupModal): JSX.Element {
  
  const {register,handleSubmit,watch,formState: { errors }} = useForm<LoginRegisterInput>()

    const loginSignupModal=useModal();
  const router=useRouter();
  const[invalid,setinvalid]=useState(false);
  const[alert,setalert]=useState(false)

  const onSubmit: SubmitHandler<LoginRegisterInput> = async(data) => {
    console.log(data)
    const {userId,password}=data
    if(login){
      try{
        const res=await axios.post("http://localhost:2900/auth/v1/login",{userId,password},{withCredentials:true})
      if(res.data.success){
        console.log('login succesful')
        // if(res.data.user.is_Admin){}
          toast.success("Login Successful!")
          router.refresh();
          return loginSignupModal.onClose()
           
          
          
      }
      toast.error("Login Failed/Invalid Credential")
     return  router.push('/Home')
      }catch(e:any){
        toast.error("Login Failed/Invalid Credential")
        return  router.push('/Home')
      }
      
    }

    //for signup
    try{
    const res=await axios.post("http://localhost:2900/auth/v1/registerUser",{userId,password},{withCredentials:true})
    if(res.data.success){
     
      toast.success("User Registeres Successfully!")
      loginSignupModal.onOpen('login')
      
    }
    throw new Error(`${res.data.error}`)
    }catch(e:any){
      toast.error("User Registration Failed!");
      
    }
    
   
  }

  const style1='bg-white border-2 border-gray-200 flex  flex-col items-center justify-center rounded-lg shadow-lg md:w-[540px]'

  return (
    
    <div className={style1} >
      
     
   
      <div className=" flex w-full items-center my-5  border-b-2 border-gray-200 p-3">
        <p className="w-11/12 text-center text-lg font-semibold text-mainColor ">
          {login ? 'Log in' : 'Sign up'}
        </p>
        
        {/* close button only renders for modal not for page */}
        {modal&&<button className="rounded-full p-1 hover:bg-hoverColor"
        onClick={(e)=>{
          e.preventDefault();
          loginSignupModal.onClose()
        }}>
          <img src="/close.png" alt="cros" className="h-4 w-4 " />
        </button>}
      </div>

      <div className="flex w-full justify-center p-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  w-11/12 flex-col items-center justify-center gap-1 "
        >
          <p className=" my-3 w-[95%] text-left text-xl font-semibold text-mainColor">
            Welcome to MeroGhar
          </p>

          <input
            type="text"
            placeholder="userId"
            className="text-md my-1 h-11 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor"
            {...register('userId', { required: true, minLength: 4 })}
          />

          {errors.userId && ( <ErrorText text='Please Enter Valid UserId'/>)}
          <input
            type="password"
            placeholder="password"
            className={inputStyle}
            {...register('password', {
              required: true,
              minLength: 4,
              // pattern:
              //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            })}
          />
          <p className='text-sm text-gray-500'>minimum 6 Letters  A capital small A number and Special character</p>
          {errors.password && (
          <ErrorText text="Please Enter Valid Password" />
          )}

          {login && (
            <Link
              href="#"
              className="text-md my-1 mr-6 self-end text-mainColor hover:underline"
            >
              Forgot Password?
            </Link>
          )}

           {invalid&&<p className='text-sm text-red-600 my-3'>Invalid UserId/Password</p>}
          <input
            type="submit"
            className="text-md my-1 w-[95%] cursor-pointer rounded-md bg-themeColor p-2 text-white hover:bg-mainColor"
            value={login ? 'Log in' : 'Sign up'}
          />

          <div className="flex w-full items-center justify-center">
            <hr className="my-4 w-[44%] border-[1px] border-gray-400" />
            <span className="text-md mx-1">or</span>
            <hr className="my-4 w-[44%] border-[1px] border-gray-400" />
          </div>

          <SocialLogin
            placeholder="Continue with Google"
            url="http://localhost:2900/auth/v1/google-login"
            img="/google.png"
          />
          <SocialLogin
            placeholder="Continue with Facebook"
            url="http://localhost:2900/auth/v1/facebook-login"
            img="/facebook.png"
          />
          <div className="my-1  flex w-full items-center justify-center">
            <span className="text-md my-2">
              {login ? 'Dont Have Account ?' : 'Have Account ?'}{' '}
{      !modal  &&      <Link
                href={
                  login
                    ? 'http://localhost:3000/signup'
                    : 'http://localhost:3000/login'
                }
                className="text-md text-mainColor hover:underline"
              >
                {login ? 'Sign Up' : 'Login'}
              </Link>}

              {      modal  &&<button

                className="text-md text-mainColor hover:underline"
                onClick={(e)=>{
                  e.preventDefault();
                  //switch from login to register
                  if(login){
                    loginSignupModal.onOpen('signup')
                    return;
                  }
                  
                  loginSignupModal.onOpen('login')

                }}
              >
                {login ? 'Sign Up' : 'Login'}
              </button>}

            </span>
          </div>
        </form>
      </div>
    </div>
    
  )
}
