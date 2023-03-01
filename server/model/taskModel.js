const mongoose=require("mongoose")

const taskSchema=mongoose.Schema({
    value:String
})
const taskModel=mongoose.model("tasks",taskSchema)
module.exports=taskModel