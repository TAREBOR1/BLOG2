const express= require('express');
const port=3000
const app=express()
const mongoose=require('mongoose')
const dotenv= require('dotenv')


dotenv.config();
mongoose.connect("mongodb+srv://onodaifetareborgift1:amenze@cluster0.elu2zci.mongodb.net/BLOG?retryWrites=true&w=majority&appName=Cluster0")
.then((conn)=>{console.log('database connected successfully')})
.catch((err)=>{
    console.log(err)

})

app.listen(port,()=>{
    console.log("server is running on" + port)
})