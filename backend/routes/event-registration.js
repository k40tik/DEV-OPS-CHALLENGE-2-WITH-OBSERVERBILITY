const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/event-registration');

router.post('/', async (req, res) => {
    try{
        const registerData = req.body;

        //required fields
        if(!registerData.name || !registerData.name.trim ()){
            return res.status(400).json({message: 'Name is a required field.'});
        }

        if(!registerData.email || !registerData.email.trim ()){
            return res.status(400).json({message: 'Email is a required field.'});
        }
        //email validation;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(registerData.email)){
            return res.status(400).json({message: 'Invalid email format.'});
        }
        //check if email exists in the database
        const existingEmail = await EventRegistration.findOne({email: registerData.email});
        if(existingEmail){
            return res.status(400).json({message: 'Email already exists.'});
        }

        const registeration = new EventRegistration(registerData);
        await registeration.save();

        const savedRegistration = await EventRegistration.findById(registeration._id);

            res.status(201).json({message: 'Registration successful.', data: savedRegistration});

}catch (error) {
    console.error('Error during registration:', error);

    //handle validation error
    if(error.name === 'ValidationError'){
        const messages = Object.values(error.errors).map(error=> error.message);
        return res.status(400).json({message: 'Validation error.', errors: messages});
    }
    //handle duplicate key error
    if(error.code === 11000){
        return res.status(400).json({message: 'Duplicate key error.', errors: error.keyValue});
    }

    return res.status(500).json({message: 'Registration failed.'});
    }
});

module.exports = router;
