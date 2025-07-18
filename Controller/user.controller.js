import { User } from "../models/user.model.js"

export const getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if(!user) {
            const error = new Error("User not found");
            error.statusCode(404)
            throw error
        }
        res.status(200).json({ success: true, data: user })
    } catch (error) {
         console.log(error)
    }
}