const Story = require("../models/Stories");


module.exports = {
    addStory(req, res) {

        const { picture, caption } = req.body;
        if (!picture || !caption) {
            res.json({ error: "Please fill all details" })
        }
        console.log(req.user)

        const story = new Story({
            picture,
            caption,
            postedBy: req.user

        })

        story.save().then(result => {
            res.json({ story: result, message: "posted" })
        })
            .catch(err => {
                res.json({error:err})
            })
    },
    allStories(req,res){
        Story.find()
            .populate("postedBy", "_id name profilePic ")
            .populate("comments.postedBy", "_id name profilePic")
            .sort('-createdAt')
            .then((stories) => {
                res.json({ stories:stories })
            }).catch(err => {
                //console.log(err)
            })
    }
}
