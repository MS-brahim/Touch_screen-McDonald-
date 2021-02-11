const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// MIDDLEWAIRE 
router.use(bodyParser.json());

// MODELS
const CodePromo = require('../models/Code-promo');

// GET ALL DATA CODE PROMO
router.get('/', async (req, res, next)=>{
    try {
        const codePromo = await CodePromo.find().populate('product_id');
        res.json(codePromo);
    } catch (error) {
        res.json({message:error});
    }
});

// FIND DATA CODE PROMO BY ID
router.get('/:id', async (req, res, next)=>{
   
    try {
        const codePromo = await CodePromo.findById(req.params.id);
        res.json(codePromo);
    } catch (err) {
        res.json({message:err});
    }
});

// CREATE NEW CODE PROMO
router.post('/add', async (req, res, next)=>{
    const codePromo = new CodePromo({
    code_promo: req.body.code_promo,
    product_id: req.body.product_id
    });
    try {
        const saveCode = await codePromo.save();
        res.json(saveCode);
    } catch (err) {
        res.json({message:err});
    } 
});

// DELETE CODE PROMO
router.delete('/delete/:id', async (req, res, next)=>{
    try {
        const codePromo = await CodePromo.remove({_id:req.params.id});
        res.json(codePromo);
    } catch (err) {
        res.json({message:err});
    }
});

// UPDATE CODE PROMO
router.patch('/update/:id', async (req, res, next)=>{
    try {
        const updateCodePromo = await CodePromo.updateMany(
            {_id: req.params.id},
            {$set:{code_promo:req.body.code_promo}});
        res.json(updateCodePromo);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;