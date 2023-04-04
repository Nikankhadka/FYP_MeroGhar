'use client'
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";


import { useState } from "react";
import PhoneInput from "react-phone-input-2";

import {ImSpinner4} from 'react-icons/im'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";




import { useForm, SubmitHandler } from 'react-hook-form'

import { ErrorText } from '../random'
import Cmodal from '../modals/confirmModal'
const inputStyle =
  'text-md my-1 h-11 w-[90%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor'


import 'react-phone-input-2/lib/style.css'

import { auth } from '../../configs/firebase'
import OtpInput from 'react-otp-input'
import { checkPhone, postPhone } from "../../api/client/user";

interface form {
  firstName: string
  lastName: string
  gender: string
  address: {
    country: string
    city: string
  }
  email: string
  img: any
}

interface kycprops {
  setopenKyc: React.Dispatch<React.SetStateAction<string>>
}

export default function Kyc({ setopenKyc }: kycprops) {
  const [openConfirm, setopenConfirm] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<form>()
  const gender = ['Male', 'Female', 'Others']
  const img = watch('img')

  const imageUrl = () => {
    try {
      return URL.createObjectURL(img[0])
    } catch (e) {
      console.log(e)
      return ''
    }
  }

  const onSubmit: SubmitHandler<form> = async (formdata) => {
    console.log(formdata)
    setopenConfirm(true)
  }

  return (
    <main className="mt-5 w-full rounded-lg   p-4  md:border-2 md:border-gray-200  md:shadow-lg">
      <Phone />
      {openConfirm && <Cmodal setopenConfirm={setopenConfirm} />}
      <hr className="my-5 border-gray-400" />

      <form>
        <div className="grid  w-full grid-cols-1 gap-3 md:grid-cols-2">
          <div className="w-full">
            <label className=" text-md block  text-slate-700">First Name</label>
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
            <label className="  text-md block  text-slate-700">Last Name</label>
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
            <label className=" text-md block  text-slate-700">Gender</label>
            <select
              className={inputStyle}
              {...register('gender', { required: true })}
            >
              {gender.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>

            {errors.gender && <ErrorText text="Select Property Type Pls" />}
          </div>

          <div className="w-full">
            <label className=" text-md block  text-slate-700">Country</label>
            <input
              type="text"
              placeholder="Country"
              className={inputStyle}
              {...register('address.country', { required: true })}
            />
            {errors?.address?.country && (
              <ErrorText text="Please Enter Valid Country" />
            )}
          </div>

          <div className="w-full">
            <label className=" text-md block  text-slate-700">City</label>
            <input
              type="text"
              placeholder="City"
              className={inputStyle}
              {...register('address.city', { required: true })}
            />
            {errors?.address?.city && (
              <ErrorText text="Please Enter Valid City" />
            )}
          </div>

          <div className="w-full">
            <label className=" text-md block  text-slate-700">Email</label>
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
          </div>
        </div>
        <div className="w-full p-2">
          <div className="my-2 flex  w-full flex-col items-center gap-2">
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
              <label className="text-sm ">Upload Image :</label>
              <input
                type="file"
                {...register(`img`, { required: true })}
              ></input>

              {/* donot render this button for 1st index */}
            </div>
            <p className="text-sm text-themeColor">
              Please provide proof of Identification
            </p>
            {errors?.img && (
              <p className="block w-[95%] text-center text-sm text-red-700">
                Please Upload image for the Field
              </p>
            )}
          </div>
        </div>

        <hr className="my-5 border-gray-400" />

        <div className="my-2 flex items-center justify-between p-2">
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

interface phone {
  phoneNumber: string
}

function Phone() {

  const [otp, setOtp] = useState('')
  const [ph, setPh] = useState("");
  const[error,seterror]=useState('')
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);


  function onCaptchVerify() {
    try{
      console.log("this on captha verifiy is called")
      
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response:any) => {
              
              onSignup();
            },
            "expired-callback": () => {},
          },
          auth
        );
      
    }catch(e){
      seterror('phone')
    }}

  async function onSignup() {
    setLoading(true);

    // check whether this phone number is already used
    const phone=await checkPhone(ph); //phone number passed
    if(!phone) {
      seterror('reuse')
      return console.log('Phone Number Reuse Detected')
    }

    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;
    console.log(formatPh)
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
       
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        seterror("phone")
      });
  }

 async function onOTPVerify() {
    console.log("verify otp")
    console.log(otp)
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res:any) => {
        console.log(res);
        
        //post phone number to database
        const post=await postPhone(ph)
        if(!post){
          setLoading(false);
          seterror('fail');
          return  console.log('phone number post failed')
        }
        setLoading(false);
        setShowOTP(false)
      })
      .catch((err:any) => {
        console.log(err);
        setLoading(false);
        seterror('otp')

      });
  }

  return (
    <main>
      {/* for phone number verification */}
      <div className="my-3">

      { !showOTP&&<div>
        <label className=" text-md block font-semibold text-slate-700">
          Phone Number
        </label>

        <div className=" flex flex-col items-start p-3 sm:flex-row sm:items-center">
            <div className="w-full">
              <PhoneInput country={'us'} value={ph} onChange={setPh} />
              <div className="my-2">

           {error=='phone'&&<ErrorText text="Please Enter Valid PhoneNumber/Formatted PhoneNumber" />}
           {error=='reuse'&&<ErrorText text="Phone Number Already used by user" />}
              </div>
            </div>
            <div id="recaptcha-container"></div>
            <button  onClick={onSignup} className="text-sm font-semibold text-gray-700 underline">
              SendCode
            </button>
          </div>
      </div>
         
        }

{     loading&&   <div className="flex items-center justify-center">
         <ImSpinner4 className="h-5 w-5 fill-themeColor stroke-themeColor animate-spin" />
          
        </div>}


        {showOTP&&<div>
        <h1 className=' my-2 text-lg text-gray-700 font-bold'>Enter Your Otp</h1>
        <OtpInput
          value={otp}
          shouldAutoFocus={true}
          onChange={setOtp}
          numInputs={6}
         
          renderInput={(props) => <input {...props} />}
          containerStyle={'p-2 flex justify-center gap-x-3'}
          inputStyle={'border-b border-gray-700 w-5'}
        />

{     error=='otp'&& 
      <p className="text-center text-sm text-red-500 my-3">Please Enter Valid Otp Code</p>
}

{     error=='fail'&& 
      <p className="text-center text-sm text-red-500 my-3">Phone Post Failed</p>
}

      <hr className="my-5 border-gray-400" />

        <div className="flex justify-between items-center">
          <button  onClick={(e)=>{
            e.preventDefault();
            setShowOTP(false);
          }} className="text-md font-bold text-gray-700 underline">
              Cancel
          </button>
          <button  onClick={onOTPVerify}  className="rounded-lg border border-white bg-themeColor p-2 px-4 text-white transition-all hover:bg-mainColor" >Verify Code</button>
        </div>
        </div>}
      

      </div>
    </main>
  )
}
