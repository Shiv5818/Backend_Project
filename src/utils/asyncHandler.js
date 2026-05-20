//const asyncHandler = () =>{}
const asyncHandler = (requestHandler) =>{
    (req, res , next) =>{
       Promise.resolve(requestHandler(req,res,next))
       .catch((error)=> next(error));
    }
}
export {asyncHandler}
// function has 3 params req , res and next
// const asyncHandler = (function_name) =>{()=>{}}
// we wrote above as asyncHandler = (function_name) => ()=>{}
//const asyncHandler = (fn) => () =>{} 



// this is the method to do with try and catch both are correct you can use any of those 
    /*
const asyncHandler = (func) => async( req,res,next)=>{
    try {
     await func(req,res,next)
    }
    catch(error){
        // this is the response for the error and we are sending the stautus 
     res.status(error.code || 500).json({
        success: false,
        message : error.message
     })
    }
}

*/