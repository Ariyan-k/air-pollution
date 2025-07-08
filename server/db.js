import mongoose from "mongoose";
import { required } from "zod/v4-mini";

mongoose.connect('mongodb+srv://ariyan1khan34:sorcerer82supreme999@airlytics-cluster.7rzu0wv.mongodb.net/?retryWrites=true&w=majority&appName=airlytics-cluster/airlytics')
    .then(() => console.log("MongoDB connected!"))
    .catch(console.error);

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String
});

const User = mongoose.model('users', userSchema);

export {User};