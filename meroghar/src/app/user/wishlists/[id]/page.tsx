'use client'

import Card from '../../../../components/card'

import {BsThreeDots} from 'react-icons/bs'
const inputStyle="text-md my-1 h-11 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor"
import {useForm,SubmitHandler} from 'react-hook-form'
import { ErrorText } from '../../../../components/random'
import {useState} from 'react'
import NavBar from '../../../../components/navbar'
interface wish{
    listName:string
}

//properies from wishes acces those using nextroute params
export default function WishProperties(){

    const[Edit,setEdit]=useState(false)

    const {register,handleSubmit,watch,formState: { errors }} = useForm<wish>()


    const onSubmit: SubmitHandler<wish> =async(formdata)=>{
        console.log(formdata)
    }


    return(
        <main className="my-20 w-full ">
        <NavBar theme="dark" authState={false}  img=''/>
        <div className=" mx-auto w-[95%] sm:w-[80%] ">

       <div className="w-[98%] flex justify-between items-center">
       <h2 className="text-2xl font-bold text-gray-700">WishList Name</h2>
        <button className=" p-2 rounded-lg hover:bg-hoverColor" onClick={(e)=>{
            e.preventDefault();
            setEdit(!Edit)
        }}>
            <BsThreeDots className="h-6 w-6" />
        </button>
       </div>

        {/* form here */}
    { Edit&&  <div className="w-[95%] sm:w-[400px]">
        <button type="button" className="text-sm  font-bold text-red-600 underline">Delete</button>
        <form>
        <div className='mt-2 w-full'>
        
        <input
            type="text"
            placeholder="ListName"
            className={inputStyle}
            {...register('listName', { required: true })}
          />
          {errors.listName && ( <ErrorText text='Please Enter Valid WishName'/>)}
        </div>
        <div className=" mt-3 flex justify-between">
            <button className="text-md font-bold text-gray-700 underline" onClick={(e)=>{
                e.preventDefault()
                setEdit(false)
            }}>Cancel</button>
            <button className="text-md text-white p-2 rounded-lg bg-themeColor hover:bg-mainColor" onClick={handleSubmit(onSubmit)}>Save</button>
        </div>
        </form>
        </div>}

        <hr className="my-5 border-gray-400" />
        <div className="w-full mx-auto my-5 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
            <Card />
            <Card />
            <Card />
            
        </div>
        </div>
          
           
        </main>
    )
}