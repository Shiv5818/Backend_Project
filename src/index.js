import dotenv from "dotenv" // loads environment variables from the .env file 
import mongoose from "mongoose";
import {DB_NAME} from "../constants" // importing constants from constants file 

dotenv.config({
    path:'./.env'
}) // this loads new variable from the file 

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,(result) => {
        console.log(`server is running at PORT ${process.env.PORT}`)
})
})

.catch((err) => {
    console.log("MongoDB connection failed ")
});