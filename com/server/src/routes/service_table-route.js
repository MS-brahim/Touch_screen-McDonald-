const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// middleware
router.use(bodyParser.json());

//MODELS
const ServiceTabe = require('../models/Service-table');

// FIND ALL DATA SERVICE TABLE 
router.get('/', async (req, res, next)=>{
    try {
        const serviceTable = await ServiceTabe.find();
        res.json(serviceTable);
    } catch (error) {
        console.log(error);
        res.json({message:error})
    }
});

// FIND DATA TABLE BY ID
router.get('/:id', async (req, res, next)=>{
   
    try {
        const serviceTable = await ServiceTabe.findById(req.params.id);
        res.json(serviceTable);
    } catch (err) {
        res.json({message:err});
    }
});

// INSERT DATA TABLE SERVICE 
router.post('/add', async (req, res, next)=>{
    const serviceTable = new ServiceTabe({
        table       : req.body.table,
        status_table: req.body.status_table
    })
    try {
        const newTable = await serviceTable.save();
        res.json(newTable);
    } catch (error) {
        res.json({message:error});
    }
});

// UPDATE STATUS TABLE 
router.patch('/update/:id', async (req, res, next)=>{
    try {
        const tableEdit = await ServiceTabe.updateMany(
            {_id:req.params.id},
            {$set:{table:req.body.table,status_table:req.body.status_table}});
            res.json(tableEdit);
    } catch (error) {
        res.json({message:error})
    }
});

// DELETE TABLE 
router.delete('/delete/:id', async (req, res, next)=>{
    try {
        const tableDelete = await ServiceTabe.remove({_id:req.params.id});
        res.json(tableDelete);
    } catch (error) {
        res.json({message:error})
    }
});

module.exports = router;