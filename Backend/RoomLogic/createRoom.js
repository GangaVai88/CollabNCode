const Room = require("../models/rooms");
const express = require('express');
const router = express.Router();
const {nanoid} = require('nanoid');
const jwt = require('jsonwebtoken');

router.post('/createRoom', async(req,res, next) =>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({error : "Unauthorised access"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const room = new Room({
            roomAdmin : decoded.userId,
            code : nanoid(6),
            participants : [decoded.userId]
        })

        await room.save();
        return res.status(200).json({ message : "Room successfully created"});
    }
    catch(error){
        next(error);
    }
})

module.exports = router;