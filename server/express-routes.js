import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 12;
import jwt from 'jsonwebtoken';
const JWT_KEY = "jfie@#j45eJJk%7jfn3ut454448rfjJ838@@@789";
import { signupValidation } from './validation.js';
import { loginValidation } from './validation.js';
import { User } from './db.js';
import fetch from 'node-fetch'


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('../src'));

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
    catch(err) {
        return res.json({msg: "Invalid or expired token, Login to continue"});
    }
}

app.get('/Homepage', authMiddleware, (req, res) => {
    res.json({msg: "authOK"});
});

app.get('/', (req, res) => {
    res.json({msg: "backend is active."});
});

app.post('/', async(req, res) => {
    const {username, password} = req.body;
    const isValid = loginValidation.safeParse({username, password});
    if (isValid.success) {
        const isUser = await User.findOne({username: username});
        if (isUser) {
            const passAuth = await bcrypt.compare(password, isUser.password);
            if(passAuth) {
                const token =jwt.sign({userId: isUser._id}, JWT_KEY, {expiresIn: '1h'});
                return res.json({msg: token})
            }
            else return res.json({msg: "Incorrect password"});
        }
        else return res.json({msg: "User does not exist, sign up to continue"});
    }
    else {
        return res.json({msg: "Invalid input"});
    } 
});

app.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    const isValid = signupValidation.safeParse({username, email, password});
    if (isValid.success) {
        const isUser = await User.findOne({
            $or: [
                {username: username},
                {email: email}
            ]
        })
        if(isUser) return res.json({msg: "Username or email already exists"});
        else {
            const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
            const userData = {username, email, password: hashedPass};
            const newUser = new User(userData);
            await newUser.save();
            res.json({msg: "Account created successfully, redirecting to login page."});
        }
    }
    else {
        res.json({msg: "Invalid input"});
    }
});

app.get('/geocode', authMiddleware, async (req, res) => {
    try {
        const {city} = req.query;
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`, {
            headers: {
                'User-Agent': 'airlytics-red.vercel.app (ariyansworkmail@gmail.com)'
            }
        });
        const data = await response.json();

        if (data.length > 0) {
            const {lat, lon} = data[0];
            return res.json({coordinates: {lat: parseFloat(lat), lng: parseFloat(lon)}});
        }
        else return res.json({msg: "City not found, Check for any invalid search."})
    }
    catch(err) {
        console.log(err);
        return res.json({msg: "Query not sent."});
    }
});

app.listen(PORT, '0.0.0.0', () => { 
    console.log(`Backend live on port: ${PORT}`);
});

