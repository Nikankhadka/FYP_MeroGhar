'use client'

import useRandom from "../../customHoooks/randomStore"
import { useForm, SubmitHandler } from 'react-hook-form'
import useModal from "../../customHoooks/useModal"
import { ErrorText } from "../random"
import { inputStyle } from "../../styles/variants"
import { propertyOptions } from "../../configs/constant"
import useCountry from "../../customHoooks/useCountry"
import { useState } from "react"
import { ICountry } from "country-state-city"
import { amenities } from "../../configs/constant"


interface SearchForm{
  minRate:number,
  maxRate:number,
  propertyType:string,
  country:string,
  state:string,
  city:string,
  startDate:Date,
  endDate:Date,
  rating:number,
  amenities:string[]
}


import Modal from "./modal"

export function SearchModal(){
    const modal=useModal()
  const list = useRandom()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<SearchForm>({
   
    mode: 'onChange',
  })

    // for country state and city
 
    const countryhook = useCountry()
    const [countries, setCountries] = useState<ICountry[]>(countryhook.Countries)
   


    if(modal.isOpen!='search'){
        return null;
    }
    return(
        <div>
        <Modal isOpen={modal.isOpen}>

        {/* enitre login hai */}
        <div className="bg-white  w-full h-[600px] overflow-y-scroll md:w-[600px] rounded-lg">

        <header className=" top-0 sticky bg-white text-center text-md p-3 sm:text-lg font-semibold border-b-2 border-gray-200">
        Filters
        </header>

        {/* for body */}
        <div className="p-5">
        <h1 className=" text-lg sm:text-xl font-semibold ">Price Range</h1>
        <p className="my-2 text-md text-gray-600 ">Please Provide range of Rate per Night for better Result!</p>
       
       {/* price range input */}
        <div className="p-5 flex justify-center gap-x-6 items-center flex-wrap">

        {/* price input */}
        <div className="w-full sm:w-fit">
              <label className="my-1 block text-sm font-semibold">MinRate</label>
              <input
                type="number"
                placeholder="Price"
                className={inputStyle}
                {...register('minRate', { required: true, minLength: 1, min:{value:0,message:"Please enter non negative no."} })}
              />
              {errors.minRate && <ErrorText text="Please Enter Valid Price" />}
            </div>
         

          <div className="w-full sm:w-fit">
              <label className="my-1 block text-sm font-semibold">MaxRate</label>
              <input
                type="number"
                placeholder="Price"
                className={inputStyle}
                {...register('maxRate', { required: true, minLength: 1, min:{value:0,message:"Please enter non negative no."} })}
              />
              {errors.maxRate && <ErrorText text="Please Enter Valid Price" />}
            </div>
          </div>

      <hr className="bg-gray-200 mb-5" />
      {/* property Type */}
      <h1 className=" text-lg sm:text-xl font-semibold ">Property Type</h1>

      <div className="p-5">

      <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Property Type
              </label>
              <select
                className={inputStyle}
                {...register('propertyType', { required: true })}
              >
                {propertyOptions.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </select>

              {errors.propertyType && (
                <ErrorText text="Select Property Type Pls" />
              )}
            </div>

      </div>

      <hr className="bg-gray-200 mb-5" />
      {/* property Type */}
      <h1 className=" text-lg sm:text-xl font-semibold ">Location Information</h1>


      <div className="my-2 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Country{' '}
              </label>
              <select
                className={inputStyle}
                {...register('country', { required: true })}
              >
                <option value={''}>
                 
                    Select a Country
                    
                </option>
                {countries.map((country, index) => (
                  <option value={index}>{country.name}</option>
                ))}
              </select>

              {errors?.country && (
                <ErrorText text="Please Select Valid Country" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">State </label>
              <select
                className={inputStyle}
                {...register('state', { required: true })}
              >
                <option value={''}>
                  
                   Select a state
                  
                </option>
                {countryhook
                  .getStates(parseInt(watch('country')))
                  .map((state, index) => (
                    <option value={index}>{state.name}</option>
                  ))}
              </select>
              {errors?.state && (
                <ErrorText text="Please Select Valid State" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">City</label>
              <select
                className={inputStyle}
                {...register('city', { required: true })}
              >
                <option value={''}>
                 
                     Select a City
                    
                </option>
                {countryhook
                  .getCities(
                    parseInt(watch('country')),
                    parseInt(watch('state'))
                  )
                  .map((city) => (
                    <option value={city.name}>{city.name}</option>
                  ))}
              </select>
              {errors?.city && (
                <ErrorText text="Please Select Valid City" />
              )}
            </div>
          </div>


      <hr className="bg-gray-200 my-5" />
      {/* property Type */}
      <h1 className=" text-lg mb-3 sm:text-xl font-semibold ">Minimum Rating</h1>

                  {/* price input */}
        <div className="w-full sm:w-fit">
             
              <input
                type="number"
                placeholder="Price"
                className={inputStyle}
                {...register('minRate', { required: true, minLength: 1, min:{value:0,message:"Please enter non negative no."} })}
              />
              {errors.minRate && <ErrorText text="Please Enter Valid Price" />}
            </div>

        

      <hr className="bg-gray-200 my-5" />
      {/* property Type */}
    
      <h1 className=" text-lg mb-3 sm:text-xl font-semibold ">Amenities</h1>

          {/* checkBox */}
          <div className="w-full ">
         
           
            <div className=" my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {amenities.map((items, index) => {
                return (
                  <div key={index}>
                    <input
                      type="checkbox"
                      value={items}
                      {...register(`amenities.${index}` as const)}
                      className="cursor-pointer"
                    />
                    <label className="mx-2 text-sm text-gray-600">
                      {items}
                    </label>
                  </div>
                )
              })}
            </div>
          
        </div>         




          </div>

        <div className=" bottom-0 sticky w-full py-2 bg-white border-t-2 flex items-center justify-between">
          <button className="ml-3 text-md font-semibold underline text-black">Cancel</button>
        <button className=" mr-3 px-4 py-2 font-semibold text-white bg-themeColor hover:bg-mainColor rounded-lg"> Search</button>
        </div>


        </div>

        
       

       

        

        </Modal>
        
        </div>
      
    )
}
