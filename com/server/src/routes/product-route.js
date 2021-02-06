const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// middleware
router.use(bodyParser.json());

// models
const Product = require('../models/Product');

// find all products
router.get('/', async (req, res, next)=>{
    try {
        const product = await Product.find().populate('sous_categorie_id');
        res.json(product);
    } catch (err) {
        res.json({message:err});
    }
});

// Create new product 
router.post('/add', async (req, res, next)=>{
    const product = new Product({
    product_name        : req.body.product_name,
    product_image       : req.body.product_image,
    price               : req.body.price,
    sous_categorie_id   : req.body.sous_categorie_id,
    create_at           : req.body.create_at
    });
    try {
        const saveProduct = await product.save();
        res.json(saveProduct);
    } catch (err) {
        res.json({message:err});
    } 
});

// Remove product
router.delete('/delete/:id', async (req, res, next)=>{
    try {
        const product = await Product.remove({_id:req.params.id});
        res.json(product);
    } catch (err) {
        res.json({message:err});
    }
});

// Update product 
router.patch('/update/:id', async (req, res, next)=>{
    try {
        const updateProduct = await Product.updateMany(
            {_id: req.params.id},
            {$set:{product_name:req.body.product_name}});
        res.json(updateProduct);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;