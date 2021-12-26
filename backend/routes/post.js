const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config-post");


/* Router pour POST */
module.exports = (app) => {
    app.get('/feed', auth, postCtrl.getAllPosts),
    app.get('/feed/:id', auth, postCtrl.getPostById),
    app.post('/feed', auth, multer, postCtrl.createPost),
    app.put('/feed/:id', auth, multer, postCtrl.updatePost),
    app.delete('/feed/:id', auth, postCtrl.deletePost),
    app.post('/feed/:id/like', auth, postCtrl.likePost)
}
