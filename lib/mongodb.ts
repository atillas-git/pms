import mongoose from "mongoose";


const connection = async ()=>{
    try {
        if(!(mongoose.connections.length > 0 && mongoose.connections[0].readyState === 1)){
            await mongoose.connect(process.env.MONGO_URI || "")
        }
    } catch (error) {
        
    }
}


connection()

export default mongoose