'use client'


import { useState } from 'react'


import { useForm, SubmitHandler } from 'react-hook-form'

import { ErrorText } from '../random'

const inputStyle =
  'text-md my-1 h-11 w-[90%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor'

import 'react-phone-input-2/lib/style.css'

import { checkPhone, postKyc, postPhone, uploadImage } from '../../api/client/user'
import { KycData } from '../../interface/form'
import useModal from '../../customHoooks/useModal'
import useConfirm from '../../customHoooks/useConfirm'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { PhoneComp } from './phone'
import { useEffect } from 'react'
import useCountry from '../../customHoooks/useCountry'
import { ICountry, IState, ICity } from 'country-state-city'
import { FetchedMe } from '../../interface/response'

interface form {
  firstName: string
  lastName: string
  gender: string
  address: {
    country: string,
    state:string,
    city: string,
  }
  email?: string
  img: any|{
        imgId: string
        imgUrl: string
      }
}

interface kycprops {
  setopenKyc: React.Dispatch<React.SetStateAction<string>>
  userData:FetchedMe
}

export default function Kyc({ setopenKyc,userData }: kycprops) {
  const {email,kyc,kycInfo}=userData
 
  const confirmData=useConfirm();
        // for country state and city
        const [countries, setCountries] = useState<ICountry[]>([]);
        const country=useCountry();
        const confirm=useConfirm();
        const confirmModal=useModal();
        const router=useRouter();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<form>({
    defaultValues:{
      firstName:kycInfo.firstName,
      lastName:kycInfo.lastName,
      gender:kycInfo.gender,
      address:{
        country:kycInfo.address.country,
        state:kycInfo.address.state,
        city:kycInfo.address.city
      },
      email:kycInfo.email,
      //donot put image here since onlyfile can be default 
    }
  })
  const gender = ['Male', 'Female', 'Others']
  const img = watch('img')

  // here if file reads image then image is previewed else default image fetched is shwos
  const imageUrl = () => {
    try {
      return URL.createObjectURL(img[0])
    } catch (e) {
      console.log(e)
      return kycInfo.img.imgUrl||''
    }
  }

useEffect(()=>{
        setCountries(country.Countries)
},[])

  const onSubmit: SubmitHandler<form> = async (formdata) => {


    const submitAction=async()=>{

      //create new object  to be passed into api request
      //data which is not passed will not replce or update existing data in db so careful what u pass
      let kycdata: KycData = {
        kycInfo: {
          firstName:formdata.firstName,
          lastName:formdata.lastName,
          gender:formdata.gender,
          address:{
            country:kycInfo.address.country==formdata.address.country? formdata.address.country:  country.getCountryData(parseInt(formdata.address.country)).name,
            state:kycInfo.address.state==formdata.address.state? formdata.address.state: country.getStateData(parseInt(formdata.address.country),parseInt(formdata.address.state)).name,
            city:formdata.address.city
          },
          img:{
            imgId:'',
            imgUrl:""
          }
          
        },
      }

      
      if(formdata.img.length!=0){
        // for update image can be empty so u have to use old image 
      const uploadedImage= await uploadImage(formdata.img[0]);
      if(uploadedImage){
        kycdata.kycInfo.img!.imgId=uploadedImage.imgId;
        kycdata.kycInfo.img!.imgUrl=uploadedImage.imgUrl

      }
      }else{
        kycdata.kycInfo.img!.imgId=kycInfo.img.imgId;
        kycdata.kycInfo.img!.imgUrl=kycInfo.img.imgUrl;
      }

     

  
      console.log('kycdata',kycdata)
      // post kyc information ssa
      const kyc=await postKyc(kycdata)
      if(!kyc){
        toast.error("Failed to Post/Update Kyc")
        return confirmModal.onClose()
      }
  
      toast.success('kyc posted/Updated successfuly')
      confirmModal.onClose()
      setopenKyc('close')
      return router.refresh();
      
    }


  // call the main confirmation trigger
    try{ 
    confirmData.onContent({
      header:'Are You Sure To Submit Kyc?',
      actionBtn:"Submit",
      onAction:submitAction
    })
    confirmModal.onOpen('confirm')
    }catch(e:any){
      console.log(e);
      return toast.error(e.message)
    }


  }

  


  return (
    <main key={'fuckU'} className="mt-5 w-full rounded-lg   p-4  ">

      <h2 className='text-xl font-semibold mb-5'>Kyc Form</h2>
      <hr className="my-5 border-gray-400" />
      {kycInfo.phoneNumber==''&&<div>
        <PhoneComp />
        <hr className="my-5 border-gray-400" />

        </div>}
      
      <form>

<div className="grid my-3  w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">

          <div className="w-full">
            <label className=" text-sm font-semibold block  text-slate-700">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className={inputStyle}
              {...register('firstName', { required: true })}
            />
            {errors.firstName && (
              <ErrorText text="Please Enter Valid firstName" />
            )}
          </div>

          <div className="w-full">
            <label className="  text-sm font-semibold block  text-slate-700">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className={inputStyle}
              {...register('lastName', { required: true })}
            />
            {errors.lastName && (
              <ErrorText text="Please Enter Valid lastName" />
            )}
          </div>


          <div className="w-full">
            <label className=" text-sm font-semibold block  text-slate-700">Gender</label>

            <select
              className={inputStyle}
              {...register('gender', { required: true })}
            >
                <option value="" >Select Gender</option>
              {gender.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>

            {errors.gender && <ErrorText text="Select Property Type Pls" />}
          </div>

</div>
          

  <div className='w-full my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>Country </label>
        <select className={inputStyle} defaultValue={kycInfo.address.country} {...register('address.country', { required: true})}>
        <option value={kycInfo.address.country}>{kycInfo.address.country==''?'Select a Country':kycInfo.address.country}</option>
                {
                    countries.map((country,index)=><option  value={index}>{country.name}</option>)
                }
        </select>


          {errors?.address?.country && ( <ErrorText text='Please Select Valid Country'/>)}
      </div>

      <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>State </label>
        <select className={inputStyle}  {...register('address.state', { required: true})}>
        <option value={kycInfo.address.state}>{kycInfo.address.state==''?'Select a State':kycInfo.address.state}</option>
                {
                    
                    country.getStates(parseInt(watch('address.country'))).map((state,index)=><option value={index}>{state.name}</option>)
                }
        </select>
          {errors?.address?.state && ( <ErrorText text='Please Select Valid State'/>)}
        </div>

        <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>City</label>
        <select className={inputStyle}  {...register('address.city', { required: true})}>
                <option value={kycInfo.address.city}>{kycInfo.address.city==''?'Select a City':kycInfo.address.city}</option>
                {
                    
                    country.getCities(parseInt(watch('address.country')),parseInt(watch('address.state'))).map((city)=><option value={city.name}>{city.name}</option>)
                }
        </select>
          {errors?.address?.city && ( <ErrorText text='Please Select Valid City'/>)}
        </div>
      
      </div>
        
       

{ email.mail==''&& <div className="w-full my-3 md:w-[70%]">
            <label className=" text-sm font-semibold block  text-slate-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={inputStyle}
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors?.email && (
              <ErrorText text="Please Enter Valid Email/Formatted Email" />
            )}

            <p className='text-sm font-semibold text-themeColor my-2'>New Mail/verify Existing Email</p>
    </div>}
        
        <div className="w-full my-6">
          <div className="my-2 flex  w-full flex-col items-center gap-y-3">
            {/* initially the value default does not read file casuing to return empty string */}
            <img
              src={imageUrl()}
              alt="ImagePreviewHere"
              className={
                imageUrl() == ''
                  ? 'hidden'
                  : 'h-[200px] w-full rounded-lg  sm:h-[270px] md:h-[300px] md:w-[80%] lg:h-[350px]'
              }
            />

            {/* for input and label */}
            <div className="flex w-full flex-col items-start justify-around rounded-lg border-2 border-gray-300 p-2 shadow-md md:w-[60%] md:flex-row md:items-center">
              <label className="text-sm font-semibold block  text-slate-700 ">Upload Image </label>
              <input
                type="file"
                {...register(`img`, { required:kycInfo.img.imgUrl==''?true:false })}
              ></input>

              {/* donot render this button for 1st index */}
            </div>
            <p className="text-sm text-themeColor font-semibold">
              Please provide proof of Identification CitizenShip/Passport/Driving License
            </p>
            {errors?.img && (
              <p className="block w-[95%] text-center text-sm text-red-700">
                Please Upload image for the Field
              </p>
            )}
          </div>
        </div>

        <hr className="my-5 border-gray-400" />

        <div className="my-2 bg-slate-200 p-4 rounded-lg flex items-center justify-between">
          <button
            className="text-md font-semibold underline"
            onClick={(e) => {
              e.preventDefault()

              setopenKyc('close')
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg border border-white bg-themeColor p-2 text-white transition-all hover:bg-mainColor"
            onClick={handleSubmit(onSubmit)}
          >
            Submit Kyc
          </button>
        </div>
      </form>
    </main>
  )
}
