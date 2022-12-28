const userModel = require("../models/userModels");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async(req,res)=>{
    try{
       const existingUser = await userModel.findOne({email:req.body.email});
       if(existingUser){
         return res.status(200).send({message:'User already exist', success:false})
       }
       const password = req.body.password;
       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(password,salt)
       req.body.password = hashPassword;

       const newUser = new userModel(req.body);
       await newUser.save();
       res.status(201).send({message:'Register Successfully',success:true})
    }
    catch(error){
        console.log(error);
        res.status(500).send({success:false, message:`Register Controller ${error.message}`})
    }
}

const loginController = async(req,res)=>{
    try{
         const user = await userModel.findOne({email:req.body.email})
         if(!user){
            return res.status(200).send({message:'User not found', success:false})
         }

         const isMatched = await bcrypt.compare(req.body.password,user.password)
         if(!isMatched){
            return res.status(200).send({message:'Email or password not matched', success:false})
         }
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
         res.status(201).send({message:'Login Success',success:true,token})
    }
    catch(error){
        console.log(error);
        res.status(500).send({success:false, message:`Login Failed in CTRL ${error.message}`})
    }
}

const authController = async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.body.userId})
        if(!user){
            return res.status(200).send({
                message:'user not found',
                success:false
            })
        }else{
            res.status(200).send({
                success:true,
                data:{
                    name:user.name,
                    email:user.email
                }
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            message:'auth error',
            success:false,
            error
        })
    }

}

module.exports = {loginController,registerController,authController}