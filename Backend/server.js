const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
require('dotenv').config()
const inventoryRoutes = require('./routes')

app.use(express.json());
app.use('/inventory', inventoryRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 

mongoose
.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB', err);
});