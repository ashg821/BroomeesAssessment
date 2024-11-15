const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    username: { type: String, reqquired: true, trim: true },
    password: { type: String, required: true },
    timeCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', userSchema);