// const passport = require('passport');
// const express = require("express");
// const session = require("express-session");
// const jwt = require('jsonwebtoken');
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require('../model/userSchema');
// require('dotenv').config();

// const app = express();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "https://s61-rehman-capstone-amaraz.onrender.com/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//           user = new User({
//             username: profile.displayName,
//             email: profile.emails[0].value,
//             googleId: profile.id,
//           });
//           await user.save();
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// // Only store user ID in session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.json());

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     prompt: "select_account",
//   })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "https://client-23q9vqpbf-sk-habeeb-ur-rehmans-projects.vercel.app/login",
//     session: false,
//   }),
//   (req, res) => {
//     // Create JWT after login
//     const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
//       expiresIn: '24h',
//     });

//     // Redirect to frontend with token
//     res.redirect(
//       `https://client-23q9vqpbf-sk-habeeb-ur-rehmans-projects.vercel.app/dashboard?token=${token}`
//     );
//   }
// );

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader?.startsWith("Bearer ")) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) return res.status(403).json({ message: "Invalid token" });

//       req.user = decoded;
//       next();
//     });
//   } else {
//     res.status(401).json({ message: "No token provided" });
//   }
// };

// app.get("/protected", authenticateJWT, (req, res) => {
//   res.json({ message: "You have accessed a protected route!", user: req.user });
// });

// module.exports = app;


const passport = require('passport');
const express = require("express");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../model/userSchema'); 

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
           console.log("✅ New Google user saved:", user.email);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
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
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.redirect(
      `https://client-orcin-three.vercel.app/dashboard?token=${token}`
    );
  }
);

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Example protected route
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: "You have accessed a protected route!", user: req.user });
});
module.exports = app;

