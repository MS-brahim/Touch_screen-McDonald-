const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv/config');

// middleware
server.use(cors());
server.use(morgan('dev'));
server.use(express.urlencoded({extended: false}));
server.use(express.json());

// connect to db 
mongoose.connect(process.env.DB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, ()=>{
    console.log("Connected success");
});

//ROUTES 
const categorieRoute = require('./src/routes/categorie-route');
const sousCategoryRoute = require('./src/routes/sous_categorie-route');
const productRoute = require('./src/routes/product-route');

server.use('/categorie', categorieRoute);
server.use('/sous_categorie', sousCategoryRoute);
server.use('/product', productRoute);



// listening to server 
server.listen(3000);