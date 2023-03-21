'use client'

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { ErrorText } from '../random'

interface EditProfile {
  userName?: string
  image?: any
  About?: string
}

const inputStyle =
  'text-md my-1 h-10 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor'

interface Prop{
    setEditProfile:React.Dispatch<React.SetStateAction<boolean>>
}

export function EditBasic({setEditProfile}:Prop) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<EditProfile>()


      // every change detected is recorded here we want to fetch the image information only 
      const image=watch('image')
      
      const imageUrl=()=>{
        try{
          return  URL.createObjectURL(image[0])
  
        }catch(e){
          console.log(e)
          return ''
        }
      }

      const submitHandler:SubmitHandler<EditProfile>=async(formdata)=>{
        try{
            console.log(formdata)

        }catch(e){
            console.log(e)
        }
      }


  return (
    <main className='w-[95%]  p-4 md:w-[70%]  '>
      <form>
        
        <div
          className="my-4 flex  w-full flex-col  gap-y-4   " >
            <label className=" block text-sm text-black">profile Image</label>
          {/* initially the value default does not read file casuing to return empty string */}
          <img
            src={imageUrl()}
            alt="ImagePreviewHere"
            className={
              imageUrl() == ''
                ? 'hidden'
                : ' rounded-full border-2 border-gray-500 w-[100px] h-[100px] md:w-[200px] md:h-[200px]'
            }
          />

          {/* for input and label */}
          <div className="flex  w-[95%] flex-col items-start justify-around rounded-lg border-2 border-gray-300 p-2 shadow-md md:w-[60%] md:flex-row md:items-center">
           
            <input
              type="file"
              
              {...register(`image`, { required: false,})}
            ></input>

            {/* donot render this button for 1st index */}

          </div>
          {errors?.image && (
            <p className="block w-[95%] text-left text-sm text-red-700">
              Please Upload image for the Field
            </p>
          )}
          


        </div>
        <div className="w-full my-4">
          <label className=" block text-sm text-black">UserName</label>
          <input
            type="text"
            placeholder="PropertyName"
            className='text-md my-1 h-10 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor md:w-[70%]'
            {...register('userName', { required: false ,minLength:5})}
          />
          {errors.userName && (
            <ErrorText text="Please Enter Valid UserName" />
          )}
        </div>

        <div className='w-full my-4'>
        <label className='text-sm block text-black'>About</label>
            <textarea rows={5}
            placeholder="Desription"
            className={inputStyle}
            {...register('About',{ required: false})}>

           </textarea>
           
          
          {errors.About && ( <ErrorText text='Please Enter Valid About'/>)}
        </div>
        
        <div className='flex items-center justify-between p-2'>
        <button onClick={(e)=>{
            e.preventDefault();
            setEditProfile(false)
        }} className='underline font-semibold text-sm'>Cancel</button>
        <button type='submit' onClick={handleSubmit(submitHandler)} className='font-bold text-white py-2 px-4 rounded-lg bg-themeColor hover:bg-mainColor transition-all' >save</button>
        </div>
       
      </form>
    </main>
  )
}
