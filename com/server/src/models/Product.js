const mongoose = require('mongoose');
const Sous_categorie = require('./Sous-categorie');

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    product_image:{
        type:String,
        // required:true
    },
    price:{
        type:Number,
        required:true
    },
    sous_categorie_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Sous_categorie,
    },
    create_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);