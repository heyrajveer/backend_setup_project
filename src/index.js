import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from "./app.js"


//  below  i apply ; for somethme people forget about ; used in above so that  in 
//  in industy or professional apply ; for cleaning purpose
//  ;(async () =>{

//  })()

dotenv.config({
    path:'./.env'
})



connectDB()
.then(()=>{
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB  connection failed!!! :",err);
})




// directly i used  database 

// ( async ()=>{
//     try{
//     await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NANE}`)
//     app.on("error",(error)=>{
//         console.log("ERR",error)
//         throw error

//     })

//     app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);
//     })
//     }catch(error){
// console.log("ERROR:",error)
// throw err
//     }
// })