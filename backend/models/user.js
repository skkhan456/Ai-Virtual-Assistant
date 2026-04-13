import mongoose, { Schema } from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    assistantName:{
        type:String,
        require:true
    },
    assistantImage:{
        type:String,
        require:true
    },
    history: [
    {
        command: String,
    }
    ]
})

export default mongoose.model("User",userSchema);