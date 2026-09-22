const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
    registerID: {
        type: String,
        required:true,
        unique: true
    },
        name :{
        type: String,
        required:true,
        trim: true
        },
        email:{
        type: String,
        required:true,
        unique: true,
        lowercase: true
        }
    },{
        timestamps: true
    });

    module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);