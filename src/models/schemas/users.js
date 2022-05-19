import mongoose from 'mongoose'

const collection = "users"
const usersSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
)

const usersModel = mongoose.model(collection, usersSchema)

export default usersModel
export { usersSchema }
