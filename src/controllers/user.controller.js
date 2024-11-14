const { getUser, createUser } = require('../services/user.service');

// Controller function to create a user
const createUserController = async (req, res) => {
    try {
        // Check if user already exists
        let user = await getUser(req.body);
        if (!user) {
            // If user does not exist, create a new user
            user = await createUser(req.body);
            res.status(201).send({ user });
        } else {
            // If user already exists, send a conflict status with a message
            res.status(409).send({ message: "User already exists with the same username or email" });
        }
    } catch (error) {
        // Handle any errors and send an internal server error status with the error message
        res.status(500).send({ message: error.message });
    }
};

// Export the createUserController function
module.exports = { createUserController };
