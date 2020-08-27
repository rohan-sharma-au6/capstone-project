const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
require("./datbase");
const authenticate = require("./middlewares/authenticate")
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 8080
    // app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(require("./routes/userRoutes"))
app.use(require("./routes/followRoutes"))
app.use(require("./routes/postRoutes"))
app.use(require("./routes/userPostRoutes"))
app.use(require("./routes/storyRoutes"))

app.get("/", authenticate, function(req, res) {
    console.log(req.user)
    res.send("Hello")
})

app.listen(port, function() {
    console.log(`server Started on ${port}`)
})