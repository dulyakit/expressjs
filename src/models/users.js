import users from "./schemas/users";
import bcrypt from "bcrypt"

const generatePassword = async (password) => {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const passwordHashed = bcrypt.hash(password, salt)

    return passwordHashed
}

const createUser = async (data, options) => {
    const insertData = data

    insertData = await generatePassword(data.password)

    const newUser = new users(insertData)

    return await newUser.save()
}

module.exports = {
    createUser
}