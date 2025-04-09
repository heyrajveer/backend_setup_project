 const asynchHandler =(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
 }
 



export {asynchHandler}

// const asynchHandler = ()=>{}
// const asynchHandler =(func)=>()=>{}
// const asynchHandler =(func)=>async ()=>{}



// another method
// const asynchHandler = (fn)=>async(req,res,next)=>{
//     try{

//     }catch(error){
//     res.status(error.code || 500).json({
//         success:false,
//         message:error.message 
//     })
//     }
// }