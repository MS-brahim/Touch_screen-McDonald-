const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    categorie_name:{
        type:String,
        required:true,
        unique:true
    },
    create_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Categorie', categorieSchema);