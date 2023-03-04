'use client'

import { useState } from 'react'
import {FieldError, useForm} from 'react-hook-form'
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
image:string
}

export default function PropertyForm(){
    const {register,handleSubmit,watch,formState: { errors }} = useForm<PropertyForm>()
    const[imageCount,setimageCount]=useState(['image'])
    const[amenities,setamenities]=useState([])

    const propertyOptions=['Hotel','Room','Apartment',]
    const defaultAmenities=['swimmingPool','Balcony','scenes','tv','refrigerator']

    const onSubmit: SubmitHandler<PropertyForm> =async(data)=>{
        console.log(data)
    }

    return(
        <main className='w-full flex flex-col items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[90%]  border-2 p-3 border-red-500 grid grid-cols-1 md:grid-cols-2'>

        <div className='w-full'>
        <label className='text-sm font-bold'>Property Name/Id :</label>
        <input
            type="text"
            placeholder="userId"
            className={inputStyle}
            {...register('name', { required: true, minLength: 4 })}
          />
          {errors.name && ( <ErrorText text='Please Enter Valid UserId'/>)}
        </div>

        <div className='w-full'>
        <label className='text-sm font-bold'>City  :</label>
            <input
            type="text"
            placeholder="userId"
            className={inputStyle}
            {...register('city', { required: true, minLength: 4 })}
          />
          {errors.city && ( <ErrorText text='Please Enter Valid city'/>)}
        </div>

        <div className='w-full'>
        <label className='text-sm font-bold'>Area :</label>
            <input
            type="text"
            placeholder="userId"
            className={inputStyle}
            {...register('area', { required: true, minLength: 4 })}
          />
          {errors.area && ( <ErrorText text='Please Enter Valid Area'/>)}
        </div>

        <div className='w-full'>
        <label className='text-sm font-bold'>Property Description :</label>
            <textarea rows={5}
            placeholder="Desription"
            className={inputStyle}
            {...register('discription', { required: true})}>

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
            {...register('property_type', { required: true})}>

            </textarea>
           
          
          {errors.property_type && ( <ErrorText text='Please Enter Valid UserId'/>)}
        </div>
       
        <div className='w-full'>
        <label className='text-sm font-bold'>Price :</label>
            <input
            type="number"
            placeholder="Property"
            className={inputStyle}
            {...register('property_type', { required: true, minLength: 4 })}
          />
          {errors.property_type && ( <ErrorText text='Please Enter Valid Price'/>)}
        </div>
        
        <div>
        {
            imageCount.map((image)=>{
                return(
                    <div className='w-full'>
                    <label className='text-sm font-bold'>Upload Image :</label>
                    <input className={inputStyle} type="file" {...register('image',{ required: true})}></input>
                    {errors.image && ( <ErrorText text='Please upload image'/>)}
                    </div>
                )
              
            })
        }
        <button className='p-2 my-2 bg-themeColor rounded-lg transition-all hover:bg-mainColor hover:text-white'
            onClick={(e)=>{
                
                const currentImages=imageCount
                currentImages.push('newImage')
                setimageCount(currentImages)
            }}
        >Image+</button>
        </div>
    </form>
    <div className='w-[90%] flex justify-start'>
    <button className="text-md my-1  cursor-pointer rounded-md bg-themeColor p-2 text-white hover:bg-mainColor" onClick={handleSubmit(onSubmit)}>PostProperty</button>
    </div>
   
    </main>
    )
}


