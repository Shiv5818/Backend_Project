import express from "express" // This imports the Express library into your project
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();

/*This creates an Express application instance
express() is a function
It returns an app object
*/


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit:"16kb"}))
//configuration for data coming from the url 

app.use(express.urlencoded({extended:true,limit:"16kb"}))

// this if for the public assets when we want to store some files or folders and save it on our server 
// these are the public assets "not necessary to name public here it's just a name  "
app.use(express.static("public"))


app.use(cookieParser())



export {app};

/*
Why app is  both function AND object?

Because in JavaScript:

Functions are objects
Express designs app like this intentionally
*/

