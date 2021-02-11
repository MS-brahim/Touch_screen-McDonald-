const mongoose = require('mongoose');
const Product = require('./Product');

const codePromoSchema = new mongoose.Schema({
    code_promo: {
        type:Number,
        required:true
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Product,
    },
    creat_at: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Code_promo', codePromoSchema);