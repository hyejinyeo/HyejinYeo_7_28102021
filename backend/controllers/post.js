const db = require('../models');
const Post = db.Post;
const User = db.User;
const Like = db.Like;
const Op = db.Sequelize.Op;

const fs = require('fs');


/* Controller POST */
exports.getAllPosts = async (req, res) => {
    console.log('gellAllPosts controller starts')
    try {
        console.log('try finding posts')
        const posts = await Post.findAll({
            attributes: ['id', 'imageUrl', 'giphyUrl', 'link', 'message', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['id', 'lastName', 'firstName', 'photo']
                }, 
                {
                    model: Like,
                    attributes: ['user_id'],
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: User,
                            attributes: ['lastName', 'firstName']
                        },
                    ]
                }
                // {
                //     model: Comment,
                //     attributes: ['user_id', 'message'],
                //     order: [['createdAt', 'DESC']],
                    // include: [
                    //     {
                    //         model: User,
                    //         attributes: ['lastName', 'firstName', 'photo']
                    //     },
                    // ]

                // },      
            ]    
        });
        console.log('found posts, return them to frontend')
        res.status(200).send(posts);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }
};


exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'imageUrl', 'giphyUrl', 'link', 'message', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'lastName', 'firstName', 'photo']
                }
            ]    
        });
        res.status(200).send(post);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }
};


// test message: Bienvenue sur le réseau social de GROUPOMANIA 😘

exports.createPost = async (req, res) => {
    try {
        const user = await User.findOne({ 
            attributes: ['id', 'lastName', 'firstName', 'photo'],
            where: { id: req.body.userId } 
        });
        if (user !== null) {
            let imageUrl, giphyUrl, link;
            if (req.file) {
                imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
            } else { imageUrl = null; }
            if (req.body.giphyUrl != null) {
                giphyUrl = req.body.giphyUrl
            } else { giphyUrl = null }
            if (req.body.link != null) {
                link = req.body.link
            } else { link = null; }

            const newPost = await Post.create({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'lastName', 'firstName', 'photo']
                    },
                ],
                imageUrl: imageUrl,
                giphyUrl: giphyUrl,
                link: link,
                message: req.body.message,
                user_id: user.id
            })
            res.status(201).json({
                post: newPost
            });
        }
        else {
            res.status(400).json({
                error: 'Nous ne vous trouvons pas dans notre base de données.'
            })
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }
};


exports.updatePost = async (req, res) => {
    try {
        // let newImageUrl, newGiphyUrl, newLink, newMessage;
        let newImageUrl;
        let post = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'imageUrl', 'giphyUrl', 'link', 'message', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'lastName', 'firstName', 'photo']
                }
            ]    
        });
        if (post !== null) {
            // imageUrl
            if (req.body.imageUrl == "null") {
                console.log('imageUrl null')
                if (post.imageUrl) {
                    const filename = post.imageUrl.split('/uploads')[1]
                    fs.unlinkSync(`uploads/${filename}`)
                    console.log(`uploads/${filename}`);
                }
                post.imageUrl = null;
            }
            if (req.file) {
                console.log('reqfile rempli')
                if (post.imageUrl) {
                    console.log(post.imageUrl)
                    const filename = post.imageUrl.split('/uploads')[1]
                    fs.unlinkSync(`uploads/${filename}`)
                    console.log(`uploads/${filename}`);
        
                }
                newImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
                post.imageUrl = newImageUrl;
            }
            // giphyUrl
            if (req.body.giphyUrl == "null") {
                post.giphyUrl = null;
            } else { post.giphyUrl = req.body.giphyUrl; }
            // link
            if (req.body.link == "null") {
                post.link = null;
            } else { post.link = req.body.link; }
            // message
            if (req.body.message) {
                post.message = req.body.message;
            }

            const updatedPost = await post.save({
                fields: ['imageUrl', 'giphyUrl', 'link', 'message']
            });
            res.status(200).json({
                post: updatedPost
            });
        }
        else {
            res.status(400).json({
                error: 'Nous ne trouvons pas cette publication dans notre base de données.'
            })
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }     
};


exports.deletePost = async (req, res) => {
    console.log('delete controller starts')
    try {
        let post = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'imageUrl', 'giphyUrl', 'link', 'message', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'lastName', 'firstName', 'photo']
                }
            ]    
        });
        if (post.imageUrl) {
            const filename = post.imageUrl.split('/uploads')[1]
            fs.unlinkSync(`uploads/${filename}`)
        }
        post.destroy();
        res.status(200).json({ message: 'Post supprimé'}) 
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }     
}


/* Controller LIKE */
exports.likePost = async (req, res) => {
    console.log('likePost Controller starts')
    console.log(req.body.user_id);
    console.log(req.body.post_id)

    try {
        const userId = req.body.user_id
        console.log('ctrl userId :' + userId);
        const postId = req.body.post_id
        console.log('ctrl postId :' + postId);

        console.log('find like from BDD');
        const alreadyLiked = await Like.findOne({
            where: { user_id: userId, post_id: postId },
            attributes: ['id', 'user_id', 'post_id']
        });
        console.log('findLike done. Conditional statement starts')
        if (alreadyLiked) {
            await Like.destroy(
                { where: { user_id: req.body.user_id, post_id: req.body.post_id } },
                { truncate: true, restartIdentity: true }
            );
            res.status(200).json({ message: 'like annulé'})
        } else {
            // await Like.create({
            //     user_id: req.body.user_id,
            //     post_id: req.body.post_id
            // });

            const newLike = await Like.create({
                // include: [
                //     {
                //         model: User,
                //         attributes: ['id', 'lastName', 'firstName']
                //     },
                //     {
                //         model: Post,
                //         attributes: ['id']
                //     },
                // ],
                user_id: req.body.user_id,
                post_id: req.body.post_id
            });
            res.status(201).json({ like: newLike });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }   
}



// exports.getAllLikes = async (req, res) => {
//     try {
//         console.log('get')
//     }
//     catch (error) {
//         return res.status(500).json({ error: 'Erreur du serveur' });
//     }   
// }

/* Controller COMMENT */