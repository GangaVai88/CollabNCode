const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req,res,next) => {
    try {
        const { email, password } = req.body;
        if(email.trim() === "" && password.trim() === ""){
            return res.status(400).json({error : "Missing Email/Password"})
        }
        const exists = await User.findOne({ email });
        if (!exists) {
            return res.status(400).json({ error: "Invalid Email or Password" });
        }
        const isMatch = await bcrypt.compare(password, exists.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Email or Password" });
        }

        const token = jwt.sign({ userId: exists._id }, process.env.JWT_SECRET, {expiresIn : 3600});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 3600000
        });
        res.status(200).json({ message: "Logged In successfully" });
    }
    catch(error){
        next(error);
    }
})

module.exports = router;