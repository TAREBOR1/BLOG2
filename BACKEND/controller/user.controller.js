const { errorhandler } = require("../utils/error")
const bcryptjs=require('bcryptjs');
const USER=require("../models/user.model")

exports.Update=async(req,res,next)=>{
    if(req.user!=req.params.user){
        return next(errorhandler(403,'you are not authorised to update this user'))
    }
   if(req.body.password){
    if(req.body.password.length<6){
        return next(errorhandler(400,'password must be atleast 6 charcater'))
    }
    req.body.password=bcryptjs.hashSync(req.body.password,10)
   }
   if(req.body.username){
    if(req.body.username.length<7 || req.body.username.length>20){
        return next(errorhandler(400,'username must be between 7  and 20 characters'))
    }
    if(req.body.username.includes(' ')){
        return next(errorhandler(400,'username cannot contain spaces'))
    }
    if(req.body.username!=req.body.username.toLowerCase()){
        return next(errorhandler(400,'username must be lowercase'))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return  next(errorhandler(400,'username can only contain letter and number'))
    }
   }

   try {
    const updateUser =  await USER.findByIdAndUpdate(req.params.UserID,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            profilePicture:req.body.profilePicture,
            password:req.body.password
        }
    },{new:true})
    const {password,...rest}=updateUser._doc;
    res.status(200).json(rest)
   } catch (error) {
    next(error)
   }
}