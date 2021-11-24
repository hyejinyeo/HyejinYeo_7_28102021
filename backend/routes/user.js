/* VERSION 1 --- this works */

// Importer le controller User
const userCtrl = require('../controllers/user');


/* Router pour USER */
// S'inscrire
module.exports = (app) => {
    app.post('/signup', userCtrl.signup),
    app.get('/signup', userCtrl.userlist),
    app.post('/login', userCtrl.login)
}






// /* VERSION 2 */

// // Importer Express
// const express = require('express');
// // Créer un router
// const router = express.Router();
// const userCtrl = require('../controllers/user');


// /* Router pour USER */
// // S'inscrire
// router.post('/signup', userCtrl.signup);


// // Se connecter


// // Exporter le router
// module.exports = router;