const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    pharmacy: {
        type: String,
        require: true
    }
},{timestamps: true});

const User = mongoose.model('Users', userSchema);

module.exports = User;