const express= require('express')
const mongoose= require('mongoose')
const port=1000
const cors=require('cors')
const dotenv=require('dotenv')
const signupRoute=require('./routes/auth.route')
const googleRoute= require('./routes/auth.route')
const userRoute=require('./routes/user.route')
const cookieParser=require('cookie-parser')

dotenv.config();

const app=express();


mongoose.connect(process.env.MONGO,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // Increase to 30 seconds
  })
.then((conn)=>{console.log('database connected successfully')})
.catch((err)=>{
    console.log(err)
})
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api',signupRoute)
app.use('/api',googleRoute)
app.use('/api',userRoute)

app.use((error,req,res,next)=>{
     const statuscode = error.statuscode || 500;
     const message= error.message || 'internal server error';
     res.status(statuscode).json({
        success:false,
        statuscode,
        message
     })
})

app.listen(port,()=>{
    console.log('server runingg'+port)
})