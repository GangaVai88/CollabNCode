const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtokens');

router.post('/leaveRoom', async (req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({error : "Authorisation required"});
        }
        
    }
    catch(error){
        next(error);
    }
})

module.exports = router;