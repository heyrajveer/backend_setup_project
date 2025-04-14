import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs"; // Needed only if uploading from local

const uploadOnCloudinary =async (localfilepath)=>{
    try{
        if(!localfilepath)return null
        cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        console.log("file is uplaoded on cloudinary",response.url);
        return response;
    }
    catch(error){
      fs.unlinkSync(localfilepath) //remove the locally saved temporary file as the upload operation got failed
      return null;
    }
}

export {uploadOnCloudinary}