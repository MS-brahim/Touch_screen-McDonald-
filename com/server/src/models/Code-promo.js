const mongoose = require('mongoose');

const codePromoSchema = new mongoose.Schema({
    code_promo: {
        type:Number,
        required:true
    },
    creat_at: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Code_promo', codePromoSchema);