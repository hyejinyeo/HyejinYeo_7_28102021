const express = require('express');


/* Création d'une application Express */
const app = express();

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