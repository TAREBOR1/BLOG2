const express= require('express');
const port=3000
const app=express()
const mongoose=require('mongoose')
const dotenv= require('dotenv')


dotenv.config();
mongoose.connect(process.env.MONGO)
.then((conn)=>{console.log('database connected successfully')})
.catch((err)=>{
    console.log(err)

})

app.listen(port,()=>{
    console.log("server is running on" + port)
})