const categorieTest = require('../src/routes/categorie-route');


var request = require('supertest');
// var server = require('../server');

// test('Get Data from categorie collection', async()=>{
//     await request(categorieTest)
//         .get('/')
//         .expect(400)
// });


// const app = require("./server");
// const mongoose = require("mongoose");
// const supertest = require("supertest");

// beforeEach((done) => {
//   mongoose.connect(process.env.DB_URI,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => done());
// });

// afterEach((done) => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done())
//   });
// });