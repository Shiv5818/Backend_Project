import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    console.log(process.env.MONGODB_URL);
    try{
     const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
     console.log(`MONGODB connected !! DB HOST ${connectionInstance}`);
    }
    catch(error){
        console.log("MONGODB connection error ",error);
        process.exit(1);
    }
}


export default connectDB 
// find meaning of default here 
/*
node.js gives access to the process which you can use anywhere
this refers to a process on which our current application is running
process.exit(1) .exit is a method there are different types of exit read abt it 

// connectDB mein hamare paas jo bhi response aaya hai woh response hold kr rhe hai 
*/
