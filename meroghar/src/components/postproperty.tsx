'use client'

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

import { ErrorText } from './random'
import { PropertyForm } from '../interface/form'

import { Images } from '../interface/request'
import { PostPropery, UpdatePropery } from '../api/client/property'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { amenities, propertyOptions } from '../configs/constant'
const inputStyle ='text-md my-1 h-11 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor'
import { useState, useEffect } from 'react'
import useCountry from '../customHoooks/useCountry'
import { ICountry} from 'country-state-city'
import useConfirm from '../customHoooks/useConfirm'
import useModal from '../customHoooks/useModal'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Property } from '../interface/response'
import useRandom from '../customHoooks/randomStore'
import { uploadImage } from '../api/client/uploadImag'

//checck image function

interface postProperty {
  propertyData?: Partial<Property>
  isUpdate: boolean
}

export default function PostPropertyForm({
  isUpdate,
  propertyData,
}: postProperty) {
  const defaultValues: PropertyForm = {
    images: ['default'],
    name: '',
    location: {
      country: '',
      city: '',
      state: '',
    },
    discription: '',
    rules: '',
    amenities: [],
    price: 0,
    property_type: 'hotel',
  }

  // If this is an update form, set the default values based on the passed property data
  if (isUpdate && propertyData) {
    defaultValues.images = propertyData.images || defaultValues.images
    defaultValues.name = propertyData.name || ''
    defaultValues.location = propertyData.location || defaultValues.location
    defaultValues.discription = propertyData.discription || ''
    defaultValues.rules = propertyData.rules![0] || ''
    defaultValues.amenities = propertyData.amenities || []
    defaultValues.price = propertyData.price || 0
    defaultValues.property_type = propertyData.property_type || 'hotel'
  }

  const list = useRandom()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<PropertyForm>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({ name: 'images', control })

  // for country state and city
  const [countries, setCountries] = useState<ICountry[]>([])
  const country = useCountry()
  const confirmModal = useConfirm()
  const modal = useModal()
  const router = useRouter()

  useEffect(() => {
    setCountries(country.Countries)
  }, [])

  // every change detected is recorded here we want to fetch the image information only
  const imagesS = watch('images')

  const imageUrl = (index: number) => {
    try {
      return URL.createObjectURL(imagesS[index][0])
    } catch (e) {
      try {
        if (propertyData?.images![index].img_url) {
          return propertyData.images[index].img_url
        }
      } catch (e) {
        return ''
      }
    }
  }

  const onSubmit: SubmitHandler<PropertyForm> = async (formdata) => {

    const postConfirmation = async () => {
      const amenities = formdata.amenities.filter((item) => item != '')

      const { name, location, discription, price, property_type, rules } =
        formdata
      let images: Images[] = []

      //there might be multiple image upload so
      const imageData = new FormData()
      //since there might be multiple images
      for (const image of formdata.images) {
        const uploadedImg = await uploadImage(image[0])

        await images.push({
          img_id: uploadedImg.imgId,
          img_url: uploadedImg.imgUrl,
        })
      }

      let RequestBody: PropertyForm={
        name,
        location: {
          country: country.getCountryData(parseInt(location.country)).name,
          state: country.getStateData(
            parseInt(location.country),
            parseInt(location.state)
          ).name,
          city: location.city,
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

      try {
        const newProperty = await PostPropery(RequestBody)
        if (newProperty) {
          toast.success('Property Posted Successfully')
          modal.onClose()
          list.onList('close')
          return router.refresh()
        }
      } catch (e: any) {
        console.log(e)
        toast.error(`property Post Failed/${e.message}`)
        modal.onClose()
      }
    }

    //now for update property

    const updateConfirmation = async () => {
      const amenities = formdata.amenities.filter((item) => item != '')

      const { name, location, discription, price, property_type, rules } =
        formdata
      let images: Images[] = []
      //since there might be multiple images
      for (const image of formdata.images) {
        try {
          //if its able to crrate url itsfile if its not then obj
          const imgurl = URL.createObjectURL(image[0])
          console.log('uploaded img')
          const { imgId, imgUrl } = await uploadImage(image[0])
          images.push({ img_id: imgId, img_url: imgUrl })
        } catch (e) {
          console.log(e)
          console.log('object')
          images.push(image)
        }
      }

      let RequestBody: PropertyForm = {
        name,
        location: {
          country:
            propertyData?.location!.country == formdata.location.country
              ? formdata.location.country
              : country.getCountryData(parseInt(formdata.location.country))
                  .name,
          state:
            propertyData?.location!.state == formdata.location!.state
              ? formdata.location.state
              : country.getStateData(
                  parseInt(formdata.location.country),
                  parseInt(formdata.location.state)
                ).name,
          city: formdata.location.city,
        },
        discription,
        price,
        property_type,
        rules,
        amenities,
        images,
      }

      console.log('final form', RequestBody)

      try {
        const uProperty = await UpdatePropery(propertyData?._id!, RequestBody)
        if (uProperty) {
          toast.success('Property updated Successfully/Needs Reverification')
          modal.onClose()
          list.onList('close')
          return router.refresh()
        }
      } catch (e: any) {
        console.log(e)
        toast.error(`property update Failed/${e.message}`)
        modal.onClose()
      }
    }

    //confirmation logic
    confirmModal.onContent({
      header: isUpdate
        ? 'Are You Sure You Want To Update?'
        : 'Are You sure You Want to Post',
      actionBtn: isUpdate ? 'Update Property' : 'Post Property',
      onAction: isUpdate ? updateConfirmation : postConfirmation,
    })

    //render modal
    modal.onOpen('confirm')
  }

  return (
    <main className="my-2 flex w-full flex-col items-center justify-center bg-slate-100 p-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex  w-full flex-col items-center p-3 lg:w-full"
      >
        {isUpdate && (
          <p className="text-lg font-semibold text-themeColor">
            Adding New Images will replace previous images{' '}
          </p>
        )}
        <div className="w-full p-2">
          {fields.map((field, index) => {
            return (
              <div
                className="my-1 flex  w-full flex-col items-center gap-2 "
                key={field.id}
              >
                {/* initially the value default does not read file casuing to return empty string */}
                <img
                  src={imageUrl(index)}
                  className={
                    imageUrl(index) == ''
                      ? 'hidden'
                      : 'h-[200px] w-full rounded-lg  sm:h-[270px] md:h-[320px] md:w-[80%] lg:h-[400px]'
                  }
                />

                {/* for input and label */}
                <div className="flex  w-full flex-col items-start justify-around rounded-lg border-2 border-gray-300 bg-white p-2 shadow-md md:w-[60%] md:flex-row md:items-center">
                  <label className="my-1 block text-sm font-semibold">
                    Upload Image{' '}
                  </label>
                  <input
                    type="file"
                    key={field.id}
                    {...register(`images.${index}` as const, {
                      required: isUpdate ? false : true,
                    })}
                  ></input>

                  {/* donot render this button for 1st index */}

                  {index != 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded-lg border-2 border-gray-400 hover:bg-red-300"
                    >
                      <AiOutlineMinus className="h-6 w-6 fill-red-500 stroke-themeColor" />
                    </button>
                  )}
                </div>
                {errors?.images?.[index] && (
                  <p className="block w-[95%] text-center text-sm text-red-700">
                    Please Upload image for the Field
                  </p>
                )}
              </div>
            )
          })}

          <button
            type="button"
            onClick={() => append({ image: 'newImage' })}
            className="my-2 rounded-lg border-2 border-gray-400 hover:bg-hoverColor  "
          >
            <AiOutlinePlus className="h-6 w-6 fill-themeColor stroke-themeColor" />
          </button>
        </div>

        <div className="w-full rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg">
          <div className="my-2 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full">
              <label className=" my-1 block text-sm font-semibold">
                Property Name
              </label>
              <input
                type="text"
                placeholder="PropertyName"
                className={inputStyle}
                {...register('name', { required: true })}
              />
              {errors.name && (
                <ErrorText text="Please Enter Valid PropertyName" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Property Type
              </label>
              <select
                className={inputStyle}
                {...register('property_type', { required: true })}
              >
                {propertyOptions.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </select>

              {errors.property_type && (
                <ErrorText text="Select Property Type Pls" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">Price</label>
              <input
                type="number"
                placeholder="Price"
                className={inputStyle}
                {...register('price', { required: true, minLength: 1 })}
              />
              {errors.price && <ErrorText text="Please Enter Valid Price" />}
            </div>
          </div>
          {/* div for city and area  */}

          <div className="my-2 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Country{' '}
              </label>
              <select
                className={inputStyle}
                {...register('location.country', { required: true })}
              >
                <option value={defaultValues.location.country}>
                  {defaultValues.location.country == ''
                    ? 'Select a Country'
                    : defaultValues.location.country}
                </option>
                {countries.map((country, index) => (
                  <option value={index}>{country.name}</option>
                ))}
              </select>

              {errors?.location?.country && (
                <ErrorText text="Please Select Valid Country" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">State </label>
              <select
                className={inputStyle}
                {...register('location.state', { required: true })}
              >
                <option value={defaultValues.location.state}>
                  {defaultValues.location.state == ''
                    ? 'Select a state'
                    : defaultValues.location.state}
                </option>
                {country
                  .getStates(parseInt(watch('location.country')))
                  .map((state, index) => (
                    <option value={index}>{state.name}</option>
                  ))}
              </select>
              {errors?.location?.state && (
                <ErrorText text="Please Select Valid State" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">City</label>
              <select
                className={inputStyle}
                {...register('location.city', { required: true })}
              >
                <option value={defaultValues.location.city}>
                  {defaultValues.location.city == ''
                    ? 'Select a City'
                    : defaultValues.location.city}
                </option>
                {country
                  .getCities(
                    parseInt(watch('location.country')),
                    parseInt(watch('location.state'))
                  )
                  .map((city) => (
                    <option value={city.name}>{city.name}</option>
                  ))}
              </select>
              {errors?.location?.city && (
                <ErrorText text="Please Select Valid City" />
              )}
            </div>
          </div>
        </div>

        <div className="my-4 w-full rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg">
          <div className="w-full">
            <label className="my-1 block text-sm font-semibold">
              Property Description
            </label>
            <textarea
              rows={5}
              placeholder="Desription"
              className={inputStyle}
              {...register('discription', { required: true })}
            ></textarea>

            {errors.discription && (
              <ErrorText text="Please Enter Valid Property Description" />
            )}
          </div>

          <div className="my-2 w-full">
            <label className="my-1 block text-sm font-semibold">Rules</label>
            <textarea
              rows={5}
              placeholder="Rules"
              className={inputStyle}
              {...register('rules', { required: true })}
            ></textarea>

            {errors.rules && <ErrorText text="Please Enter Rules/Criteria" />}
          </div>
        </div>

        {/* checkBox */}
        <div className="w-full ">
          <div className=" mx-auto rounded-lg border-2  border-gray-200 bg-white p-4 shadow-lg  hover:bg-hoverColor ">
            <span className="my-1 block text-sm font-semibold">Amenities</span>
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
      </form>

      <hr className="my-5 border-gray-400" />

      <div className="w-full  rounded-lg bg-slate-300 p-4 ">
        <div className=" mx-auto flex  w-[97%] items-center justify-between">
          <button
            type="button"
            className="text-md font-semibold underline"
            onClick={(e) => {
              e.preventDefault()
              list.onList('close')
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-md cursor-pointer rounded-md bg-themeColor p-2 px-4 font-semibold text-white transition-all hover:bg-mainColor"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  )
}
