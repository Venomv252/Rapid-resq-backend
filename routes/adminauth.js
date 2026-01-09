import express from "express";
import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/admin", async (req,res) => {
    console.log("REQ BODY:" , req.body);
    try{
        const{ email, password} = req.body;
        if (!email || !password) {
            console.log("Missing email or password");
            return res.status(400).json({message : "Missing email or password"});
        }

        const admin = await Admin.findOne({email});
        if(!admin){
            console.log("admin does not exist");
            return res.status(404).json({message : "admin does not exist"});
        }

        const passwordMatch = await bcrypt.compare(password,admin.password);
        if(!passwordMatch){
            return res.status(401).json ({message : "Incorrect credentials"});
        }

        return res.status(200).json({
            message:"Login successful",
            admin : {
                id : admin._id,
                name : admin.name,
                email : admin.email,
            }
        })

    }catch(e){
        return res.status(500).json({
            message : "Login error",
            error : e.message,
        });
    }
});

export default router;