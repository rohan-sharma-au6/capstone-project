const Post = require("../models/Post");


module.exports = {
    cretePost(req, res) {
        const { picture, caption } = req.body;
        if (!picture || !caption) {
            res.json({ error: "Please fill all details" })
        }
        console.log(req.user)
        const post = new Post({
            picture,
            caption,
            postedBy: req.user
        })
        post.save().then(result => {
                res.json({ post: result, message: "posted" })
            })
            .catch(err => {
                console.log(err)
            })
    },

    allPost(req, res) {
        Post.find()
            .populate("postedBy", "_id name profilePic ")
            .populate("comments.postedBy", "_id name profilePic")
            .sort('-createdAt')
            .then((posts) => {
                res.json({ posts:posts,user:req.user })
            }).catch(err => {
                console.log(err)
            })
    },

    myPosts(req, res) {
        Post.find({ postedBy: req.user._id })
            .populate("PostedBy", "_id name")
            .sort('-createdAt')
            .then(mypost => {
                res.json({post: mypost,user:req.user })
            })
            .catch(err => {
                console.log(err)
            })

    },

    like(req, res) {
        Post.findByIdAndUpdate(req.body.postId, {
                $push: { likes: req.user._id }
            }, {
                new: true
            }).populate("postedBy", "_id name profilePic ")
            .populate("comments.postedBy", "_id name profilePic")
            .exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json(result)
                }
            })
    },

    unLike(req, res) {
        Post.findByIdAndUpdate(req.body.postId, {
                $pull: { likes: req.user._id }
            }, {
                new: true
            }).populate("postedBy", "_id name profilePic ")
            .populate("comments.postedBy", "_id name profilePic")
            .exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json(result)
                }
            })
    },

    comment(req, res) {
        const comment = {
            text: req.body.text,
            postedBy: req.user._id
        }
        Post.findByIdAndUpdate(req.body.postId, {
                $push: { comments: comment }
            }, {
                new: true
            })
            .populate("comments.postedBy", "_id name profilePic")
            .populate("postedBy", "_id name profilePic")
            .exec((err, result) => {
                if (err) {
                    console.log(err)
                    return res.json({ error: err })
                } else {
                    res.json(result)
                }
            })
    },
    singlePost(req,res){
        Post.findOne({_id:req.params.id})
        .populate("postedBy", "_id name profilePic ")
        .populate("comments.postedBy", "_id name profilePic")
        .then(post=>{
           
            res.json({post:post,user:req.user})
        }).catch(err=>{
            res.json(err)

        })
    },
    deletePost(req,res){
        Post.findByIdAndDelete({_id:req.params.id})
        .then(result=>
            res.json({result}))
        .catch(err=>{
            res.json(err)
        })
    }
}