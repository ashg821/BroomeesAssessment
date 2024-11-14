// Import the User model
const User = require('../models/user.model');

// Function to get a user by username or email
const getUser = async ({ username, email }) => {
    // Find a user document that matches either the email or username
    const user = await User.findOne({ $or: [{ email }, { username }] });
    return user;
}

// Function to create a new user
const createUser = async ({ firstName, lastName, email, username, password, createdAt }) => {
    // Create a new user instance with the provided data
    const user = new User({
        firstName,
        lastName,
        email,
        username,
        password,
        createdAt
    });
    // Save the user document to the database and return the saved user
    return await user.save();
}

// Export the getUser and createUser functions
module.exports = { getUser, createUser }
