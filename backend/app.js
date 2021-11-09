const express = require('express');


/* Création d'une application Express */
const app = express();

app.use((req, res) => {
    res.json({
        message: 'Express app created!'
    });
})


/* Exporter l'application Express */
module.exports = app;