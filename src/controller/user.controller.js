import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js" // find out why we are inporting like this why cant default 
import uploadOnCloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/APiResponse.js";


const registerUser = asyncHandler(async (req,res)=>{
// get user details from the frontend 
// validate them if they exist or not or non empty
// if user alreday exists mail or username
// chech for images and the avatar 
// upload them on cloudinary avatar
// check if its uploaded 
// create a user object and upload it on db (mongodb is nosql so we have to create an object in it)
// remove pass and refresh token field from responses 
// check for user creation 
// return res 
const {username, fullname,email , password} = req.body()
console.log("username",username);
// STEP-2 checking if they exist and non empty
/*
we can check it by checking every field using if-else but it is very begginer level instead of that we use some
method by creating an array of all the fields and parsing them one by one 
if(fullname==""){
  throw new ApiError(400,"fullname is required")
}
  this was the if method
*/
// some method to check 
if( [username,fullname , email,password].some((field)=> field?.trim() ==="")){ // find out how the could would be if we used expicit return arr.some(()=>{}) cureently we have wrote arr.some(()=>)
    throw new ApiError(400,"fullname is required");
  
}


// STEP-3 find out that user exist with a given mail or username
// you can use User.find() too
const existedUser = User.findOne({
  $or: [{username}, {email}]
})
if(existedUser){
  throw new ApiError(409,"user with email or user already exist")
}

// STEP-4 chech for images and the avatar 

//req.body() we get all the data from this 
const avatarLocalPath = req.files?.avatar[0]?.path // we get access through it by the multer 
const coverImageLocalPath = req.files?.coverImage[0]?.path;

// checking avatar exist or not 
if(!avatarLocalPath){
  throw new ApiError(400,"Avatar file is required ");
}
// do console.log to req.files

//STEP -5 upload them on cloudinary 

// we will just a method to do that
const avater = await uploadOnCloudinary(avatarLocalPath); // because uploading takes time , file uploading takes time 
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

// avatar is reqiuired check avatar exist or uplaoded successfully or not otherwise database will burst
if(!avatar){
  throw new ApiError(400,"Avatar file is required");
}
// not necessary to store variable in the constant
const user = await User.create({
  fullname,
  avatar: avatar.url,
  coverImage:coverImage?.url || "",// this checks the coverImage exist or not if not return an empty string
  email,
  password,
  username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
  // by default every element is selected so we have to minus those we are not selecting 
  // syntax should be as it is 
  "-password -refreshToken"

); // if we found this means user is created successfully easier way to do that instead of checking other stuff 
// when we create an object and store it in a database it is assigned a unique id (kinda primary Key) and above we are finding it using that id

if(!createdUser){
  throw new ApiError(500,"something went wrong while registering a user ")
}

return response.status(201).json(
  new ApiResponse(200,createdUser,"User successfully registered ")
)








 res.status.json({
  message: "hello kaushik"
 })
})


export {registerUser};

