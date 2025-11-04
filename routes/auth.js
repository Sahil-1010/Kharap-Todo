const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");

//sign in

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password,10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save().then(() => {
            res.status(201).json({
               user: user,
               message: "user registered successfully",
            });
        });
    } catch (err) {
        res.status(200).json({
            message:"already registered",
        });
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const user=await User.findOne({ email: req.body.email });
        if (!user) {
            
            return res.status(404).json({ message: "User not found" });
        };
        const checkPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!checkPassword) {
             
            return res.status(200).json({ message: "Invalid Password" });
        };
        const { password, ...info } = user._doc;
        res.status(200).json({
            message: "login successful",
            user: info,
        });
    } catch (err) {
        res.status(200).json({
            message: err.message,
        });
    }
});


module.exports = router;