import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req,res)=>{
  return   res.status(200).json({ // why there is no need to write return statement
        message:"ok"
    })
})


export {registerUser};