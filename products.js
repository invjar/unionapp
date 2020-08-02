/*jshint esversion: 8*/

//console.log("entering psots.js");

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const connectDB = require('../db/database');
const verify = require('./verifyToken');
const http = require("http");
const quertstring = require("querystring");
const url = require("url");

//const db = require('../db/database');

//this part publishes product catalog
//DISPLAY CATALOG
router.get('/menu', async (req, res, next) => {

    console.log("At least got till here ... eeiks");
    try {
        const getProds = await Product.find();
        console.log(getProds);
        res.status(200).json(getProds);
    } catch(err) {
        res.status(400).json({message: err });
    }
});

router.get('/menu1', async (req, res, next) => {

    console.log("in menu 2");
    try {
        console.log(`req.url: ${req.url}`);
        const queryObect = url.parse(req.url, true).query;
        console.log(`queryObect: ${queryObect}`);
        
        //const search = req.querystring.q;
        console.log(`******req.query.q = ${search}`);

        if(req.query.q !== 'undefined') {
            //const prod = await Product.findById(search);
            console.log(`One product ${Product}`);
        } else {
            //console.log(`req.query.q = ${search}`);
            const prod = await Product.find();
            console.log(`Multiple products ${prod}`);
        }
        
        console.log(`Before sending resp to client ${prod}`);

        res.status(200).json(prod);

    } catch(err) {
        res.status(500).json({message: err });
    }

});

//this part recieves post from browser to add new pro,ducts
//NEW PRODUCT ADDED TO CATALOG
//router.post('/addproduct', verify, async (req, res, next) => {
router.post('/addproduct', async (req, res, next) => {

    console.log("GOt into the post response part of the code");
    const port = process.env.port || 3000;
    //res.send("action processed");
    console.log(req.body.product);

    const product = new Product({
        product: req.body.product,
        id: req.body.id,
        price: req.body.price,
        isSold: req.body.isSold,
        inStock: req.body.inStock,
        description: req.body.description,
        quantity: req.body.quantity
    });

    console.log("product = " + product);

    try {
        const savedProd = await product.save();
        console.log('Save was completed ... or was it a scam???');
            res.status(200).json(savedProd);
    } catch(err) {
            res.status(400).json({message: err });
    }

    
});

//GET product from catalog
router.get('/:productId', async (req, res, next) => {
    try {
        console.log(req.params.productId);
        const prod = await Product.findById(req.params.productId);
        console.log("prod = " + prod);
        res.json(prod);
    } catch (err) {
        res.json({message: err});
    }
});

//DELETE product from catalog
router.delete('/:productId', verify, async (req, res, next) => {
    try {
        console.log(req.params.productId);
        const removedProd = await Product.deleteOne({_id: req.params.productId});
        res.status(200).json(removedProd);
    } catch (err) {
        res.json({message: err});
    }
});

//UPDATE product on catalog
router.patch('/:productId', verify, async (req, res, next) => {
    try {
        console.log(req.params.productId);
        const updatedProd = await Product.updateOne(
            { _id: req.params.productId },
            { $set: { product: req.body.product } }
    );
    console.log("prudct update = " + updatedProd);
    res.status(200).json(updatedProd);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;