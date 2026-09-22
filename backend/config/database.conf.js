const mongoose = require('mongoose');
require('dotenv').config();

//mongo db connection
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

module.exports = mongoose;