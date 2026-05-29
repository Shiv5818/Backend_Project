import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from  "../utils/ApiError.js";
import {User} from  "../modeles/user.model.js" // find out why we are inporting like this why cant default 
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/APiResponse.js";

const generateAccessAndRefreshTokens = async(userId) => {
  try {
   await User.findById(userId)
   const accessToken = user.generateAccessToken()
   const refreshToken =  user.generateRefreshToken() // these are methods 
   user.refreshToken = refreshToken; // saving in the db , object ki key mein add kiya bas
  await  user.save({validateBeforeSave: false});

  return {acessToken, refreshToken}
  }
  catch(error){
    throw new ApiError(500,"Something went wrong while generating Refresh and Access Token");
  }
}

const registerUser = asyncHandler(async (req,res)=>{

// get user details from the frontend 
// validate them if they exist or not or non empty
// if user alreday exists mail or userName
// chech for images and the avatar 
// upload them on cloudinary avatar
// check if its uploaded 
// create a user object and upload it on db (mongodb is nosql so we have to create an object in it)
// remove pass and refresh token field from responses 
// check for user creation 
// return res 


const {userName, fullName,email , password} = req.body()
console.log("userName",userName);
// STEP-2 checking if they exist and non empty
/*
we can check it by checking every field using if-else but it is very begginer level instead of that we use some
method by creating an array of all the fields and parsing them one by one 
if(fullName==""){
  throw new ApiError(400,"fullName is required")
}
  this was the if method
*/
// some method to check 
if( [userName,fullName , email,password].some((field)=> field?.trim() ==="")){ // find out how the could would be if we used expicit return arr.some(()=>{}) cureently we have wrote arr.some(()=>)
    throw new ApiError(400,"fullName is required");
  
}


// STEP-3 find out that user exist with a given mail or userName
// you can use User.find() too
const existedUser = await User.findOne({
  $or: [{userName}, {email}]
})
if(existedUser){
  throw new ApiError(409,"user with email or user already exist")
}

// STEP-4 chech for images and the avatar 

//req.body() we get all the data from this 
const avatarLocalPath = req.files?.avatar[0]?.path // we get access through it by the multer 
// do check out request.files console.log(req.files);
//const coverImageLocalPath = req.files?.coverImage[0]?.path;



let coverImageLocalPath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
  coverImageLocalPath = req.files.coverImage[0].path;
}
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
  fullName,
  avatar: avatar.url,
  coverImage:coverImage?.url || "",// this checks the coverImage exist or not if not return an empty string
  email,
  password,
  userName: userName.toLowerCase()
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


const loginUser = asyncHandler(async (req,res)=>{
// req body ->data
// username || email 
// find the user
// check password 
// access and refresh token generation
// send them in cookies 
// you may send the response for successful generation 

//STEP-1 
const {email, username, password} = req.body

if(!username || !email ) {
  throw new ApiError(400,"username or email is required");
}
  
const uset = await User.findOne({
  $or: [{username},{email}] // passing object in the array and or operation is of mongodb
})
if(!user){
  throw new ApiError(404,"user does not exist");
}

// User is mongoose object and user is our object so if you want to access the bcrypt methods and all use small user not User 
const  isPasswordValid = await user.isPasswordCorrect(password)

if(!isPasswordValid){
  throw new ApiError(404,"user Password is invalid ")
}

 const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);

 const logedInUser = await  User.findById(user._id).select("-password -refreshToken"); // find the use of this line

 const options = {
  httpOnly:true,
  secure:true
 }
   return res
   .status(200).cookie("accessToken", accessToken, options)
   .cookie("refreshToken",refreshToken,options)
   .json(
    new ApiResponse(
      200,{
        user:loggedInUser,accesToken,
        refreshToken
      },
      "User logged in Successfully"
    )
   )


})


// now we will write code to logout the user 

const logOutUser = asyncHandler(async(req,res)=>{
  // we have to delete all the cookies and the tokens
  // middleware process it before executing 
  // we will create our own middleware now 
  await User.findByIdAndUpdate(
      req.user._id,{
        $set:{
          refreshToken:undefined
        }
      },
      {
        new : true
      }
    )
    const options = {
      httpOnly:true,
      secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out "))
})

export {
  registerUser,
  loginUser,
  logOutUser
};

//NOTE sometimes there would be a situation where you will be usinf the req , next but not the res like in
// asyncHandler(async (req,res,next)=>{}) so you can simply write res to _ it is a practice you can do it 
// asyncHandler(async (req,_,next)=>{}) 