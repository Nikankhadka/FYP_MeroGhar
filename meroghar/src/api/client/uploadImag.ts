

interface imageUpload{
    imgId:string
    imgUrl:string
}
export async function uploadImage(image:any):Promise<imageUpload>{
    try{
        
    //there might be multiple image upload so
    const imageData = new FormData()
    //first upload image
    imageData.append('file',image)
    imageData.append('cloud_name', 'drpojzybw')
    imageData.append('upload_preset', 'FypMeroGhar')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/drpojzybw/image/upload',
      {
        method: 'POST',
        body: imageData,
      }
    )
    const response = await res.json()
    return{
        imgId:response.public_id,
        imgUrl:response.url
    }

    }catch(e){
        console.log(e)
        throw e;
    }
}