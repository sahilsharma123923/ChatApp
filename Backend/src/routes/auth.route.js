const express=require('express')
const authController=require('../controller/auth.controller')
const authMiddleware=require('../middleware/auth.middleware')

const router=express.Router();


router.post("/register",authMiddleware.authMiddleware,authController.userRegister)
router.post("/login",authController.userLogin)
router.get("/getUser",authMiddleware.authMiddleware,authController.getUser)

module.exports=router