'use client'

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { ErrorText } from '../random'
import {useState} from 'react'
import { uploadImage } from '../../api/client/user'
import {  toast } from 'react-hot-toast'
import Api from '../../api/client/axios'
interface EditProfile {
  userName?: string
  profileImg?: any|{
    imgId:string,
    imgUrl:string
  }
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


  const [error,seterror]=useState(false);

      // every change detected is recorded here we want to fetch the image information only 
      const image=watch('profileImg')
      
      const imageUrl=()=>{
        try{
          return  URL.createObjectURL(image[0])
  
        }catch(e){
          
          return ''
        }
      }



      const submitHandler:SubmitHandler<EditProfile>=async(formdata)=>{
        try{
            
          // check for empty values 
          if(formdata.userName==""&&formdata.About==""&&formdata.profileImg.length===0){
            return seterror(true);
          }
          seterror(false)
          //then 

          let profileData:EditProfile={
            userName:formdata.userName,
            About:formdata.About,
            profileImg:{
              imgUrl:"",
              imgId:""
            }
          }


          if(formdata.userName==""){
            delete profileData.userName;
          }

          if(formdata.About==""){
            delete profileData.About;
          }

          if(formdata.profileImg.length===0){
            delete profileData.profileImg;
          }else{
            //upload image
          const upload=await uploadImage(formdata.profileImg[0]);
          if(upload){
            profileData.profileImg.imgId=upload.imgId,
            profileData.profileImg.imgUrl=upload.imgUrl
          }
          }


          

          console.log(profileData);
          const updateProfile=await Api.patch('/user/v1/updateProfile',{...profileData},{withCredentials:true});
          if(updateProfile.data.success){
             toast.success("User profile Data SuccessFully Updated");
             return setEditProfile(false);
          }

          return toast.error("Profile Upload Failed")

        }catch(e){
            console.log(e)
           return toast.error("Profile Upload Failed")
        }
      }


  return (
    <main className='w-[95%]  p-4 md:w-[70%]  '>
      <form>
        
        <div
          className="my-4 flex  w-full flex-col  gap-y-4   " >
            <label className=" block text-sm text-black font-semibold">profile Image</label>
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
              
              {...register(`profileImg`,)}
            ></input>

            {/* donot render this button for 1st index */}

          </div>
         


        </div>
        <div className="w-full my-4">
          <label className=" block text-sm text-black font-semibold">UserName</label>
          <input
            type="text"
            placeholder="userName"
            className='text-md my-1 h-10 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor md:w-[70%]'
            {...register('userName')}
          />

        </div>

        <div className='w-full my-4'>
        <label className='block text-sm text-black font-semibold'>About</label>
            <textarea rows={5}
            placeholder="Desription"
            className={inputStyle}
            {...register('About')}>

           </textarea>
           
          
         
        </div>

      { error&& <ErrorText text='Please Enter Valid Profile Update Input '/>}
        <div className='flex my-2 items-center justify-between p-2'>
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
