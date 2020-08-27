const User = require("../models/User");
const Post = require("../models/Post")

module.exports = {
    follow(req, res) {
        User.findByIdAndUpdate(req.body.followId, {
            $push: { followers: req.user._id }
        }, {
            new: true
        },
            (err, result) => {
                if (err) {
                    return res.json({ error: err })
                }
                User.findByIdAndUpdate(req.user._id, {
                    $push: { following: req.body.followId }

                }, { new: true }).select("-password").then(result => {
                    res.json(result)
                }).catch(err => {
                    return res.json({ error: err })
                })

            })
    },
    unFollow(req, res) {
        User.findByIdAndUpdate(req.body.unfollowId, {
            $pull: { followers: req.user._id }
        }, {
            new: true
        }, (err, result) => {
            if (err) {
                return res.json({ error: err })
            }
            User.findByIdAndUpdate(req.user._id, {
                $pull: { following: req.body.unfollowId }

            }, { new: true }).select("-password").then(result => {
                res.json(result)
            }).catch(err => {
                return res.json({ error: err })
            })

        }
        )
    },
    followingPost(req, res) {
        Post.find({ postedBy: { $in: req.user.following }})
            .populate("postedBy", "_id name profilePic ")
            .populate("comments.postedBy", "_id name profilePic")
            .sort('-createdAt')
            .then((posts) => {
                res.json({ posts: posts, user: req.user })
            }).catch(err => {
                console.log(err)
            })
    },

    followersDetails(req,res){
        User.findOne({_id:req.params.id})
        .populate("followers", "_id name profilePic ")
        .then(user=>{
            
            res.json(user.followers)
        }).catch(err => {
            console.log(err)
        })
        
    },
    followingDetails(req,res){
        User.findOne({_id:req.params.id})
        .populate("following", "_id name profilePic ")
        .then(user=>{
            
            res.json(user.following)
        }).catch(err => {
            console.log(err)
        })
        
    }
}