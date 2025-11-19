const mongoose=require("mongoose");
const taskSchema=new mongoose.Schema({
    title: String,
    description: String,
    deadline: Date,
    isDone: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.types.ObjectId , ref:"User"},
    sharedKey: String
})
module.exports=mongoose.model("Task",taskSchema)