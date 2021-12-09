/* VERSION 1 --- this works */

// Importer le controller User
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config");

/* Router pour USER */
// S'inscrire
module.exports = (app) => {
    app.post('/signup', userCtrl.signup),
    app.post('/login', userCtrl.login),
    app.get('/account/:id', auth, userCtrl.getAccount),
    app.put('/account/:id', auth, multer, userCtrl.updateAccount),
    app.delete('/account/:id', auth, userCtrl.deleteAccount)
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