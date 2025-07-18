import mongoose from "mongoose";
import { boolean } from "zod";

const initDB = async () => {
    try 
    {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected!")
    }
    catch(err) {console.log(err)}
}

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String
});

const heatpointsSchema = new mongoose.Schema({
    heatpoints: {
        type: [[Number]],
        required: true
    },
    aqis: {
        type: [Number],
        required: true
    },
    date: {type: String, required: true},
    time: {type: String, required: true},
    unixtime: {type: Number, required: true},
    isRunning: {type: Boolean, default: false}
});

const User = mongoose.model('users', userSchema);
const Heatpoint = mongoose.model('heatpoints', heatpointsSchema);

export {
    initDB,
    User,
    Heatpoint
};