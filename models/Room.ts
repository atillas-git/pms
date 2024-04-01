import mongoose from "@/lib/mongodb";

const roomSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    number:{
        type:Number
    },
    isOccuppied:{
        type:Boolean
    },
    isClean:{
        type:Boolean
    }
},{timestamps:true})


export default mongoose.models.Room || mongoose.model("Room",roomSchema)