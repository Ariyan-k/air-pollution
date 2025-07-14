import mongoose from "mongoose";
import { required } from "zod/v4-mini";
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected!"))
    .catch(console.error);

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String
});

const User = mongoose.model('users', userSchema);

export {User};