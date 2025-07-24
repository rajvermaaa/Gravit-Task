const mongoose = require('mongoose');

//Schema for user 
const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true , unique: true},
    password: {type: String, required: true},
    resetToken: {type: String, default: null},
    resetTokenExpiry: {type: Date, default: null}

});


module.exports = mongoose.model('User', UserSchema);
