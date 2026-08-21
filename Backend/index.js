const dns = require('dns');
dns.setServers(["1.1.1.1","8.8.8.8"]);

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Register = require("./Auth/Registration");
const Login = require("./Auth/Login");
const CookieParser = require('cookie-parser');
const createRoom = require("./RoomLogic/createRoom");
const joinRoom = require("./RoomLogic/JoinRoom");
const leaveRoom = require("./RoomLogic/leaveRoom");

app.use(express.json());

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    }catch(error){
        console.log("Database Connection failed", error.message);
        process.exit(1);
    }
}
connectDB();

app.use((req, res, next) => {
    console.log("REQUEST RECEIVED:", req.method, req.url);
    next();
});

app.use(CookieParser());
//Auth Middleware
app.use('/api',Register);

app.use('/api', Login);

//Create Room middleware
app.use('/api',createRoom);

app.use('/api', joinRoom);

app.use('/api', leaveRoom);


//Error Handler
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({error : err.message || "Internal Server Error"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})