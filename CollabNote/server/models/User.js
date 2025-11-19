const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    sharedKey: { type: String, unique: true }

})
module.exports = mongoose.model("User",userSchema)