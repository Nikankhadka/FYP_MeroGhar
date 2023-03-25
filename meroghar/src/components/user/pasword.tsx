'use client';

import {AiTwotoneSetting} from 'react-icons/ai'
import {useForm,SubmitHandler} from 'react-hook-form'
import { ErrorText } from '../random';

interface passwordform{
    oldPassword:string,
    newPassword:string,
    confirmNewPassword:string
}

const inputStyle="text-md my-2 h-11 w-[90%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor"

export default function Password(){

    const {register,handleSubmit,watch,formState: { errors },control} = useForm<passwordform>()

    const onSubmit: SubmitHandler<passwordform> =async(formdata)=>{
        console.log(formdata)
      }

    return(
        <main className="mx-auto md:ml-10 p-4 w-[95%] sm:w-[70%] md:w-[50%] border-2 border-gray-300 rounded-lg">
        <h2 className=" mb-5 text-2xl font-bold text-slate-700">Change Your Password</h2>
        <form >
            <div className='w-full my-2'>
        <label className=' block text-md  text-slate-700'>Old Password</label>
        <input
            type="text"
            placeholder="old Password"
            className={inputStyle}
            {...register('oldPassword', { required: true })}
          />
          {errors.oldPassword && ( <ErrorText text='Please Enter Valid Password'/>)}
        </div>
        <div className='w-full my-2'>
        <label className=' block text-md  text-slate-700'>New Password</label>
        <input
            type="text"
            placeholder="New password"
            className={inputStyle}
            {...register('newPassword', { required: true })}
          />
          {errors.newPassword && ( <ErrorText text='Please Enter Valid newPassword'/>)}

        </div>
        <div className='w-full my-2'>
        <label className=' block text-md  text-slate-700'>Confirm Password</label>
        <input
            type="text"
            placeholder="Password"
            className={inputStyle}
            {...register('confirmNewPassword', { required: true })}
          />
          {errors.confirmNewPassword && ( <ErrorText text='Please Enter Valid confirmed Password'/>)}
        </div>

        <hr className="my-5 border-gray-400" />  
        <div>
            <button type='submit' className=' mt-2   text-white p-2 px-4 bg-themeColor transition-all rounded-lg hover:bg-mainColor' 
                onClick={handleSubmit(onSubmit)}
            >Update</button>
        </div>
        </form>
          
        </main>
    )
}