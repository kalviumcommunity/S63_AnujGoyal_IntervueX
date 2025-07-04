import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { passport } from "./utils/passport.js";
import session from "express-session";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/comany.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import atsRoute from "./routes/ats.route.js";

// Load environment variables - Try .env first, fallback to .env~
dotenv.config({ path: './.env' });
if (!process.env.MONGO_URI) {
  console.log('Loading from .env~ file...');
  dotenv.config({ path: './.env~' });
}

// Define CORS options
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};

// Create express app
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup session for passport
app.use(session({
  secret: process.env.SESSION_SECRET || "intervuex-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production", maxAge: 24 * 60 * 60 * 1000 }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/ats", atsRoute);

// MongoDB URI and Port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
  connectDB();
});
