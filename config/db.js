const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDb = async()=>{
    try{
await mongoose.connect(process.env.MONGO_URL);
console.log("Connected to Db");
    }catch(err){
        console.log("Error in Connecting Db");

    }
};
module.exports= connectToDb;