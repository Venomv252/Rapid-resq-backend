import  User from '../models/User.js';

const signup = async (req, res) => {
    try {
        const {name, email, password, phoneNumber} = req.body;
        const exist = await User.findOne({email});
        if (exist) return res.status(400).json({message:"User already exists"});

        const newUser = new User({
            email,
            name,
            password,
            phoneNumber,
        });

        await newUser.save();
        res.status(200).json({message:"User saved successfully"});
        console.log("User saved successfully");
    } catch (e) {
        res.status(500).json({message:"Some error in saving the user", error:e.message});
        console.log("Some error in saving the user");
    }
};      

const Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const exist = await User.findOne({email});
        if (!exist) {
            return res.status(400).json({message:"User does not exist"});
        }
        
        // Add password verification logic here
        // const passwordMatch = await bcrypt.compare(password, exist.password);
        // if (!passwordMatch) {
        //     return res.status(400).json({message:"Incorrect password"});
        // }
        
        res.status(200).json({message:"Login successful", user: exist});
        console.log("Login successful");
        
    } catch (error) {
        res.status(500).json({message:"Login error", error: error.message});
        console.log("Login error");
    }
}

export { signup, Login };