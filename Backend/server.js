const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const userRoutes = require('./routes/userRoutes');
const passportConfig = require('./routes/passportConfig');
const inventoryRoutes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passportConfig);

app.use('/user', userRoutes);
app.use('/inventory', inventoryRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
