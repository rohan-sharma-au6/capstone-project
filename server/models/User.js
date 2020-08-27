const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dqmpbgxs3/image/upload/v1597126913/dummyimage_eqxuo1.png"
    },
    accessToken: {
        type: String,
        default: ""
    },
    resetToken: String,
    expireToken: Date,
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "post"
        }
    ],
    saved: [],
    savedId: [
        {
            type: Schema.Types.ObjectId,
            ref: "post"
        }
    ]

},
    { timestamps: true })

userSchema.statics.findByEmail = (email, password) => {
    var userObj = null;
    return new Promise(function (resolve, reject) {
        User.findOne({ email:email }).then(function (user) {
            if (!user) reject("incorrect credentials");
            userObj = user;
            return bcrypt.compare(password, user.password);
        }).then(function (isMatched) {
            if (!isMatched) reject("incorrect credentials");
            resolve(userObj);
        }).catch(function (err) {
            reject(err);
        })
    })
};


const User = mongoose.model("user", userSchema);
module.exports = User