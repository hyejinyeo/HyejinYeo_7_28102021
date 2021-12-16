const db = require('../models');
const Post = db.Post;
const User = db.User;
const Op = db.Sequelize.Op;

const fs = require('fs');

/* Controller pour USER */
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'imageUrl', 'giphyUrl', 'link', 'message', 'createdAt'],
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['id', 'lastName', 'firstName', 'photo']
                }
            ]    
        });
        res.status(200).send(posts);
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


