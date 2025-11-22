import  User from '../models/User.js';

const signup = async (req, res) => {
    try {
        const {name, email,password} = req.body;
        const exist = await User.findOne({email});
        if (exist) return res.status(400).json({message:"User already exist "});

        const newUser = new User({
            email,
            name,
            password,
            phone_number,
        });

        await newUser.save();
        res.status(200).json({message:"User saved successfully"});
        console.log("User saved successfully");
    } catch (e) {
        res.status(500).json({message:"Some error in saving the user", error:e.message});
        console.log("Some error in saving the user");
    }
};      

const Login  = async (req,res) =>{

    try{
        const exist  = await User.findOne({email,Phone_number});
        if(!exist){
            return res.status(400).json({message:"user does not exist" })
            console.log("User does not exist");
        }

    }catch(error){
        res.status(500).json({message:"Login erorr",error:e.message})
        console.log("Login error");
    }
}