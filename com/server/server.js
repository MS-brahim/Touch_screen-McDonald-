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
const tableService = require('./src/routes/service_table-route');
const codePromo = require('./src/routes/code_promo-route');

server.use('/categorie', categorieRoute);
server.use('/sous_categorie', sousCategoryRoute);
server.use('/product', productRoute);
server.use('/table', tableService);
server.use('/code_promo', codePromo);



// listening to server 
server.listen(3000);