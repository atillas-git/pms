import mongoose from "@/lib/mongodb";

const roomTypeSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    }
},{timestamps:true})


export default mongoose.models.RoomType || mongoose.model("RoomType",roomTypeSchema)