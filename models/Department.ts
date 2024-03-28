import mongoose from "@/lib/mongodb";

const departmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    supervisorId:{
        type:mongoose.Types.ObjectId,
        require:true,
    },
    description:{
        type:String,
    },
    img:{
        type:String
    },
    parentDepartment:{
        type:String
    }
},{timestamps:true})


export default mongoose.models.Department || mongoose.model("Department",departmentSchema)