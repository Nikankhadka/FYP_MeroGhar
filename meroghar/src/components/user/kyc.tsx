'use client'


import {useForm,SubmitHandler} from 'react-hook-form'
import { ErrorText } from '../random'

interface form{
    firstName:string,
    lastName:string,
    gender:string,
    address:{
        country:string,
        city:string
    }
    image:any
}


const inputStyle="text-md my-1 h-11 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor"


export default function Kyc(){

    const {register,handleSubmit,watch,formState: { errors },control} = useForm<form>()

    const gender=['Male','Female','Others']
    const images=watch('image')
    console.log(images)

    const imageUrl=(index:number)=>{
      try{
        return  URL.createObjectURL(images[index][0])

      }catch(e){
        console.log(e)
        return ''
      }
    }

    const onSubmit: SubmitHandler<form> =async(formdata)=>{

    }
   

    return(
        <main className="w-[95%] md:w-[75%] border-2 border-red-500">
            <form >

                
            <div className='w-full grid grid-cols-1 md:grid-cols-2'>
        <div className='w-full'>
        <label className=' block text-sm font-bold'>firstName:</label>
        <input
            type="text"
            placeholder="firstName"
            className={inputStyle}
            {...register('firstName', { required: true })}
          />
          {errors.firstName && ( <ErrorText text='Please Enter Valid firstName'/>)}
        </div>

        <div className='w-full'>
        <label className=' block text-sm font-bold'>lastName:</label>
        <input
            type="text"
            placeholder="lastName"
            className={inputStyle}
            {...register('lastName', { required: true })}
          />
          {errors.lastName && ( <ErrorText text='Please Enter Valid lastName'/>)}
        </div>

        <div className='w-full'>
        <label className='text-sm font-bold'>Property Type :</label>
            <select className={inputStyle} {...register('gender', { required: true})}>
                {
                    gender.map((type)=><option value={type}>{type}</option>)
                }
            </select>
            
          {errors.gender && ( <ErrorText text='Select Property Type Pls'/>)}
          </div>

        <div className='w-full'>
        <label className='text-sm font-bold'>City  :</label>
            <input
            type="text"
            placeholder="Country"
            className={inputStyle}
            {...register('address.country', { required: true })}
          />
          {errors?.address?.country && ( <ErrorText text='Please Enter Valid Country'/>)}
        </div>

        <div className='w-full'>
        <label className='text-sm font-bold'>Area :</label>
            <input
            type="text"
            placeholder="City"
            className={inputStyle}
            {...register('address.city', { required: true})}
          />
          {errors?.address?.city && ( <ErrorText text='Please Enter Valid Country'/>)}
        </div>
      
      
        </div>
            </form>
        </main>
    )
}