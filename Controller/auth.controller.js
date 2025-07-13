import mongoose from 'mongoose';
import { JWT_TOKEN, JWT_EXPIRES_IN } from '../config/env.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js';

export const Signup = async(req,res,next) => {
    const session = await mongoose.startSession();
        session.startTransaction();
    
    try {
        const { name, email, password } = req.body;
        
       const existingUser = await User.findOne({ email });

        if(existingUser) {
            const error = new Error("User already exist");
            error.statusCode = 409;
            throw error
        }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    const newUser = await User.create([{name,email,password:hashPassword}]);

    const token = jwt.sign(             
  { userId: newUser[0].id },         
  JWT_TOKEN,                         
  { expiresIn: JWT_EXPIRES_IN }      
);
    await session.commitTransaction()
      session.endSession();
    res.status(201).json({
        success:true,
        message:"User created successfully",
        data: {
            token,
            user: newUser[0]
        }
    })

    } catch (error) {
        await session.abortTransaction();
        next(error);
    }
};

export const SignIn = async(req,res,next) => {
 const {email, password} = req.body;

 try {
    const user = await User.findOne({email});
 if(!user) {
   const error = new Error("User not found")
   error.statusCode = 404;
   throw error
 }
 const matchPassword = await bcrypt.compare(password,user.password);
 if(!matchPassword) {
    const error = new Error("Invalid password");
    error.statusCode = 401;
    throw error
 }

 const token = jwt.sign({userId:user._id}, JWT_TOKEN,                         
  { expiresIn: JWT_EXPIRES_IN })
   res.status(201).json({
        success:true,
        message:"User signed successfully",
        data: {
            token,
            user: user
        }
    })
 } catch (error) {
    next(error)
 }
}   

export const SignOut = async(req,res,next) => {

};