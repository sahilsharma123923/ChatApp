const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')

// Register
async function userRegister(req,res) {
    const{email,name,password}=req.body

    const isEmailExit=await userModel.findOne({
        email:email
    })
    if(isEmailExit){
        return res.status(422).json({
            message:"User already exists"
        })
    }

    const user=await userModel.create({
        email,password,name
    })

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    return res.status(201).json({
        message:"User register successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        },
        token
    })

}
// Login
async function userLogin(req,res) {
    const{email,password}=req.body

    const user=await userModel.findOne({email:email})

    if(!user){
        return res.status(401).json({
            message:"Email or password is Invalid"
        })
    }

     const isValidPassword=await user.comparePassword(password)

      if(!isValidPassword){
        return res.status(401).json({
            message:"Email or password is invalid"
        })
       }

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    return res.status(200).json({
        message:"User login successfully",
        user:{
            id:user._id,
            email:user.email,
            name:user.name
        }
    })
}
// getAllUser

async function getUser(req,res) {
    const user=req.user

    if(!user){
        return res.status(401).json({
            message:"User not found"
        })
    }

    return res.status(200).json({
        message:"User found succesfully",
        user:{
            id:user._id,
            email:user.email,
            name:user.name
        }
    })
}

module.exports={userRegister,userLogin,getAllUser}