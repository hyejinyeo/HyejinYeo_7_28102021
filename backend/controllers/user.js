const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
// const auth = require("../middleware/auth");

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
.is().not().oneOf(['Passw0rd', 'Password123', 'motdepasse1', 'motdepasse123']); 



/* Controller USER */

// S'inscrire
exports.signup = async (req, res) => {
    try {
        // Check if the email has been already registered
        const user = await User.findOne({
            where: { email: req.body.email }
        });
        console.log(user);
        // If the user email already exists in the database, return an error message
        if (user !== null) {
            return res.status(400).json({ error: 'Cette adresse mail est déjà utilisé.'});
        }
        // If the user email does not exist yet, move on to the password validation
        else {
            // If the password is valid, create a new user account and create a new token
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
            // If the password is not valid, return an error message
            else {
                res.status(400).json({
                    message: 'Le format de votre mot de passe est incorrect.'
                });
            };
        };
        
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error
        });
    };
};


// Se connecter
exports.login = async (req, res) => {
    try {
        // Check if the email has been already registered
        const user = await User.findOne({
            where: { email: req.body.email }
        });
        // If the user email does not exist yet, return an error
        if (!user) {
            return res.status(401).json({ error: 'Cette adresse mail n\'est pas encore enregistré !'});
        }
        // If the user email exists,
        else {
            const hash = await bcrypt.compare(req.body.password, user.password);
            if (!hash) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
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


// Trouver un utilisateur du BDD par son id
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


// temporary
exports.getAllAccounts = async (req, res) => {
    try { 
        const users = await User.findAll()
        res.status(200).send(users);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur du serveur' });
    }
}


// Modifier son profil
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
                // email: req.body.email,
                photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
    ) : (updatedUser = { 
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            // email: req.body.email,
        })
    User.update(updatedUser, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ 
            user: updatedUser,
            message: 'Votre profil a bien été modifié'
        }))
        .catch(error => res.status(400).json({ error: 'update error - check user controller [user.update]'}));
};


// Supprimer son compte
exports.deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where: { id: id }
        });
        // S'il y a une photo d'utilisateur, on la supprime 
        if (user.photo !== null) {
            //delete user photo
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