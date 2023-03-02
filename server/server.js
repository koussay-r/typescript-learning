const Pusher = require("pusher");
const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const taskmodel=require("./model/taskModel.js")
//server config
const app=express()
dotenv.config()
const port=process.env.PORT||9000
//midlewares
app.use(express.json())
app.use(cors())
mongoose.set('strictQuery', true)
//db congfig
const mongourl=`mongodb+srv://admin:${process.env.PASSWORD}@cluster0.yde1grw.mongodb.net/todoapp?retryWrites=true&w=majority`
mongoose.connect(mongourl,{
    useNewUrlParser:true
})
//endpoints
app.post("/create",async(req,res)=>{
    try{
        const ress=await taskmodel.create(req.body)
        res.status(201).send(ress)
    }
    catch(err){
        console.log(err)
    }
})

app.get("/",async(req,res)=>{
    try{
        
        const ress=await taskmodel.find()
        res.status(200).send(ress)
    }
    catch(err){
        console.log(err)
    }
})


const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true
});
const db=mongoose.connection;
db.once("open",()=>{
    console.log("db connected")
    const collection=db.collection("tasks")
    const changeStream=collection.watch()
    changeStream.on("change",(change)=>{
        if(change.operationType=="insert"){
            const task=change.fullDocument;
            pusher.trigger("my-channel", "my-event", {
                _id:task._id,
              value: task.value,
              __v:task.__v
            });
            
        }
        else{
            console.log(err)
        }
    })
})


//listening
app.listen(port,()=>{
    console.log(`server starting on port : ${port}`)
})