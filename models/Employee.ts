import mongoose from "@/lib/mongodb";

const employeeSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    departmentIds:{
        type:[mongoose.Types.ObjectId]
    }
},{timestamps:true})


export default mongoose.models.Employee || mongoose.model("Employee",employeeSchema)