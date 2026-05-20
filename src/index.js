import dotenv from "dotenv" // loads environment variables from the .env file 
import mongoose from "mongoose";
import connectDB from "./db/index.js";
// require('dotenv).config({path : './env'}) this will also work but it affects the consistency of our code 

dotenv.config({
    path:'./.env'
}) // this loads new variable from the file 
// find meaning of config here 
// whenever the  async methods complets  it  returns the promise  too and we are using .then() and catch because of that


connectDB()

.then(()=>{
// write code here for app.error too
 app.on("error",(error)=>{
        console.log("Error:",error);
        throw error;
     })
    // database is connected now we have to liste to it 
    app.listen(process.env.PORT || 8000,()=>{ // 8000 is default port
        console.log(`server is running at PORT ${process.env.PORT}`);
    }) // this or conditions protects our code from crashing on the server if unable to find the port 

    
})
.catch((erorr)=>{
    console.log("MONGO DB connection failed :", error);

})












/*
import express from "express"
const app = express();
(async()=>{
    try{
     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
     // these are the listners , listeners hote hai app ke paas
     app.on("error",(error)=>{
        console.log("Error:",error);
        throw error;
     })

     app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
     });
    }
    catch(error){
        console.log("ERROR :", error )
        throw error
    }
})()
*/
// DB is always in another continent so always use async await

/*
IIFE ()() 
;(async() =>{})() the semicolon is for the cleaning purposes 


*/
