'use client'

import { useState } from 'react'
import {useForm,useFieldArray,useWatch,Control} from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { ErrorText } from './random'
import useFilePreview from '../customHoooks/previewImage'

const inputStyle="text-md my-1 h-11 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor"

  interface PropertyForm{
    name:string,
    city:string,
    area:string,
    discription:string,
    property_type:string,
    rule:string,
    price:number,
    images:any[],
    amenities:string[]
}



//checck image function 



export default function PropertyForm(){


    const {register,handleSubmit,watch,formState: { errors },control} = useForm<PropertyForm>({
      defaultValues:{
        images:['default']
      },mode:'onChange'
    })

    const { fields, append, remove } = useFieldArray({name:'images',control});
    
    // every change detected is recorded here we want to fetch the image information only 
    const images=watch('images')
    console.log(images)

    const imageUrl=(index:number)=>{
      try{
        return  URL.createObjectURL(images[index][0])

      }catch(e){
        console.log(e)
        return ''
      }
    }
   
    

    const propertyOptions=['Hotel','Room','Apartment',]
    const amenities = ["Wifi", "Air conditioning", "Heating", "TV", "Mini fridge", "Safe", "Hairdryer", "Iron", "Coffee maker", "Toiletries"];


    const onSubmit: SubmitHandler<PropertyForm> =async(formdata)=>{
        console.log(formdata)

        const amenities=formdata.amenities.filter(item=>item!='')
      const RequestBody:PropertyForm={
        ...formdata,
        amenities,
        images:[]
      }

        //there might be multiple image upload so 
        const imageData= new FormData();
        //since there might be multiple images
        formdata.images.map(async(image,index)=>{
          imageData.append('file',image[0])
          imageData.append('cloud_name','drpojzybw');
          imageData.append('upload_preset','FypMeroGhar');

          const res=await fetch('https://api.cloudinary.com/v1_1/drpojzybw/image/upload',{
            method:"POST",
            body:imageData
          })
          const response=await res.json()

          RequestBody.images.push({
            img_id:response.public_id,
            img_url:response.url
          })
          
        })
        
        console.log(RequestBody)


        //now send post request into my post api
    }


    return(
        <main className='w-full my-2 flex flex-col items-center'>

        <form onSubmit={handleSubmit(onSubmit)} className='w-[95%] border-none shadow-none md:w-[80%]  md:border-2 border-gray-300 rounded-lg md:shadow-lg p-3 flex flex-col items-center'>
        
        <div className='w-full p-2'>

                        
                { 
                  fields.map((field,index)=>{
                    return(
                      <div className='w-full my-1  flex flex-col items-center gap-2 ' key={field.id} >

                             
                      {/* initially the value default does not read file casuing to return empty string */}
                         <img src={imageUrl(index)} alt="ImagePreviewHere" className={imageUrl(index)==''? 'hidden' : 'w-full h-auto md:w-[60%] md:h-80 rounded-lg'} />
                        
                        


                        {/* for input and label */}
                        <div className='w-full p-2 flex-col items-start md:w-[60%] flex md:flex-row justify-around md:items-center shadow-md border-2 border-gray-300 rounded-lg'>
                        <label className='text-sm font-bold'>Upload Image :</label>
                        <input  type="file" key={field.id} {...register(`images.${index}` as const,{required:true})} ></input>

    

                       {/* donot render this button for 1st index */}
                     
                     {
                      index!=0&& <button type='button' onClick={()=>remove(index)} className='border-2 border-gray-400 rounded-lg hover:bg-red-300' >
                      <img src="minus.png" alt="delete" />
                     </button>
                     }
                    
                       
                        </div>
                        {errors?.images?.[index] && ( <p className="block w-[95%] text-center text-sm text-red-700">Please Upload image for the Field</p>)}
                       
                    </div>
                    )
                  })
                }
            
            <button type='button' onClick={()=>append({image:"newImage"})} className='border-2 border-gray-400 rounded-lg hover:bg-hoverColor  '>
                          <img src="add.png" alt="add" />
            </button>

           
        </div>



        {/* grid div */}

        <div className='w-full grid grid-cols-1 md:grid-cols-2'>
        <div className='w-full'>
        <label className=' block text-sm font-bold'>Property Name/Id :</label>
        <input
            type="text"
            placeholder="PropertyName"
            className={inputStyle}
            {...register('name', { required: true })}
          />
          {errors.name && ( <ErrorText text='Please Enter Valid PropertyName'/>)}
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

  {/* div for city and area  */}
      
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
        <label className='text-sm font-bold'>Rules/Criteria :</label>
            <textarea rows={5}
            placeholder="Rules"
            className={inputStyle}
            {...register('rule', { required: true})}>

            </textarea>
           
          
          {errors.rule && ( <ErrorText text='Please Enter Rules/Criteria'/>)}
        </div>


        {/* checkBox */}
        <div className='w-full '>
          <div className='w-[95%] border-2 border-gray-400 rounded-lg p-2 hover:bg-hoverColor'>
          <span className='block text-sm font-bold'>Amenities</span>
            {
              amenities.map((items,index)=>{
                return(
                  <div key={index}>
                    <input type="checkbox" value={items} {...register(`amenities.${index}` as const)} className='cursor-pointer'/>
                    <label className='mx-1 text-sm'>{items}</label>
                  </div>
                )
              })
            }
          </div>
          
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
        
        </div>
        
        
        
    </form>
    <div className='w-[80%] flex justify-center'>
    <button type='submit' className="text-md my-1 w-[50%] cursor-pointer rounded-md bg-themeColor p-2 text-white hover:bg-mainColor" onClick={handleSubmit(onSubmit)}>PostProperty</button>
    </div>
   
    </main>
    )
}


