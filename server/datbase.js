var mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(function () {
        console.log("Database connected successfully");
    })
    .catch(function (err) {
        console.log(err.message);
    });
