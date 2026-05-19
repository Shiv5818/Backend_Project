import dotenv from "dotenv" // loads environment variables from the .env file 
import mongoose from "mongoose";
import connectDB from "./db/index.js";
// require('dotenv).config({path : './env'}) this will also work but it affects the consistency of our code 

dotenv.config({
    path:'./.env'
}) // this loads new variable from the file 
// find meaning of config here 

connectDB();













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
