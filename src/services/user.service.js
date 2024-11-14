const User = require('../models/user.model');

const getUser = async ({ username, email }) => {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    return user;
}

const createUser = async ({ firstName, lastName, email, username, password, createdAt }) => {
    const user = new User({
        firstName,
        lastName,
        email,
        username,
        password,
        createdAt
    });
    return await user.save();
}

module.exports = { getUser, createUser }