import {asynchHandler} from "../utils/asynchHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asynchHandler(async(req,res)=> {
   //   res.status(200).json({
   //      message:"ok"

   //   })
   //get details from frontend
   //validation email correct or not/not empty
   //check if user already exists:check from user name and email id
   //check for images ,check for avatar
   //upload them to cloudinary
   //create user object -create entry in db
   //remove password and refrewsh token filed drom response
   //check for user creation
   //return res

   const{fullname, email,username,password}= req.body
   console.log("email",email);
   //this is a basic method i can apply it for all email,username ,password
   // if(fullName === ""){
   //    throw new ApiError(400,"fullname is required")
   // }
   if( [fullname,email,username,password].some((field)=>
      field?.trim()==="" )
      
   ){ 
      throw new ApiError(400,"All fields are required")
   }


   const existedUser= User.findOne({
      $or:[ { username }, { email }]
   })
   if(existedUser){
      throw new ApiError(409,"user with eamil or username already exist")
   }
   //  express humko req.body ka complete access de deta he 
   // muter humko req.files  ka multiple files ka multer ke through maybe or maybe not

   const avatarLocalPath =req.files?.avatar[0]?.path;
   const coverimageLocalPath =req.files?.coverimage[0]?.path;
   if(!avatarLocalPath){
      throw new ApiError(400,"Avatar required ")
   }
  const avatar=await uploadOnCloudinary(avatarLocalPath);
  const coverImage=await uploadOnCloudinary(coverimageLocalPath)
  if(!avatar){
   throw new ApiError(400,"Avatar file is required")
  }

//   creating data stroe in mongodb
 const User=await User.create({
   fullname,
   avatar:avatar.url || "",
   coverImage:coverImage.url || "",
   email,
   password,
   username:username.toLwerCase()
  })
//   select using a string  that show what data u dont want
  const createdUser=await User.findById(user._id).select("-password -refreshToken")
   if(!createdUser){
      throw new ApiError(500,"something went wrong while registering the user")
   }

   return res.status(201).json(
      new ApiResponse(200,createdUser,"user Registered Successfully")
   )
})


export {registerUser} ;
//export like a object {}this means object