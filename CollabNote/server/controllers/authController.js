const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");


exports.register= async(req,res)=>{
    const{email,password}=req.body;
    try{
        const exisitng= await User.findOne({email});
        if(exisitng) return res.status(400).json({msg:"User already exists"})
        
            const hashedpasswword= await bcrypt.hash(password,10)
            const sharedKey = uuidv4();
            const user= User.create({email,password: hashedpasswword,sharedkey})
             res.json({msg:"User successfully registered",sharedKey})
        }
        catch(err){
            res.status(500).json({msg:err.message})
        }
}

exports.login=async (req,res)=>{
    const{email,password}=req.body;
    try{
        const user=User.findOne({email});
        if(!user) return res.status(401).json({msg:"User not found"})
        const ismatch=await bcrypt.compare(user.password,password);
        if(!ismatch) return res.status(401).json({msg:"Wrong password"})
        const token =jwt.sign({id:user._id}, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({token,user:{id:user._id}})  
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
  
}