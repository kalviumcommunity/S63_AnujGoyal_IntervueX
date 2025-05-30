import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Initialize passport
const initializePassport = async () => {
  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Only initialize Google Strategy if credentials are available
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const { Strategy: GoogleStrategy } = await import('passport-google-oauth20');
    
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/api/v1/user/auth/google/callback",
          scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
              const tokenData = { userId: user._id };
              const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
                expiresIn: "1d",
              });
              user.token = token;
              return done(null, user);
            }

            const newUser = await User.create({
              fullname: profile.displayName,
              email: profile.emails[0].value,
              phonenumber: "",
              password: "",
              role: "student",
              profile: {
                profilePhoto: profile.photos[0].value,
              },
            });

            const tokenData = { userId: newUser._id };
            const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
              expiresIn: "1d",
            });
            newUser.token = token;
            return done(null, newUser);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  }

  // Only initialize LinkedIn Strategy if credentials are available
  if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
    const { Strategy: LinkedInStrategy } = await import('passport-linkedin-oauth2');
    
    passport.use(
      new LinkedInStrategy(
        {
          clientID: process.env.LINKEDIN_CLIENT_ID,
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
          callbackURL: "/api/v1/user/auth/linkedin/callback",
          scope: ["r_emailaddress", "r_liteprofile"],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
              const tokenData = { userId: user._id };
              const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
                expiresIn: "1d",
              });
              user.token = token;
              return done(null, user);
            }

            const newUser = await User.create({
              fullname: profile.displayName,
              email: profile.emails[0].value,
              phonenumber: "",
              password: "",
              role: "student",
              profile: {
                profilePhoto: profile.photos[0].value,
              },
            });

            const tokenData = { userId: newUser._id };
            const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
              expiresIn: "1d",
            });
            newUser.token = token;
            return done(null, newUser);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  }
};

// Initialize passport configuration
(async () => {
  try {
    await initializePassport();
  } catch (error) {
    console.error('Failed to initialize passport:', error);
  }
})();

export { passport }; 