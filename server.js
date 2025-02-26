const express = require("express");
const connectToDb = require("./config/db");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { authenticate } = require('./middlewares/authMiddleware');
dotenv.config({ path: '.env.testing' });
const app = express();
app.use(express.json());
// Routes
app.use('/auth', authRoutes);
app.use('/todos', authenticate, todoRoutes);


//start server
app.listen(8081,()=>{
    try{
    console.log("Server running");
    connectToDb();
    }catch(err){
        console.log("Error in connecting Server");

    }
});