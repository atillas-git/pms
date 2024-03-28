import mongoose from "@/lib/mongodb";

const departmentRole = new mongoose.Schema({
    departmentId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    roleId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
},{timestamps:true})


export default mongoose.models.DepartmentRole || mongoose.model("DepartmentRole",departmentRole)