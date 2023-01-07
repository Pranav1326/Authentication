const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.getHome = (req, res) => {
    res.status(200).json({message: "Hello World!"});
}

exports.getUsers = async (req, res) => {
    const users = await User.find();
    users && res.status(200).json(users);
    !users && res.status(500).json({message: "Something went wrong!"});
}

exports.addUser = async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(user){
        res.status(409).json({message: "User already exists!"});
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        newUser && res.status(200).json(newUser);
        !newUser && res.status(500).json({message: "Something went wrong!"});
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(404).json({message: "User not found!"});
        const validate = await bcrypt.compare(req.body.password, user.password);
        !validate && res.status(400).json({message: "Wrong Crecentials!"});
        const { password, ...userInfo } = user._doc;
        const token = jwt.sign(userInfo, process.env.TOKEN_KEY, {expiresIn: '1h'});
        res.status(200).json({userInfo, token});
    } catch (error) {
        res.status(500);
    }
}
