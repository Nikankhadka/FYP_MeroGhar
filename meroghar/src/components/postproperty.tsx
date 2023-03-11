'use client'

import { useState } from 'react'
import {useForm,useFieldArray,useWatch,Control} from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { ErrorText } from './random'
const inputStyle="text-md my-1 h-11 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor"

interface PropertyForm{
name:string,
city:string,
area:string,
discription:string,
property_type:string,
rule:string,
price:number,
images:{
  image:any
}[]
}

export default function PropertyForm(){
    const {register,handleSubmit,watch,formState: { errors },control} = useForm<PropertyForm>({defaultValues:{
      images:[{image:'image'}]
    },mode:'onChange'})
    const { fields, append, remove } = useFieldArray({name:'images',control});

   
    

    const propertyOptions=['Hotel','Room','Apartment',]
   

    const onSubmit: SubmitHandler<PropertyForm> =async(data)=>{
        console.log(data)
    }


    return(
        <main className='w-full my-2 flex flex-col items-center'>

        <form onSubmit={handleSubmit(onSubmit)} className='w-[80%]   p-3 grid grid-cols-1 md:grid-cols-2'>
        <div className='w-full'>
        <label className='text-sm font-bold'>Property Name/Id :</label>
        <input
            type="text"
            placeholder="PropertyName"
            className={inputStyle}
            {...register('name', { required: true })}
          />
          {errors.name && ( <ErrorText text='Please Enter Valid PropertyName'/>)}
        </div>

        <div className='w-full'>
        <label className='text-sm font-bold'>City  :</label>
            <input
            type="text"
            placeholder="City"
            className={inputStyle}
            {...register('city', { required: true })}
          />
          {errors.city && ( <ErrorText text='Please Enter Valid city'/>)}
        </div>

        <div className='w-full'>
        <label className='text-sm font-bold'>Area :</label>
            <input
            type="text"
            placeholder="Area"
            className={inputStyle}
            {...register('area', { required: true})}
          />
          {errors.area && ( <ErrorText text='Please Enter Valid Area'/>)}
        </div>

        <div className='w-full'>
        <label className='text-sm font-bold'>Property Description :</label>
            <textarea rows={5}
            placeholder="Desription"
            className={inputStyle}
            {...register('discription',{ required: true})}>

           </textarea>
           
          
          {errors.discription && ( <ErrorText text='Please Enter Valid Property Description'/>)}
        </div>

       

        <div className='w-full'>
        <label className='text-sm font-bold'>Property Type :</label>
            <select className={inputStyle} {...register('property_type', { required: true})}>
                {
                    propertyOptions.map((type)=><option value={type}>{type}</option>)
                }
            </select>
            
          {errors.property_type && ( <ErrorText text='Select Property Type Pls'/>)}
          </div>


        <div className='w-full'>
        <label className='text-sm font-bold'>Rules/Criteria :</label>
            <textarea rows={5}
            placeholder="Rules"
            className={inputStyle}
            {...register('rule', { required: true})}>

            </textarea>
           
          
          {errors.rule && ( <ErrorText text='Please Enter Rules/Criteria'/>)}
        </div>
       
        <div className='w-full'>
        <label className='text-sm font-bold'>Price :</label>
            <input
            type="number"
            placeholder="Price"
            className={inputStyle}
            {...register('price', { required: true, minLength:1 })}
          />
          {errors.price && ( <ErrorText text='Please Enter Valid Price'/>)}
        </div>
        
        <div>
                {
                  fields.map((field,index)=>{
                    return(
                      <div className='w-full ' key={field.id} >
                        
                        <label className='block text-sm font-bold'>Upload Image :</label>
                        <div className='flex items-center'>
                        <input className={inputStyle} type="file" {...register(`images.${index}.image` as const)}></input>
                       {/* donot render this button for 1st index */}
                     {
                     index!=0&&<button type='button' onClick={()=>remove(index)} className='p-2 text-sm h-10 text-white border-2 bg-red-400 rounded-lg hover:bg-red-700'>Delete</button>
                     }  
                        </div>
                      {errors?.images?.[index]?.image && ( <ErrorText text='Please Upload Atleast One image'/>)}
                       
                    </div>
                    )
                  })
                }
            
            <button type='button' onClick={()=>append({image:"newImage"})} className='p-2 text-sm text-white  bg-themeColor rounded-lg hover:bg-mainColor'>AddImage</button>
        </div>
        
    </form>
    <div className='w-[80%] flex justify-center'>
    <button type='submit' className="text-md my-1 w-[50%] cursor-pointer rounded-md bg-themeColor p-2 text-white hover:bg-mainColor" onClick={handleSubmit(onSubmit)}>PostProperty</button>
    </div>
   
    </main>
    )
}


