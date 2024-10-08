const jwt=require('jsonwebtoken')
const {errorhandler} =require('./error')

exports.verifyToken= (req,res,next)=>{
    const token= req.cookies.access_token
    if(!token){
        return next(errorhandler(401,'unauthorized'))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorhandler(401,'unauthorized'))
        }
        req.user=user;
        next()
    });
};