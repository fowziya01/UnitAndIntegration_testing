const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const register = async(req,res)=>{
    try{
        const {name,email,password }= req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({name,email,password:hashedPassword});
res.status(201).json({ message: 'User registered successfully' });
    }catch(error){
        res.status(500).json({ message: error.message });

    }
};
const login = async()=>{
try{
const {email,password}=req.body;
const user = await User.findOne({email});
if(!user){
    return res.status(400).json({ message: "User not found" });
}
const checkPassword = await bcrypt.compare(password, user.password);
if(!checkPassword){
    return res.status(401).json({ message: "Password invalid" });
}
const token = jwt.sign({userId: user._id},"shhhh",{expiresIn:"1h"});
res.status(400).json({msg:"Login success",token});
}catch(error){
    res.status(500).json({ message: error.message });

}
};

module.exports={register,login};
