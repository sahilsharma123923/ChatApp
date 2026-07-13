const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')
const emailService=require('../services/email.service')
const cloudinary=require('../config/cloudinary')

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
    
    await emailService.sendRegistrationEmail(user.email, user.name)

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

// userLogout

async function userLogout(req,res){
   
  res.clearCookie("token")

  return res.status(200).json({
    message :"User logout successfully"
  })
}

// update Profile Pic

async function profilePic(req,res) {
    
    try{
    const{profilePic}=req.body

    if(!profilePic){
        return res.status(400).json({
            message:"Profile pic is required"
        });
    }

    const userId=req.user._id

    const uploadResponse=await cloudinary.uploader.upload(profilePic);

  const updateUser=  await userModel.findByIdAndUpdate(userId,
        {profilePic:uploadResponse.secure_url},
        {new:true}
    );

    return res.status(200).json(updateUser);

  }catch(err){
  console.log("Error in update profile :",err);
  res.status(500).json({
    message:"Internal server error"
  })
 }

}

// getUser
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

module.exports={userRegister,userLogin,userLogout,profilePic,getUser}