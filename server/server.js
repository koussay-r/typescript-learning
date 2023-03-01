const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")


//server config
const app=express()
dotenv.config()
const mongourl=`mongodb+srv://admin:${process.env.PASSWORD}@cluster0.yde1grw.mongodb.net/sociomedia?retryWrites=true&w=majority`
mongoose.connect(mongourl,{
    useNewUrlParser:true
})
const port=process.env.PORT||9000
//midlewares
app.use(express.json())
mongoose.set('strictQuery', true)
app.use(cors())

//endpoints
app.get("/",(req,res)=>{
    res.send("works!")
})

//listening
app.listen(port,()=>{
    console.log(`server starting on port : ${port}`)
})