const jwt = require('jsonwebtoken')

const User = require("../models/User")

module.exports = (req,res,next)=>{
    //console.log(process.env.JWT_SECRET_KEY)
    const {authorization} = req.headers
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization
    jwt.verify(token,"jwt",(err,payload)=>{ //need to fix this
        if(err){
            console.log(payload)
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}