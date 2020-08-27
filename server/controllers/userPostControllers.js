const User = require("../models/User")
const Post = require("../models/Post")


module.exports = {

    searchUserWithPost(req, res) {
        User.findOne({
            _id: req.params.id
        })
            .then(user => {
                Post.find({ postedBy: req.params.id })
                    .populate("postedBy", "_id name profilePic ")
                    .sort('-createdAt')
                    .exec((err, post) => {
                        if (err) {
                            return res.json({ error: err })
                        }
                        res.json({ user, post })
                    })
            }).catch(err => {
                return res.send("User Not Available")
            })

    },
    savePost(req, res) {
        Post.findOne({ _id: req.params.id })
        .then(post=>{
            User.findByIdAndUpdate({_id:req.user._id},
                {$push:{savedId:req.params.id}},
                {new:true}).populate("postedBy", "caption picture")
                .sort('-createdAt')
                .then((result)=>{
                    res.json({user:result})
                }).catch(err => {
                    return res.json({ error: err })
                })
        })
    },
    unsavePost(req, res) {
        Post.findOne({ _id: req.params.id })
        .then(post=>{
            User.findByIdAndUpdate({_id:req.user._id},
                {$pull:{savedId:req.params.id}},
                {new:true}).populate("postedBy", "caption picture")
                .sort('-createdAt')
                .then((result)=>{
                    res.json({user:result})
                }).catch(err => {
                    return res.json({ error: err })
                })
        })
    },
    searchUser(req,res){
        let pattern = new RegExp("^"+req.body.searchQuery)
        User.find({name:{$regex:pattern}})
        .then(user=>{
            res.json({user})
        }).catch(err=>{
            console.error(err)
        })
    },
    renderSaved(req,res){
        User.findOne(req.user._id)
        .populate("savedId", "caption picture likes comments")
        .then((result)=>{
            res.json({user:result})
        }).catch(err => {
            return res.json({ error: err })
        })

}
    }
