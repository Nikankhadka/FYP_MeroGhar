'use client'


import {useForm,useFieldArray,SubmitHandler} from 'react-hook-form'

import { ErrorText } from './random'
import { PropertyForm } from '../interface/form'
import axios from 'axios'
import { Images } from '../interface/request'
import { PostPropery, UpdatePropery } from '../api/client/property'
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import { amenities,propertyOptions} from '../configs/constant'
const inputStyle="text-md my-1 h-11 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor"
import {useState,useEffect} from 'react'
import useCountry from '../customHoooks/useCountry'
import { ICountry, IState, ICity } from 'country-state-city'
import useConfirm from '../customHoooks/useConfirm'
import useModal from '../customHoooks/useModal'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Property } from '../interface/response'
import useRandom from '../customHoooks/randomStore'

//checck image function 

interface postProperty{
  propertyData?:Partial<Property>
  isUpdate:boolean;
}



export default function PostPropertyForm({isUpdate,propertyData}:postProperty){


  const defaultValues:PropertyForm={
    images:['default'],
    name: '',
    location: {
      country: '',
      city: '',
      state: '',
    },
    discription: '',
    rules:'',
    amenities:[],
    price:0,
    property_type:'hotel',
  };

  // If this is an update form, set the default values based on the passed property data
  if (isUpdate && propertyData) {
    defaultValues.name = propertyData.name || '';
    defaultValues.location = propertyData.location || defaultValues.location;
    defaultValues.discription = propertyData.discription || '';
    defaultValues.rules = propertyData.rules![0] || '';
    defaultValues.amenities = propertyData.amenities || [];
    defaultValues.price = propertyData.price || 0;
    defaultValues.property_type = propertyData.property_type || 'hotel';
  }

  
  const list=useRandom()
    const {register,handleSubmit,watch,formState: { errors },control} = useForm<PropertyForm>({
      defaultValues:defaultValues,mode:'onChange'
    })

    
    const { fields, append, remove } = useFieldArray({name:'images',control});

    // for country state and city
    const [countries, setCountries] = useState<ICountry[]>([]);
    const country=useCountry();
    const confirmModal=useConfirm();
    const modal=useModal();
    const router=useRouter();


    useEffect(()=>{
      setCountries(country.Countries)
    },[])



    
    // every change detected is recorded here we want to fetch the image information only 
    const imagesS=watch('images')
   

    

    const imageUrl=(index:number)=>{
      try{
        return  URL.createObjectURL(imagesS[index][0])

      }catch(e){
        console.log(e)
        return ''
      }
    }
   
    

    
    


    const onSubmit: SubmitHandler<PropertyForm> =async(formdata)=>{
      

      const postConfirmation=async()=>{
        
        const amenities=formdata.amenities.filter(item=>item!='')
        
        const {name,location,discription,price,property_type,rules}=formdata
        let images:Images[]=[];
  
  
          //there might be multiple image upload so 
          const imageData= new FormData();
          //since there might be multiple images
          for (const image of formdata.images){
            imageData.append('file',image[0])
            imageData.append('cloud_name','drpojzybw');
            imageData.append('upload_preset','FypMeroGhar');
  
            const res=await fetch('https://api.cloudinary.com/v1_1/drpojzybw/image/upload',{
              method:"POST",
              body:imageData
            })
            const response=await res.json()
  
           await  images.push({
              img_id:response.public_id,
              img_url:response.url
            })
            
          }
          
          let RequestBody:PropertyForm={
            name,
            location:{
              country:country.getCountryData(parseInt(location.country)).name,
              state:country.getStateData(parseInt(location.country),parseInt(location.state)).name,
              city:location.city
            },
            discription,
            price,
            property_type,
            rules,
            amenities,
            images,
          }
          console.log(RequestBody)
          console.log(RequestBody.images)
          
          try{
            const newProperty=await PostPropery(RequestBody)
            if(newProperty){
              toast.success("Property Posted Successfully");
              modal.onClose();
              list.onList('close');
              return router.refresh();
              
            }
          }catch(e:any){
            console.log(e);
            toast.error(`property Post Failed/${e.message}`);
            modal.onClose(); 
          }
         
        }


        //now for update property

        const updateConfirmation=async()=>{
        
          const amenities=formdata.amenities.filter(item=>item!='')
          
          const {name,location,discription,price,property_type,rules}=formdata
          let RequestBody:PropertyForm={
            name,
            location:{
              country:propertyData?.location!.country==formdata.location.country? formdata.location.country:  country.getCountryData(parseInt(formdata.location.country)).name,
              state:propertyData?.location!.state==formdata.location!.state? formdata.location.state: country.getStateData(parseInt(formdata.location.country),parseInt(formdata.location.state)).name,
              city:formdata.location.city
            },
            discription,
            price,
            property_type,
            rules,
            amenities,
            images:[]
          }
    
          if(formdata.images[0]=='default'){
            RequestBody.images=propertyData?.images!;
          }
            else{
             //there might be multiple image upload so 
             const imageData= new FormData();
             //since there might be multiple images
             for (const image of formdata.images){
               imageData.append('file',image[0])
               imageData.append('cloud_name','drpojzybw');
               imageData.append('upload_preset','FypMeroGhar');
     
               const res=await fetch('https://api.cloudinary.com/v1_1/drpojzybw/image/upload',{
                 method:"POST",
                 body:imageData
               })
               const response=await res.json()
     
              await  RequestBody.images.push({
                 img_id:response.public_id,
                 img_url:response.url
               })
               
             } 
          }
           

            console.log(RequestBody)
            console.log(RequestBody.images)
            
            try{
              const uProperty=await UpdatePropery(propertyData?._id!,RequestBody)
              if(uProperty){
                toast.success("Property updated Successfully/Needs Reverification");
                modal.onClose();
                list.onList('close');
                return router.refresh();
                
              }
            }catch(e:any){
              console.log(e);
              toast.error(`property update Failed/${e.message}`);
              modal.onClose(); 
            }
           
          }





      //confirmation logic 
      confirmModal.onContent({
        header:isUpdate?"Are You Sure You Want To Update?":"Are You sure You Want to Post",
        actionBtn:isUpdate?"Update Property":"Post Property",
        onAction:isUpdate?updateConfirmation:postConfirmation
      })

      //render modal
      modal.onOpen('confirm');




       

    }


    return(
        <main className='w-full p-3 my-2 flex flex-col items-center justify-center bg-slate-100'>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full mx-auto  lg:w-full p-3 flex flex-col items-center'>
        
      { isUpdate&& <p className='text-lg font-semibold text-themeColor'>Adding New Images will replace previous images </p>}
        <div className='w-full p-2'>

                        
                { 
                  fields.map((field,index)=>{
                    return(
                      <div className='w-full my-1  flex flex-col items-center gap-2 ' key={field.id} >

                             
                      {/* initially the value default does not read file casuing to return empty string */}
                         <img src={imageUrl(index)} alt="ImagePreviewHere" className={imageUrl(index)==''? 'hidden' : 'w-full h-[200px] sm:h-[270px]  md:h-[320px] md:w-[80%] lg:h-[400px] rounded-lg'} />
                        
                        


                        {/* for input and label */}
                        <div className='w-full  bg-white p-2 flex-col items-start md:w-[60%] flex md:flex-row justify-around md:items-center shadow-md border-2 border-gray-300 rounded-lg'>
                        <label className='block my-1 text-sm font-semibold'>Upload Image </label>
                        <input  type="file" key={field.id} {...register(`images.${index}` as const,{required:isUpdate?false:true})} ></input>

    

                       {/* donot render this button for 1st index */}
                     
                     {
                      index!=0&& <button type='button' onClick={()=>remove(index)} className='border-2 border-gray-400 rounded-lg hover:bg-red-300' >
                      <AiOutlineMinus className='h-6 w-6 stroke-themeColor fill-red-500' />
                     </button>
                     }
                    
                       
                        </div>
                        {errors?.images?.[index] && ( <p className="block w-[95%] text-center text-sm text-red-700">Please Upload image for the Field</p>)}
                       
                    </div>
                    )
                  })
                }
            
            <button type='button' onClick={()=>append({image:"newImage"})} className='border-2 my-2 border-gray-400 rounded-lg hover:bg-hoverColor  '>
                         <AiOutlinePlus className='h-6 w-6 stroke-themeColor fill-themeColor' />
            </button>

           
        </div>



        
        <div className='w-full p-4 border-2 bg-white border-gray-200 shadow-lg rounded-lg'>

        <div className='w-full my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

        <div className='w-full'>
        <label className=' block my-1 text-sm font-semibold'>Property Name</label>
        <input
            type="text"
            placeholder="PropertyName"
            className={inputStyle}
            {...register('name', { required: true })}
          />
          {errors.name && ( <ErrorText text='Please Enter Valid PropertyName'/>)}
        </div>

        <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>Property Type</label>
            <select className={inputStyle} {...register('property_type', { required: true})}>
                {
                    propertyOptions.map((type)=><option value={type}>{type}</option>)
                }
            </select>
            
          {errors.property_type && ( <ErrorText text='Select Property Type Pls'/>)}
          </div>

        <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>Price</label>
            <input
            type="number"
            placeholder="Price"
            className={inputStyle}
            {...register('price', { required: true, minLength:1 })}
          />
          {errors.price && ( <ErrorText text='Please Enter Valid Price'/>)}
        </div>
        
         
         

</div>
  {/* div for city and area  */}
      
    <div className='w-full my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>Country </label>
        <select className={inputStyle}  {...register('location.country', { required: true})}>
        <option value={defaultValues.location.country}>{defaultValues.location.country==''?'Select a Country':defaultValues.location.country}</option>
                {
                    countries.map((country,index)=><option  value={index}>{country.name}</option>)
                }
        </select>


          {errors?.location?.country && ( <ErrorText text='Please Select Valid Country'/>)}
      </div>

      <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>State </label>
        <select className={inputStyle}  {...register('location.state', { required: true})}>
        <option value={defaultValues.location.state}>{defaultValues.location.state==''?'Select a state':defaultValues.location.state}</option>
                {
                    
                    country.getStates(parseInt(watch('location.country'))).map((state,index)=><option value={index}>{state.name}</option>)
                }
        </select>
          {errors?.location?.state && ( <ErrorText text='Please Select Valid State'/>)}
        </div>

        <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>City</label>
        <select className={inputStyle}  {...register('location.city', { required: true})}>
        <option value={defaultValues.location.city}>{defaultValues.location.city==''?'Select a City':defaultValues.location.city}</option>
                {
                    
                    country.getCities(parseInt(watch('location.country')),parseInt(watch('location.state'))).map((city)=><option value={city.name}>{city.name}</option>)
                }
        </select>
          {errors?.location?.city && ( <ErrorText text='Please Select Valid City'/>)}
        </div>
      
      </div>
        </div>
       

      <div className='w-full my-4 bg-white border-2 border-gray-200 p-4 shadow-lg rounded-lg'>
        <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>Property Description</label>
            <textarea rows={5}
            placeholder="Desription"
            className={inputStyle}
            {...register('discription',{ required: true})}>

           </textarea>
           
          
          {errors.discription && ( <ErrorText text='Please Enter Valid Property Description'/>)}
        </div>

       

        <div className='w-full my-2'>
        <label className='block my-1 text-sm font-semibold'>Rules</label>
            <textarea rows={5}
            placeholder="Rules"
            className={inputStyle}
            {...register('rules', { required: true})}>

            </textarea>
           
          
          {errors.rules && ( <ErrorText text='Please Enter Rules/Criteria'/>)}
        </div>

  </div>
  
       
        
                  {/* checkBox */}
          <div className='w-full '>
          <div className=' mx-auto p-4 bg-white  border-2 border-gray-200 shadow-lg rounded-lg  hover:bg-hoverColor '>
          <span className='block my-1 text-sm font-semibold'>Amenities</span>
          <div className=' my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {
              amenities.map((items,index)=>{
                return(
                  <div key={index}>
                    <input type="checkbox" value={items} {...register(`amenities.${index}` as const)} className='cursor-pointer'/>
                    <label className='mx-2 text-sm text-gray-600'>{items}</label>
                  </div>
                )
              })
            }
          </div>
            
          </div>
          
        </div>

      
        
    </form>



        <hr className="my-5 border-gray-400" />
    
    <div className='w-full  bg-slate-300 p-4 rounded-lg '>
    <div className=' mx-auto w-[97%]  flex items-center justify-between'>
    <button type='button' className='underline text-md font-semibold' 
    onClick={(e)=>{
      e.preventDefault();
      list.onList('close')
    }}>Cancel</button>
    <button type='submit' className="text-md cursor-pointer font-semibold rounded-md bg-themeColor p-2 px-4 transition-all text-white hover:bg-mainColor" onClick={handleSubmit(onSubmit)}>Submit</button>
    </div>
    </div>
    
   
    </main>
    )
}


