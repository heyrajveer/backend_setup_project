import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
const userSchema =new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
  },
  fullname:{
    type:String,
    required:true, 
    trim:true,
    index:true,
  },
 avatar:{
    type:String, //clouduinary url 
    required:true,
  },
  coverImage:{
    type:String, //cloudinary url
  },
  watchHistory:{
    type:Schema.Types.ObjectId,
    ref:'video', 
  },
  password:{
   type:String,
   required:[true,'Password is required'],
  },
  refreshToken:{
    type:String,
  }
},{
    timeStamps:true
}
)
//pre isliye liye he kyuki  ye first tume login  and modified time me 
// hi save krefa otherwise not run
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10)
    next()
}).
//  verify the password that we are passing 
userSchema.methods.isPasswordCorrect =async function
(password){
    return await bcrypt.compare(password,this.password)
}  
// token  time  
userSchema.methods.generateAccessToken =function(){
   return jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
// after time expired this will  WORK
userSchema.methods.generateRefreshToken =function(){
    return jwt.sign(
        {
        _id:this.id,
        },
    process.env.REFRESH_TOKEN_SECRET,

    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
    }
    )
}

export const USer = mongoose.model("USer",userSchema)