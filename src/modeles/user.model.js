 import mongoose, {Schema} from "mongoose";
// bcrypt is a library that help us to hash the password  so that we can encrypt and decrypt without any hustles
import bcrypt from "bcrypt"

// jwt is a bearer token : that means who bears it he is correct its like a key the one with the jwt have the access
// some people are concerned abt its security but it is very secured 
import jwt from  "jsonwebtoken";


// payload : simply means data
 const userSchema = new Schema(
{

userName :{ 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim :true,
    index: true // searching field enable krni ho toh => optimize ho jata hai isse
   },

   email:{
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
   },

   fullName:{
    type: String, 
    required: true,
    trim: true,
    index: true
   },

   avatar:{
    type:String, 
    required:true
   },

   coverImage:{
    type: String,

   },

   watchHistory:{
    type: Schema.Types.ObjectId,
    ref: "Video"
   },

   passowrd:{
    type: String,
    required: [true,'Passoword is required'] // jitne bhi true field hai sab pe kr skte

   },

   refreshTokens:{
    type:String
   },




}, {timestamp:true});

// we dont use arrow function in this because arrow function dont have the context and we need the context
// encryption is a complex process so we write them as async
// it is a middleware so we next in this 
userSchema.pre("save",async function (next) {
    // we need to write the condition here so that we dont encrypt the password only when the password is created ,modified or updated
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10 ) // 10 is number of hash round you can change it yourself
    next();
})

userSchema.methods.isPassowrdCorrect = async function (password){
 return  await bcrypt.compare(passwors,this.password) // this.password is the encrypted password
}

userSchema.methods.generateAccessToken = function(){
  return  jwt.sign({
        _id: this_id,
        email:this.email,
        userName: this.userName,
        fullName : this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

)
}
userSchema.methods.generateRefreshToken = function (){
      return  jwt.sign({
        _id: this_id,
    

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)

}


 export const User = mongoose.model("User",userSchema);



