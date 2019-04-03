const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const authRouter = express.Router()


// Signup
authRouter.post("/signup", (req, res, next) => {
    // Check to see if username already exists, if not register new user
    User.findOne({username: req.body.username}, (err, existingUser) => {
        // handles any errors
        if(err){
            res.status(500)
            return next(err)
        } 
        // Checks to see if username exists. Throws an error.
        else if(existingUser !== null){
            res.status(400)
            return next(new Error("That username already exists!"))
        }
        // If the above conditions are not true, make a new user
        const newUser = new User(req.body)
        newUser.save((err, user) => {
            if(err) return res.status(500).send({success: false, err})
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(201).send({user: user.withoutPassword(), token})
        })
    })
})

// Login
authRouter.post("/login", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        // If user doesn't exist throw new Error but say username OR password is incorrect just to make it a bit harder for hackers.
        else if(!user){
            res.status(403)
            return next(new Error("Username or password are incorrect."))
        }
        // Check the password
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(500)
                return next(err)
            } 
            else if(!isMatch){
                res.status(401)
                return next(new Error({success: false, message: "Username or password are incorrect."}))
            }
            // create token 
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            // send response
            return res.send(({success: true, user: user.withoutPassword(), token: token}))
        })
    })
})

module.exports = authRouter