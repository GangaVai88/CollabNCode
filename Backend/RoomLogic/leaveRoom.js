const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Room = require("../models/rooms");

router.post('/leaveRoom', async (req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({error : "Authorisation required"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const admin = Room.roomAdmin;
        if(admin == decoded._id){
            return res.status(401).json({error : "Make someone else an admin before leaving"});
        }
        const roomId = req.body.roomId;
        await Room.updateOne(
            {_id : roomId},
            {$pull : {participants : decoded._id}}
        )
    }
    catch(error){
        next(error);
    }
})

module.exports = router;