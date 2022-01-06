const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const passwordValidator = require('password-validator');
const user = require('../routes/user');
const passwordSchema = new passwordValidator();
passwordSchema
.is().min(8)                                    
.is().max(20)                                   
.has().uppercase()                              
.has().lowercase()                              
.has().digits(1)                                
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123', 'motdepasse1', 'motdepasse123', 'Motdepasse123!']); 



/* ------------------------------- Controller USER ------------------------------- */

exports.signup = async (req, res) => {
    try {
        // Vérifie si l'e-mail a déjà été enregistré
        const user = await User.findOne({
            where: { email: req.body.email }
        });
        // Si l'email de l'utilisateur existe déjà dans la base de données, renvoie un message d'erreur
        if (user !== null) {
            return res.status(400).json({ error: 'Cette adresse mail est déjà utilisé.'});
        }
        // Si l'email de l'utilisateur n'existe pas encore, passe à la validation du mot de passe
        else {
            // Si le mot de passe est valide, crée un nouveau compte utilisateur et un token
            if (passwordSchema.validate(req.body.password)) {
                const hash = await bcrypt.hash(req.body.password, 10);
                const newUser = await User.create({
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    email: req.body.email,
                    password: hash,
                    isAdmin: false,
                });
                res.status(201).json({
                    user: newUser,
                    token: jwt.sign(
                        { userEmail: newUser.email }, 
                        'RANDOM_SECRET_TOKEN', 
                        { expiresIn: '24h'}
                    ),
                    message: 'Votre inscription a bien été prise en compte !'
                });
            }
            // Si le mot de passe n'est pas valide, renvoie un message d'erreur
            else {
                res.status(400).json({
                    message: 'Le format de votre mot de passe est incorrect.'
                });
            };
        };
        
    }
    catch (error) {
        res.status(400).json({
            error
        });
    };
};


exports.login = async (req, res) => {
    try {
        // Vérifie si l'e-mail a déjà été enregistré
        const user = await User.findOne({
            where: { email: req.body.email }
        });
        // Si l'email de l'utilisateur n'existe pas dans la base de données, renvoie un message d'erreur
        if (!user) {
            return res.status(401).json({ error: 'Cette adresse mail n\'est pas encore enregistré !'});
        }
        // Si l'email de l'utilisateur existe déjà dans la base de données,
        else {
            // Compare les mots de passe d'entrée et de la base de données
            const hash = await bcrypt.compare(req.body.password, user.password);
            // Si les mots de passe ne correspondent pas, renvoie un message d'erreur
            if (!hash) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // Si les mots de passe correspondent, crée un token
            else {
                return res.status(200).json({
                    user: user,
                    token: jwt.sign(
                        { userEmail: user.email }, 
                        // { userEmail: user.email, admin: user.isAdmin }, test frontend admin page
                        'RANDOM_SECRET_TOKEN', 
                        { expiresIn: '24h'}
                    ),
                    message: 'Connecté avec succès !'
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    };       
};


exports.getAccount = async (req, res) => {
    try { 
        const user = await User.findOne({
            where: { id: req.params.id }
        });
        res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }
};


exports.updateAccount = async (req, res) => {  
    let updatedUser = {};
    req.file ? (
        User.findOne({ where: { id: req.params.id } })
            .then((user) => {
                const filename = user.photo.split('/images/')[1]
                fs.unlinkSync(`images/${filename}`)   
            }),
            updatedUser = {
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
    ) : (updatedUser = { 
            lastName: req.body.lastName,
            firstName: req.body.firstName,
        })
    User.update(updatedUser, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ 
            user: updatedUser,
            message: 'Votre profil a bien été modifié'
        }))
        .catch(error => res.status(400).json({ error: 'update error - check user controller [user.update]'}));
};


exports.deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id: id } });
        if (user.photo !== null) {
            const filename = user.photo.split('/images')[1]
            fs.unlinkSync(`images/${filename}`)  
            User.destroy({ where: { id: id } });
            res.status(200).json({ message: "utilisateur supprimé" });
        } 
        else {
            User.destroy({ where: { id: id } });
            res.status(200).json({ message: "utilisateur supprimé" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }
};



/* ------------------------------- Controller ADMIN ------------------------------- */

exports.getAllUsers = async (req, res) => {
    try { 
        const users = await User.findAll()
        res.status(200).send(users);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }
};


exports.updateAdmin = async (req, res) => {
    let updatedUser = {};
    const user = await User.findOne({ where: { id: req.body.user_id } });
    if (user.isAdmin == false) {
        updatedUser = { isAdmin: true }
    } 
    else if (user.isAdmin == true) {
        updatedUser = { isAdmin: false }
    }    
    User.update(updatedUser, { where: { id: req.body.user_id } })
        .then(() => res.status(200).json({ 
            user: updatedUser,
            message: 'Votre profil a bien été modifié'
        }))
        .catch(error => res.status(400).json({ error: 'Erreur du serveur' }));
};


exports.deleteUser = async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user.photo !== null) {
        const filename = user.photo.split('/images')[1];
        fs.unlinkSync(`images/${filename}`);  
        User.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "utilisateur supprimé" });
    } 
    else {
        User.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "utilisateur supprimé" });
    }
};