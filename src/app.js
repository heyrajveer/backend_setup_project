import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express();
// Bhai tu backend bana raha hai React frontend ke saath, 
// toh cors use karna must hai warna browser request block kar dega. 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
// Bhai agar tu login/logout system bana raha hai React + Express me, toh credentials: true ka use must hai 🔐
// Chahe JWT + Cookies ho ya Session ID, bina iske kaam nahi chalega.

// Bole toh — "credentials: true" = passport leke jaana mat bhoolna! 🛂


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// extended use for nested /complex object
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js';


//routes declaration
app.use("/api/v1/users",userRouter)

//http:localhost:8000/api/v1/users/register
 export {app}
