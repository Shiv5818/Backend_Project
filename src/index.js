import dotenv from "dotenv" // loads environment variables from the .env file 
import mongoose from "mongoose";
import connectDB from "./db/index.js";
// require('dotenv').config({path : './env'}) this will also work but it affects the consistency of our code 
import express from "express"
import {app} from './app.js'

dotenv.config(
    { path:'./.env'}
) // this loads new variable from the file 
// find meaning of config here 
// whenever the  async methods complets  it  returns the promise  too and we are using .then() and catch because of that
// this function laods .env
// if we do console.log(`{process.env.PORT}`) it will throw an error  to do this write console.log(`${process.env.PORT}`)


connectDB() // calling the function from db folder 
// whenever the  async methods complets  it  returns the promise  too and we are using .then() and catch because of that
.then(()=>{
// write code here for app.error too
 app.on("error",(error)=>{
        console.log("Error:",error);
        throw error;
     })
    // database is connected now we have to liste to it 
    app.listen(process.env.PORT || 8000,()=>{ // 8000 is default port
  // this or conditions protects our code from crashing on the server if unable to find the port 
        console.log(`server is running at PORT ${process.env.PORT}`);
    }) 
 

    
})


.catch((error)=>{
    console.log("MONGO DB connection failed:",error);
})

// above both the error caught by .catch( ) and app.on are different 
/*
case -1 .catch() it is for the promise rejected causes:
 Wrong Mongo URL
Internet down
Mongo server down

case-2 :Server starts successfully.Database connected. Everything good.Then later:
Port issue
Server error
Runtime event
*/




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
