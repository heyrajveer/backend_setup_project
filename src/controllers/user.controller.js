import {asynchHandler} from "../utils/asynchHandler.js";


const registerUser=asynchHandler(async(req,res)=> {
     res.status(200).json({
        message:"ok"
     })
})

export {registerUser} ;
//export like a object {}this means object