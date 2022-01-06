const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config-post");

/* Sécurité */
// Express-Rate-Limit : limite le taux de la requête d'un utilisateur
const rateLimit = require('express-rate-limit');
// Ne permette pas d'envoyer plus de 50 requête par 15 minutes à partir de la même IP.
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // blockage après 50 requêtes
    message: "Trop de requêtes envoyées à partir de cette adresse IP. Veuillez réessayer après 15 minutes."
});

/* Router pour POST */
module.exports = (app) => {
    // Post CRUD
    app.get('/feed', auth, postCtrl.getAllPosts),
    app.get('/feed/:id', auth, postCtrl.getPostById),
    app.post('/feed', auth, apiLimiter, multer, postCtrl.createPost),
    app.put('/feed/:id', auth, multer, postCtrl.updatePost),
    app.delete('/feed/:id', auth, multer, postCtrl.deletePost),
    // Like
    app.post('/feed/:id/like', auth, apiLimiter, postCtrl.likePost),
    // Comment
    app.post('/feed/:id/comment', auth, apiLimiter, postCtrl.commentPost),
    app.delete('/feed/comment/:id', auth, postCtrl.deleteComment)
}
