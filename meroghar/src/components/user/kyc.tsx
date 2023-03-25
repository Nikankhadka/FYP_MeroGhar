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
    },
    email:string
    img:any
}

interface phone{
  phoneNumber:string
}


const inputStyle="text-md my-1 h-11 w-[90%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor"


interface kycprops{
  setopenKyc: React.Dispatch<React.SetStateAction<string>>
  setkycinfo:React.Dispatch<React.SetStateAction<string>>
}



export default function Kyc({setopenKyc,setkycinfo}:kycprops){

    const {register,handleSubmit,watch,formState: { errors },control} = useForm<form>()
    

    const gender=['Male','Female','Others']
    const img=watch('img')
   

    const imageUrl=()=>{
      try{
        return  URL.createObjectURL(img[0])

      }catch(e){
        console.log(e)
        return ''
      }
    }

    const onSubmit: SubmitHandler<form> =async(formdata)=>{
      console.log(formdata)
    }
   

    return(
        <main className="w-full mt-5 p-4   md:border-2  md:border-gray-200 md:shadow-lg  rounded-lg">

       <Phone />

        <hr className="my-5 border-gray-400" />  
            
        <form >        
        <div className='w-full  gap-3 grid grid-cols-1 md:grid-cols-2'>
        <div className='w-full'>
        <label className=' block text-md  text-slate-700'>First Name</label>
        <input
            type="text"
            placeholder="First Name"
            className={inputStyle}
            {...register('firstName', { required: true })}
          />
          {errors.firstName && ( <ErrorText text='Please Enter Valid firstName'/>)}
        </div>

        <div className='w-full'>
        <label className='  block text-md  text-slate-700'>Last Name</label>
        <input
            type="text"
            placeholder="Last Name"
            className={inputStyle}
            {...register('lastName', { required: true })}
          />
          {errors.lastName && ( <ErrorText text='Please Enter Valid lastName'/>)}
        </div>

        <div className='w-full'>
        <label className=' block text-md  text-slate-700'>Gender</label>
            <select className={inputStyle} {...register('gender', { required: true})}>
                {
                    gender.map((type)=><option value={type}>{type}</option>)
                }
            </select>
            
          {errors.gender && ( <ErrorText text='Select Property Type Pls'/>)}
          </div>

        <div className='w-full'>
        <label className=' block text-md  text-slate-700'>Country</label>
            <input
            type="text"
            placeholder="Country"
            className={inputStyle}
            {...register('address.country', { required: true })}
          />
          {errors?.address?.country && ( <ErrorText text='Please Enter Valid Country'/>)}
        </div>

        <div className='w-full'>
        <label className=' block text-md  text-slate-700'>City</label>
            <input
            type="text"
            placeholder="City"
            className={inputStyle}
            {...register('address.city', { required: true})}
          />
          {errors?.address?.city && ( <ErrorText text='Please Enter Valid City'/>)}
        </div>
      
        <div className='w-full'>
        <label className=' block text-md  text-slate-700'>Email</label>
            <input
            type="email"
            placeholder="Email"
            className={inputStyle}
            {...register('email', { required: true})}
          />
          {errors?.email && ( <ErrorText text='Please Enter Valid Email'/>)}
        </div>
        </div>
        <div className='w-full p-2'>

                        
             
          <div className='w-full my-2  flex flex-col items-center gap-2 '  >

                             
                      {/* initially the value default does not read file casuing to return empty string */}
                         <img src={imageUrl()} alt="ImagePreviewHere" className={imageUrl()==''? 'hidden' : 'w-full h-[200px] sm:h-[270px]  md:h-[300px] md:w-[80%] lg:h-[350px] rounded-lg'} />
                        
                        


                        {/* for input and label */}
                        <div className='w-full p-2 flex-col items-start md:w-[60%] flex md:flex-row justify-around md:items-center shadow-md border-2 border-gray-300 rounded-lg'>
                        <label className='text-sm '>Upload Image :</label>
                        <input  type="file"  {...register(`img`,{required:true})} ></input>

    

                       {/* donot render this button for 1st index */}
                     
                    
              
                       
                        </div>
                        {errors?.img && ( <p className="block w-[95%] text-center text-sm text-red-700">Please Upload image for the Field</p>)}
                       
                    </div>

            


           
        </div>

        <hr className="my-5 border-gray-400" /> 

        <div className='my-2 p-2 flex justify-between items-center'>
        <button className='text-md underline font-semibold' onClick={(e)=>{
          e.preventDefault();
          
          setopenKyc('close');
          setkycinfo('yes');
        }}>Cancel</button>
          <button className='p-2 text-white border border-white transition-all bg-themeColor rounded-lg hover:bg-mainColor'>Submit Kyc</button>
        </div>
          
        </form>
        </main>
    )
}






function Phone(){
  const {register,handleSubmit,watch,formState: { errors },control} = useForm<phone>()

  return(
    <main>
      {/* for phone number verification */}
     <form className='my-3'>
     <label className=' block text-md font-semibold text-slate-700'>Phone Number</label>
       <div className='flex items-center p-3'>
       <div className='w-full'>
       
         <input
         type="string"
         placeholder="PhoneNumber"
         className="text-md my-1 h-11 w-[90%] sm:w-[60%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor"
         {...register('phoneNumber', { required: true,minLength:9,maxLength:10})}
       />
       {errors?.phoneNumber && ( <ErrorText text='Please Enter Valid PhoneNumber'/>)}
     </div>

     <button className='text-sm text-gray-700 font-semibold underline'>Verify</button>
     </div>
     </form>
    </main>
     
  )
}