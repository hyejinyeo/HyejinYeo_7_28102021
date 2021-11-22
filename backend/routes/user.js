// Importer Express
// const express = require('express');
// Créer un router
// const router = express.Router();
// Importer le controller User
const userCtrl = require('../controllers/user');


/* Router pour USER */
// S'inscrire
// router.post('/signup', userCtrl.signup);



module.exports = (app) => {
    app.post('/signup', userCtrl.signup)
}


// Se connecter
// router.post('/login', userCtrl.login);


// Exporter le router
// module.exports = router;