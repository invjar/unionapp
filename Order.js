//used to describe the transactional cart

/*jshint esversion: 8*/

const mongoose = require('mongoose');
const { Double } = require('bson');
const { builtinModules } = require('module');



const OrderSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true
    },
    
    productId: {
        type: String,
        required: true
    },
    
    productName: {
        type: String,
        required: true
    },
    
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    
    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        default: "Queued"
    },
    
    createDate: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Order', OrderSchema);
