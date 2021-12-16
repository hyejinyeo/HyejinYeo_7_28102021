const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config-post");


/* Router pour POST */
module.exports = (app) => {
    app.get('/feed', auth, postCtrl.getAllPosts),
    app.post('/feed', auth, multer, postCtrl.createPost)
}
