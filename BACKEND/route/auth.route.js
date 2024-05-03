const express=require('express')
const authconstroller=require('../controller/auth.controller')
const route = express.Router()
route.post('/signup',authconstroller.signup)
route.post('/signin',authconstroller.signin)
route.post('/google',authconstroller.google)

module.exports=route
