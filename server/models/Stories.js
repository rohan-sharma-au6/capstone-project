const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storiesSchema = new Schema({
    picture: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: (Date.now()+360000000)
        
    }
},

)


const Story = mongoose.model("story", storiesSchema);
module.exports = Story;