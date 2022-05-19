import usersModel from "../models/users";

const getUser = async (req, res) => {
    res.send('getUser')
}

const getUserById = async (req, res) => {
    res.send('getUserById')
}

const postUser = async (req, res) => {
    const { body } = req
    const user = await usersModel.createUser(body)
    res.send(user)
}

export default {
    getUser,
    getUserById,
    postUser
}