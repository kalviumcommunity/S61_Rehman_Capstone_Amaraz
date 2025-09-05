const passport = require('passport');
const express = require("express");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
require('dotenv').config();

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://s61-rehman-capstone-amaraz.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
          });
          await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: '24h',
        });

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { id: user.user ? user.user.id : user.id, token: user.token });
});

passport.deserializeUser(async (serializedUser, done) => {
  try {
    const user = await User.findById(serializedUser.id);
    user.token = serializedUser.token;
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://client-orcin-three.vercel.app/login",
  }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`https://client-orcin-three.vercel.app/dashboard?token=${token}`);
  }
);

module.exports = app;