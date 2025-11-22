import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post("/signup",async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const exist = await User.findOne({email});
        if(exist){
            return res.status(400).json({message : "User already Exist"});
        }else{
            const newUser = new User({
                name,
                email,
                password,
                Phone_number
            });
           await newUser.save();
           res.status(200).json({message:"User Saved Successfully"})
        }
    }catch(e){
        res.status(500).json({message:"Some error in saving the user",error:e.message});
    }
})


router.post("/login",async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const exist = await User.findOne({email,Phone_number});
        if(!exist){
            return res.status(400).json({message:"User doesn't exist "});
        }else{
            
            
        }
    }catch(e){
        res.status(500).json({message:"Login error",error:e.message});  
    }
})

export default router;