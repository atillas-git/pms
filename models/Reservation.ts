import mongoose from "@/lib/mongodb";

const reservationSchema = new mongoose.Schema({
    voucherNo:{
        type:String,
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    discount:{
        type:Number
    },
    payment:{
        type:String
    },
    roomType:{
        type:String
    },
    agency:{
        type:String
    }
},{timestamps:true})


export default mongoose.models.Reservation || mongoose.model("Reservation",reservationSchema)