const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config-user');

/* Sécurité */
// Express-Rate-Limit : limite le taux de la requête d'un utilisateur
const rateLimit = require('express-rate-limit');
// Ne permette pas de créer plus de 3 comptes par heure à partir de la même IP.
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 3, // blockage après 3 requêtes
    message: 'Trop de comptes créés à partir de cette adresse IP. Veuillez réessayer après une heure.'
});


/* Router pour USER */
module.exports = (app) => {
    // Inscription & Connexion (User C)
    app.post('/signup', createAccountLimiter, userCtrl.signup),
    app.post('/login', userCtrl.login),
    // Compte d'utilisateur (User RUD)
    app.get('/account/:id', auth, userCtrl.getAccount),
    app.put('/account/:id', auth, multer, userCtrl.updateAccount),
    app.delete('/account/:id', auth, userCtrl.deleteAccount),
    // Admin 
    app.get('/users', auth, userCtrl.getAllUsers),
    app.put('/user/:id', auth, userCtrl.updateAdmin),
    app.delete('/user/:id', auth, userCtrl.deleteUser)
}