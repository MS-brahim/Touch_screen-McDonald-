const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// middleware
router.use(bodyParser.json());

// models
const Categorie = require('../models/Categorie');

// find all categories
router.get('/', async (req, res, next)=>{
    try {
        const categorie = await Categorie.find();
        res.json(categorie);
    } catch (err) {
        res.json({message:err});
    }
});

// FIND DATA CATEGORIE BY ID
router.get('/:id', async (req, res, next)=>{
   
    try {
        const categorie = await Categorie.findById(req.params.id);
        res.json(categorie);
    } catch (err) {
        res.json({message:err});
    }
});

// Create new categorie 
router.post('/add', async (req, res, next)=>{
    const categorie = new Categorie({
    categorie_name: req.body.categorie_name,
    create_at: req.body.create_at
    });
    try {
        const saveCategorie = await categorie.save();
        res.json(saveCategorie);
    } catch (err) {
        res.json({message:err});
    } 
});

// Remove categorie
router.delete('/delete/:id', async (req, res, next)=>{
    try {
        const categorie = await Categorie.remove({_id:req.params.id});
        res.json(categorie);
    } catch (err) {
        res.json({message:err});
    }
});

// Update categorie 
router.patch('/update/:id', async (req, res, next)=>{
    try {
        const updateCategorie = await Categorie.updateOne(
            {_id: req.params.id},
            {$set:{categorie_name:req.body.categorie_name}});
        res.json(updateCategorie);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;