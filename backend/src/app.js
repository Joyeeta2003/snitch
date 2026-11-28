import express from 'express';
// import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import authRouter from "./routers/auth.routes.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './config/config.js';

const app = express();

// app.use(cors({
//     origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
// }));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL:"/api/auth/google/callback"
},(accessToken, refreshToken, profile, done) =>{
    return done(null, profile)
}))

app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is running"
    });
});

app.use("/api/auth", authRouter);

export default app;
