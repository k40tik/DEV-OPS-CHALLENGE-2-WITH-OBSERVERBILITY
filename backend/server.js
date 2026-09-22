const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database.conf');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
const eventRegistrationRoutes = require('./routes/event-registration');
app.use('/api/event-registration', eventRegistrationRoutes);


//health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({message: 'Server is running.'});
});

//404 error
app.use((_req, res) => {
    res.status(404).json({message: 'Route not found'});
});

//error handling middleware
app.use((err, _req, res) => {
    console.error(err);
    res.status(500).json({message: 'Internal server error.'});
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;