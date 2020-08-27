const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_KEY
    }
}))

module.exports = {
    register(req, res) {
        const { name, email, password, profilePic, bio } = req.body
        if (!email || !password || !name) {
            return res.json({ error: "please add all the fields" })
        }
        User.findOne({ email: email }).then(
            savedUser => {
                if (savedUser) {
                    return res.json({error:`User Already exist with same email-  ${email}`})
                }
                bcrypt.hash(password,12)
                .then(hasedPassword=>{
                    const user = new User({
                        name,
                        email,
                        password:hasedPassword,
                        profilePic,
                        bio
                    });
                    user.save()
                    .then(function (user) {
                        res.json(user)
                    })
                })
                
                
                
            })
            .catch(err => {
                console.error(err)
            })
    },

    login(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ error: "please add all the fields" })
        }
        User.findOne({ email: email }).
            then(savedUser => {
                if (!savedUser) {
                    res.json({ error: "Invalid Email or password" })
                }
                bcrypt.compare(password, savedUser.password)
                    .then(matched => {
                        if (matched) {
                            const token = jwt.sign({ _id: savedUser._id }, "jwt", {
                                expiresIn: "12h"
                            })
                            savedUser.accessToken = token;
                            savedUser.save()
                            //console.log(savedUser)

                            res.cookie("token", token, {
                                expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
                                httpOnly: true,
                                sameSite: "none"
                            });
                            res.status(200).send({
                                token,
                                savedUser,
                                message: "Logged In"
                            });
                        }
                        else {
                            res.send("Wrong PassWord")
                        }
                    })
            })

    },

    logout(req, res) {

        User.findOne(req.user._id).then(user => {
            user.acessToken = "";
            user.save()
            res.json({ message: "logged out", user })

        })
    },
    getUser(req, res) {
        User.findOne(req.user._id)
            .then(user => {
                res.json(user)
            }).catch(err => {
                res.json({ error: err })
            })
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            email: req.body.email,
            profilePic: req.body.profilePic,
            bio: req.body.bio
        }, (err, result) => {
            if (err) {
                res.json({ error: err })
            } else {
                res.json({ result })
            }
        })
    },
    resetPassword(req, res) {
        crypto.randomBytes(32,(err,buffer)=>{
            if(err){
                console.log(err)
            }
            const token = buffer.toString("hex")
            User.findOne({email:req.body.email})
            .then(user=>{
               
                if(!user){
                    return res.status(422).json({error:"User dont exists with that email"})
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result)=>{
                    transporter.sendMail({
                        to:user.email,
                        from:"realrohan09@gmail.com",
                        subject:"password reset",
                        html:`
                        <h1>Welcome to InstaBook</h1>
                        <p>You have requested for password reset</p>
                        <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                        `
                    })
                    res.json({message:`Email Sent! on  ${req.body.email}`})
                })
   
            })
        
        })
    },
    newPassword(req, res) {
        const newPassword = req.body.password
        const sentToken = req.body.token
        User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
            .then(user => {
                if (!user) {
                    return res.json({ error: "Try again session expired" })
                }
                bcrypt.hash(newPassword, 12).then(hashedpassword => {
                    user.password = hashedpassword
                    user.resetToken = undefined
                    user.expireToken = undefined
                    user.save().then((saveduser) => {
                        res.json({ message: "Password updated successfully" })
                    })
                })
            }).catch(err => {
                console.log(err)
            })
    },
    async changePassword(req,res){
        const {email, oldPassword, newPassword } = req.body;
        if(!email||!oldPassword||!newPassword){
            return res.status(400).json({error:"please add all fields"});
        }
        try{
            const user =await User.findByEmail(
               email,oldPassword
            );
            if(!user){
                return res.status(401).send("Incorrect credentials");
            }
              newPassword1= await bcrypt.hash(newPassword,10)
            await user.updateOne({password:newPassword1})
            
            return res.send(user);
        }catch (err) {
            
            res.json({error:err});
          }
      },

}


