const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    picture:{
        type:String,
        required:true
    },
    caption:{
        type:String
    },
    likes:[
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    comments:[
        {text:String,
        postedBy:{type:Schema.Types.ObjectId,
            ref:"user"}}
    ],
    postedBy:{
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},
{timestamps:true})

const Post = mongoose.model("post",postSchema);
module.exports = Post;