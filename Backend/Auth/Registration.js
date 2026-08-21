const express = require('express');
const User = require("../models/user");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/registration', async (req,res,next) => {
    try {
        console.log("Route Entered");
        const { username, email, password } = req.body;
        console.log("Body Parsed", {username,email});

        const exists = await User.findOne({email});
        if(exists){
            return res.status(400).json({error : "Email already registered, Please Login"});
        }
        const saltrounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltrounds);

        const user = new User({
            username: username,
            email: email,
            password: hashedpassword
        });

        await user.save();
        return res.status(200).json({message : "Registration successful"});
    }
    catch(error){
        next(error);
    }
})

module.exports = router;