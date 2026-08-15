const Room = require("../models/rooms");
const User = require("../models/user");
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/joinRoom', async(req,res,next) => {
    try{
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: "Unauthorised access" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = decoded._id;
        const exists = await User.findById(user);
        if(!exists){
            return res.status(400).json({ error : "Room not found"});
        }
        const {code} = req.body;
        const room = await Room.findOne({code});
        if(!room){
            return res.status(401).json({error : "Code is invalid"});
        }
        room.participants.push(decoded._id);
        await room.save();
        return res.status(200).json({message : "Room joined successfully"});
    }
    catch(error){
        next(error);
    }
})
module.exports = router;