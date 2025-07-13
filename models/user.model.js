import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        minLength: 2,
        maxLength: 50
    },
      email: {
        type: String,
        required: [true, "Email name is required"],
        unique: true,
        trim:true,
        lowerCase: true,
        match: [/\S+@\S+\.\S+/, "Please fill the valid email address"]
    },
    password: {
        type:String,
        required: [true, "Password required"],
        minLength:6
    }
})

export const User = mongoose.model("User" ,userSchema)