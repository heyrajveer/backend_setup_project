import { ApiError } from "../utils/ApiError.js";
import { asynchHandler } from "../utils/asynchHandler.js" ;
import jwt, { decode } from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const verifyJWT = asynchHandler(async(req,res,next) => {
    try {
        const token =await res.cookies?.accessToken || req.header
        ("Authorization")?.replace("Bearer","")
    
        if(!token) {
            throw new ApiError(401,"Unothorized request")
        }
    
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user =await User.findById(decodeToken?._id).select("-password -refreshToken")
    
        if(!user){
    // Next Video: discuss about frontend
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user=user;
        next()
    } catch (error) {
         throw new ApiError(401,"Invalid method")
    }
})
