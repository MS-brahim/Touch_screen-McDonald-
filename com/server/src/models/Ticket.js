const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_title:{
        type:String,
        required:true,
        unique:true
    },
    // order_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:Order
    // },
    create_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);