const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Insta",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(function(){
    console.log("Database Connected")
})
.catch(function(err){
    console.error(err)
});