const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// middleware
router.use(bodyParser.json());

// models
const Sous_categorie = require('../models/Sous-categorie');

// find all sous categories
router.get('/', async (req, res, next)=>{
    try {
        const sous_category = await Sous_categorie.find().populate('categorie_id');;
        res.json(sous_category);
    } catch (err) {
        res.json({message:err});
    }
});

// FIND DATA SOUS CATEGORIE BY ID
router.get('/:id', async (req, res, next)=>{
   
    try {
        const sous_categorie = await Sous_categorie.findById(req.params.id);
        res.json(sous_categorie);
    } catch (err) {
        res.json({message:err});
    }
});

// Create new sous categories 
router.post('/add', async (req, res, next)=>{
    const sousCateg = new Sous_categorie({
    sous_categorie_name : req.body.sous_categorie_name,
    categorie_id        : req.body.categorie_id,
    create_at           : req.body.create_at
    });
    try {
        const saveSousCategory = await sousCateg.save();
        res.json(saveSousCategory);
    } catch (err) {
        res.json({message:err});
    } 
});

// Remove categorie
router.delete('/delete/:id', async (req, res, next)=>{
    try {
        const sousCateg = await Sous_categorie.remove({_id:req.params.id});
        res.json(sousCateg);
    } catch (err) {
        res.json({message:err});
    }
});

// Update Sous categorie 
router.patch('/update/:id', async (req, res, next)=>{
    try {
        const updateSousCat = await Sous_categorie.updateMany(
            {_id: req.params.id},
            {$set:{
                sous_categorie_name:req.body.sous_categorie_name,
                categorie_id: req.body.categorie_id
            }});
        res.json(updateSousCat);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;