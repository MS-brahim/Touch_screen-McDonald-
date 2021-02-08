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
        const codePromo = await CodePromo.find();
        res.json(codePromo);
    } catch (error) {
        res.json({message:error});
    }
});

module.exports = router;