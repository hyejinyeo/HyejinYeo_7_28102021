const express = require('express');
const cors = require('cors');
const path = require('path');


/* Sécurité */
const helmet = require("helmet");

/* Déclaration des routes */
// User
// const userRoutes = require('./routes/user');
// Post
// const postRoutes = require('./routes/post');


/* Base de données */
const { sequelize } = require('./models/index');


/* Création d'une application Express */
const app = express();


app.use(cors({
    origin: 'http://localhost:8080'
}));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// prevents cors header errors 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


/* Routes User */
// app.use('/api/user', userRoutes);
/* Routes Post */
// app.use('/api/post', postRoutes);


/* Sécurité */
app.use(helmet());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/* Routes User */
require('./routes/user')(app)
/* Routes Post */
require('./routes/post')(app)




// Sequelize - MySQL Database Connection Test  
const dbTest = async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch {
        console.log('Unable to connect to the database:' + error);
    }
};
dbTest();



/* Exporter l'application Express */
module.exports = app;