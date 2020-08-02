/*jshint esversion: 8*/

const mongoose = require('mongoose');
//const { Double } = require('bson');
//const { builtinModules } = require('module');



const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 100,
        min: 4
    },
    
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 4
    },
    
    username: {
        type: String,
        required: false,
        max: 100,
        min: 4
    },

    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
