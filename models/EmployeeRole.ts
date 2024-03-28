import mongoose from "@/lib/mongodb";

const employeeRole = new mongoose.Schema({
    employeeId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    roleId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
},{timestamps:true})


export default mongoose.models.EmployeeRole || mongoose.model("EmployeeRole",employeeRole)