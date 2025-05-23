import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate  
 from "mongoose-aggregate-paginate-v2";
 
const videoSchema =new Schema({
    videoFile:{
        type:String, //cloudinary url
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,

    },
    title:{
        type:String,
        required:true,
    },
    Discription:{
        type:String,
        required:true,
    },
    duration:{
        type:Number, //cloudinary
        required:true, 
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
       },
},
{timeStamps:true}
)



videoSchema.plugin(mongooseAggregatePaginate)
// plugin to paginate aggregation results in Mongoose.

// 📌 Why?
// Because .aggregate() doesn't support .limit() and .skip() the same way .find() does with plugins like mongoose-paginate.
export const Video =mongoose.model.Schema("Video",videoSchema)
