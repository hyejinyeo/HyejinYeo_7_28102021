const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require("helmet");
const nocache = require('nocache');
const cookieSession = require('cookie-session');


/* Base de données */
const { sequelize } = require('./models/index');


/* Création d'une application Express */
const app = express();


app.use(cors({
    origin: 'http://localhost:8080'
}));
// Parse les requêtes de "content-type: application/json"
app.use(express.json());
// Parse les requêtes de "content-type: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: true }));


// Empêche les erreurs d'en-tête cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


/* Sécurité */
// Helmet : aide à sécuriser les applications Express en définissant divers en-têtes HTTP
app.use(helmet());
// Nocache : désactive la mise en cache du navigateur
app.use(nocache());
// Cookie-session : contrôle les cookies et les expire après la durée définie
const expiryDate = new Date( Date.now() + 24 * 60 * 60 * 1000 ); // 24 heure
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: { 
        secure: true,                      // le cookie doit être envoyé uniquement via HTTPS
        httpOnly: true,                    // le cookie doit uniquement être envoyé via HTTP(S) et n'est pas mis à la disposition du client JavaScript
        domain: 'http://localhost:3000',   // le domaine du cookie
        expires: expiryDate                // la date d'expiration du cookie
    }
}));
// Dotenv : aide à masquer les informations de connexion à la base de données - variables d'environnement


/* Dossier - images: photos des utilisateurs / uploads: fichiers des publications */
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/* Routes User */
require('./routes/user')(app)
/* Routes Post */
require('./routes/post')(app)


// Sequelize - Test de connexion à la base de données MySQL
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