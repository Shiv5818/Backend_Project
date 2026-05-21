import mongoose ,{Shchema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({

    videofile: {
        type: String, // it will come from cloudinary url
        required : true
    
    },

    thumbnails:{
      type:String,
      required: true
    },

    title:{
        type:String,
        required:true
    },

    duration:{
        type:Number,
        requied : true
    },

    views:{
     type:Number,
     default:0
    },

    isPublished:{
        type:Boolean,
        default:true,
    },

    owner:{
        type : Schema.Types.ObjectId,
        ref:"User"
    }


},{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video",videoSchema)