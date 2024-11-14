const { getUser, createUser } = require('../services/user.service');

const createUserController = async (req, res) => {
    try {
        let user = await getUser(req.body);
        if (!user) {
            user = await createUser(req.body);
            res.status(201).send({ user });
        }
        else {
            res.status(409).send({ message: "User already exists with the same username or email" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}

module.exports = { createUserController }