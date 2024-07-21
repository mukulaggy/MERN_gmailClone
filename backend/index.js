import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js';
import emailRoute from './routes/email.route.js';
import oauth2Client from './config/oauth2.js';
import { google } from 'googleapis';

dotenv.config({});
connectDB();

const app = express();
const PORT = 8080;

app.get("/home", (req, res) => {
  return res
    .status(200)
    .json({ message: "I am coming from backend", success: true });
});

const corsOptions = {
  origin: "http://localhost:5173", // Correct the origin to match your frontend's URL
  credentials: true, // Correct the spelling
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

// Gmail OAuth2 setup
app.get('/auth/google', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.modify'
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
});

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Save the tokens to the user's session or database
  req.session.tokens = tokens;

  res.redirect('/');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
