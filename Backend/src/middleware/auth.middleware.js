
const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')

async function authMiddleware(req,res,next) {
    const token =req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access , token is missing"
        })
    }

    try{

        const decoded=await jwt.verify(token,process.env.JWT_SECRET)

        const user=await userModel.findById(decoded.userId)

        req.user=user

        return next();

    }catch(err){
     return res.status(401).json({
        message:"Unauthorized access,token is Invalid"
     })
    }
}


async function protectRoute(req,res,next) {
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access - no token found"
        })
    }

    try{

        const decoded=await jwt.verify(token,process.env.JWT_SECRET)

        const user=await userModel.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }

        req.user=user

        return next();

    }catch(err){

     return res.status(401).json({
        message:"Unauthorized access,token is Invalid"
     })
    }
}

module.exports={authMiddleware,protectRoute}