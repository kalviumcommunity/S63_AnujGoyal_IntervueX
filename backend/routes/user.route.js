import express from "express";
import {login, register, updateProfile, logout, uploadResume, downloadResume } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { passport } from "../utils/passport.js";

const router = express.Router();

// Basic authentication routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated, singleUpload, updateProfile);

// Resume upload routes
router.route("/resume/upload").post(isAuthenticated, singleUpload, uploadResume);
router.route("/resume/download").get(isAuthenticated, downloadResume);

// Social authentication routes - only add if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  router.get("/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      const token = req.user.token;
      res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
    }
  );
}

if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  router.get("/auth/linkedin", passport.authenticate("linkedin"));
  router.get("/auth/linkedin/callback", 
    passport.authenticate("linkedin", { failureRedirect: "/login" }),
    (req, res) => {
      const token = req.user.token;
      res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
    }
  );
}

export default router;

