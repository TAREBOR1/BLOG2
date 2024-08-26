const express=require('express')
const usercontroller=require('../controller/user.controller')
const route = express.Router()
const {verifyToken}= require('../utils/verify')
route.put('/update/:UserID',usercontroller.Update)

module.exports=route