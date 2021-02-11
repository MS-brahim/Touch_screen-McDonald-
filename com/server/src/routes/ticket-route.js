const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// middleware
router.use(bodyParser.json());

// models
const Ticket = require('../models/Ticket');

// FIND ALL TICKETS
router.get('/', async (req, res, next)=>{
    try {
        const ticket = await Ticket.find();
        res.json(ticket);
    } catch (err) {
        res.json({message:err});
    }
});

// FIND DATA Ticket BY ID
router.get('/:id', async (req, res, next)=>{
   
    try {
        const ticket = await Ticket.findById(req.params.id);
        res.json(ticket);
    } catch (err) {
        res.json({message:err});
    }
});

// Create new Ticket 
router.post('/add', async (req, res, next)=>{
    const ticket = new Ticket({
    ticket_title: req.body.ticket_title,
    });
    try {
        const saveTicket = await ticket.save();
        res.json(saveTicket);
    } catch (err) {
        res.json({message:err});
    } 
});

// Remove Ticket
router.delete('/delete/:id', async (req, res, next)=>{
    try {
        const ticket = await Ticket.remove({_id:req.params.id});
        res.json(ticket);
    } catch (err) {
        res.json({message:err});
    }
});



module.exports = router;