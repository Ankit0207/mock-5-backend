const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/userModel");
const { blacklistModel } = require("../model/blacklistModel");
const userRouter = express.Router();
require("dotenv").config();


userRouter.post("/signup", async (req, res) => {
    const { email, password, confirm_password } = req.body;
    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            res.status(200).json({ msg: "user already exist" });
        } else {
            if (password !== confirm_password) {
                res.status(400).json({ msg: "passowrd and confirm password are not same" });
            } else {
                bcrypt.hash(confirm_password, 10, async (err, hash) => {
                    if (err) {
                        res.status(400).json({ error: err.message });
                    } else {
                        const user = new userModel({ email, password: hash, confirm_password: hash });
                        await user.save();
                        res.status(200).json({ msg: "The new user has been registered", registeredUser: req.body });
                    }
                })
            }
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.confirm_password, async (err, decoded) => {
                if (decoded) {
                    const token = jwt.sign({ userId: user._id, userEmail: user.email }, process.env.secretKey);
                    res.status(200).json({ msg: "login successful", token });
                } else {
                    res.status(400).json({ msg: "wrong credentials" });
                }
            })
        } else {
            res.status(400).json({ msg: "user not exist" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

userRouter.get("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const blacklistToken = await blacklistModel.updateMany({}, { $push: { blacklistToken: [token] } })
        if (blacklistToken) {
            res.status(200).json({ msg: "user has been logged out" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = { userRouter };