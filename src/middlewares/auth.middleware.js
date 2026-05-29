// this middleware will very user exist or not

import { User } from "../modeles/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import {User}  from "../models/user.model";
// next => my work is done take it to the next stage
export const verifyJwt = asyncHandler(async(req,res, next)=>{
try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");      // possible that there is no access to access token and user is sending a header 
    // above line says get the token from the cookies or the authorization 
    
    if(!token){
        throw new ApiError(401,"Unauthorized request ");
    }
    
    
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
    const user = await User.findById(decodedToken?._id)
    .select("-password -refreshToken")
    
    if(!user){
        throw new ApiError(401,"Invalid Access Token");
    }
    
    req.user = user; // req object mein user mein value daaldi
    next();
    
    
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid Access Token")
}

})