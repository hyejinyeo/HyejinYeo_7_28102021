const express = require('express');
const cors = require('cors');


/* Création d'une application Express */
const app = express();


/* Base de données */



app.use(cors({
    origin: 'http://localhost:8080'
  }));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



/* Route */
app.use((req, res, next) => {
    console.log('Request received');
    next();
});
app.use((req, res, next) => {
    res.json({
        message: 'This is response to the request!'
    });
});


/* Exporter l'application Express */
module.exports = app;