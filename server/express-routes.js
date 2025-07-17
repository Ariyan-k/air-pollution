import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
import jwt from 'jsonwebtoken';
const JWT_KEY = process.env.JWT_KEY;
import { signupValidation } from './validation.js';
import { loginValidation } from './validation.js';
import { User, initDB, Heatpoint } from './db.js';
import fetch from 'node-fetch';
import fs from 'fs';
import callOpenweather from './miner/miner.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('../src'));
await initDB();

async function refreshHeatmapMiddleware() {
    const data = await Heatpoint.findOne({name: process.env.HEATPOINTS_COLLECTION_FIELD});
    const prevUnixtime = data.unixtime;
    const currentUnixtime = Date.now();
    const diff = (currentUnixtime - prevUnixtime)/1000;
    const resetTime = 14400; //4 hours in seconds
    if (diff > resetTime) {
        try {
            await callOpenweather();
        }
        catch(err) {
            console.log(err);
            console.log("Something went wrong, falling back to previous data.");
        }
    }
    else console.log(`${(resetTime - diff)/(60*60)} hours remaining in refresh.`);
}

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({ msg: "No token provided" });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.json({ msg: "Invalid token format. Expected 'Bearer <token>'" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_KEY);
        next();
    }
    catch (err) {
        return res.json({ msg: "Invalid or expired token, Login to continue" });
    }
}

app.get('/Homepage', refreshHeatmapMiddleware, authMiddleware, (req, res) => {
    res.json({ msg: "authOK" });
});

app.get('/', refreshHeatmapMiddleware, (req, res) => {
    res.json({ msg: "backend is active." });
});

app.post('/', async (req, res) => {
    const { username, password } = req.body;
    const isValid = loginValidation.safeParse({ username, password });
    if (isValid.success) {
        const isUser = await User.findOne({ username: username });
        if (isUser) {
            const passAuth = await bcrypt.compare(password, isUser.password);
            if (passAuth) {
                const token = jwt.sign({ userId: isUser._id }, JWT_KEY, { expiresIn: '1h' });
                return res.json({ msg: token });
            }
            else return res.json({ msg: "Incorrect password" });
        }
        else return res.json({ msg: "User does not exist, sign up to continue" });
    }
    else {
        return res.json({ msg: "Invalid input" });
    }
});

app.post('/signup', refreshHeatmapMiddleware, async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Sign up Request from : ",username);
    const isValid = signupValidation.safeParse({ username, email, password });
    if (isValid.success) {
        console.log("Authentication successful!");
        const isUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (isUser) {console.log("User already exists"); return res.json({ msg: "Username or email already exists" });}
        else {
            console.log("Trying to create ", username," new acc.");
            const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
            const userData = { username, email, password: hashedPass };
            const newUser = new User(userData);
            await newUser.save();
            res.json({ msg: "Account created successfully, redirecting to login page." });
        }
    }
    else {
        res.json({ msg: "Invalid input" });
    }
});

app.get('/geocode', authMiddleware, async (req, res) => {
    try {
        const { city } = req.query;
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`, {
            headers:
            {
                'User-Agent': 'airlytics-red.vercel.app (ariyansworkmail@gmail.com)'
            }
        });
        const data = await response.json();

        if (data.length > 0) {
            const { lat, lon } = data[0];
            return res.json({ coordinates: { lat: parseFloat(lat), lng: parseFloat(lon) } });
        }
        else return res.json({ msg: "City not found, Check for any invalid request." });
    }
    catch (err) {
        console.log(err);
        return res.json({ msg: "Query not sent." });
    }
});

app.get('/heatdata', authMiddleware, (req, res) => {
    const heatpointsData = JSON.parse(fs.readFileSync('./heatdata/heatpointsdata.json', 'utf-8'));
    if (heatpointsData) res.send(heatpointsData);
    else res.json({msg: "Server error"});
});

app.get('/localWeather', authMiddleware,  async (req, res) => {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    let response;
    if (lat && lng) {
        try {
            response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto`);
            response = await response.json();
            res.send(response);
        }
        catch(err) {
            console.log(err);
            res.json("Failed to fetch, please retry.");
        }
    }
    else res.json({msg: "Invalid latitude or longitude"});
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend live on port: ${PORT}`);
});

