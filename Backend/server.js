const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();


const app = express();
const port = 3000;

const userRoutes = require('./routes/userRoutes');
const passportConfig = require('./routes/passportConfig');
const inventoryRoutes = require('./routes');
const path = require('path');


app.use(express.json());
app.use(cors());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passportConfig);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/user', userRoutes);
app.use('/inventory', inventoryRoutes);

app.use(cors({
  origin: 'https://client-23q9vqpbf-sk-habeeb-ur-rehmans-projects.vercel.app/',
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
