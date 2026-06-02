import { v2 as cloudinary } from 'cloudinary'
/*import cloudinary from "cloudinary" But Cloudinary package exports multiple versions.
Something like:
{
   v1: ...,
   v2: ...
}
Take v2 export
Rename it to cloudinary
*/

import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;
        // upload the file on cloudinary
   const response = await cloudinary.uploader.upload(localFilePath, {
             resource_type:"auto", // find  its file type by on it's own wheather it is  image , video or anything else without this resource_type:image we have to do it manually 
            // there are many other methods too
        })
 // file is uploaded successfully
          console.log("file is uploaded on cloudinary",response.url); // just prints the url where file is uploaded 
          fs.unlinkSync(localFilePath)

          return response


    }   
    catch(error){
       fs.unlinkSync(localFilePath); // this will remove the locally saved temprorily file as the operation got failed in case file is corrupt or mallicious good practice 
       console.log("error in uploading the file",error);
       return null;
    }
}


export {uploadOnCloudinary}

// What is localFilePath? =>./public/temp/avatar.jpg generally


/*or we could also write it like 


const uploadOnCloudinart = async (localFilePath) =>{

    try {
       if(!localFilePath) return null;
          const response = await cloudinary.uploader.upload(localFilePath, {
             resource_type:"auto"
       
        })
 
          console.log("file is uploaded on cloudinary",response.url); 

          return response

    }

    catch(error){

    console.log("there is an error in uploading the file ",error);

    }

    finally{
    fs.unlinkSync(localFilePath) // finally will get exexuted even after try catch returns
    }
    }

*/