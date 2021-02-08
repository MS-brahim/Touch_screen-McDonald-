const mongoose = require('mongoose');

const serviceTableSchema = new mongoose.Schema({
    table:{
        unique:true,
        type:String,
        required:true
    },
    status_table:{
        type:Boolean,
        required:false,
    },
    create_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Service_Table', serviceTableSchema);