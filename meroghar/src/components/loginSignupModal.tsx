'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SocialLogin } from './buttons'
import { inputStyle } from '../styles/variants'
import { loginSignupModal } from '../interface/buttons'
import { LoginRegisterInput } from '../interface/inputs'
import { ErrorText } from './random'





export default function LoginSignupModal({ login }: loginSignupModal): JSX.Element {
  const {register,handleSubmit,watch,formState: { errors }} = useForm<LoginRegisterInput>()

  const onSubmit: SubmitHandler<LoginRegisterInput> = (data) => {
    console.log('inside on submit')
    console.log(data)
  }

  return (
    <div className="mx-auto   my-5 flex w-4/5 flex-col items-center justify-center rounded-lg shadow-lg md:w-[540px]">
     
      <div className=" flex w-full items-center  border-b-2 border-gray-200 p-3">
        <p className="w-11/12 text-center text-lg font-semibold text-mainColor ">
          {login ? 'Log in' : 'Sign up'}
        </p>
        <button className="rounded-full p-1 hover:bg-hoverColor">
          <img src="close.png" alt="cros" className="h-4 w-4 " />
        </button>
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
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            })}
          />
          {errors.password && (
          <ErrorText text="Please Enter Valid Password" />
          )}

          {login && (
            <a
              href="#"
              className="text-md my-1 mr-6 self-end text-mainColor hover:underline"
            >
              Forgot Password?
            </a>
          )}

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
            img="google.png"
          />
          <SocialLogin
            placeholder="Continue with Facebook"
            url="http://localhost:2900/auth/v1/facebook-login"
            img="facebook.png"
          />
          <div className="my-1  flex w-full items-center justify-center">
            <span className="text-md my-2">
              {login ? 'Dont Have Account ?' : 'Have Account ?'}{' '}
              <a
                href={
                  login
                    ? 'http://localhost:3000/signup'
                    : 'http://localhost:3000/login'
                }
                className="text-md text-mainColor hover:underline"
              >
                {login ? 'Sign Up' : 'Login'}
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}