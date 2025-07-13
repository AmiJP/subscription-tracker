import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js"

if (!DB_URI) {
  throw new Error("Please define Mongodb environment variable inside .env.<development/production>.local");
}

export const connectToDatabase = async () => {
  try {
    console.log(DB_URI);
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to database in ${NODE_ENV}`);
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};
