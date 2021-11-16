const express = require('express');
const cors = require('cors');

/* Base de données */


/* Création d'une application Express */
const app = express();


// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


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