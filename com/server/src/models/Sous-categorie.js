const mongoose = require('mongoose');
const Categorie = require('./Categorie');

const sousCategorieSchema = new mongoose.Schema({
    sous_categorie_name:{
        type:String,
        unique:true,
    },
    categorie_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Categorie,
    },
    create_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('sous_categorie', sousCategorieSchema);