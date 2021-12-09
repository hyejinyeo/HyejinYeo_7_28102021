const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
// const auth = require("../middleware/auth");

const passwordValidator = require('password-validator');
const user = require("../routes/user");
const passwordSchema = new passwordValidator();
passwordSchema
.is().min(8)                                    
.is().max(20)                                   
.has().uppercase()                              
.has().lowercase()                              
.has().digits(1)                                
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123', 'motdepasse1', 'motdepasse123']); 



/* Controller pour USER */

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


// Modifier le profil
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
}


exports.updateAccount = async (req, res) => {  
    // email unique validator to be added 
    

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
    
    

    // try {
    //     // Check if the email has been already registered
    //     const user = await User.findOne({
    //         where: { email: req.body.email }
    //     });
    //     // If the user email already exists in the database, return an error message
    //     if (user !== null) {
    //         return res.status(400).json({ error: 'Cette adresse mail est déjà utilisé.'});
    //     }
    //     // If the user email does not exist yet, move on to profil update
    //     else {
    //         let updatedUser = {};
    //         req.file ? (
    //             User.findOne({ where: { id: req.params.id } })
    //                 .then((user) => {
    //                     const filename = user.photo.split('/images/')[1]
    //                     fs.unlinkSync(`images/${filename}`)   
    //                 }),
    //                 updatedUser = {
    //                     lastName: req.body.lastName,
    //                     firstName: req.body.firstName,
    //                     email: req.body.email,
    //                     photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //                 }
    //         ) : (updatedUser = { 
    //                 lastName: req.body.lastName,
    //                 firstName: req.body.firstName,
    //                 email: req.body.email,
    //             })
    //         User.update(updatedUser, { where: { id: req.params.id } })
    //             .then(() => res.status(200).json({ 
    //                 user: updatedUser,
    //                 message: 'Votre profil a bien été modifié'
    //             }))
    //             .catch(error => res.status(400).json({ error: 'update error - check user controller [user.update]'}));
    //     };            
    // }
    // catch (error) {
    //     console.log(error);
    //     res.status(400).json({
    //         error
    //     });
    // };

    


    // const id = req.params.id;
    // try {
    //     const userEmail = token.userEmail(req);
    //     let newPhoto
    //     // Find the user from database
    //     let user = await User.findOne({
    //         where: { id: req.params.id }
    //     })
    //     if (userEmail === user.email) {
    //         if (req.file && user.photo) {
    //             const filename = user.photo.split('/images/')[1]
    //             fs.unlinkSync(`images/${filename}`)
    //             newPhoto = `${req.protocol}://${req.get("host")}/api/images/${req.file.name}`;
    //         }
    //         else if (req.file) {
    //             newPhoto = `${req.protocol}://${req.get("host")}/api/images/${req.file.name}`;
    //         }
    //         console.log('photo registered')
    //         // let updatedUser = {
    //         //     lastName: req.body.lastName,
    //         //     firstName: req.body.firstName,
    //         //     email: req.body.email,
    //         //     photo: newPhoto
    //         // }
    //         // console.log(updatedUser)
    //         // User.update(updatedUser, { where: { id: id } } );
    //         // res.status(200).json({
    //         //     user: updatedUser,
    //         //     message: "Votre profil a bien été modifié",
    //         // });
    //     }
    //     else {
    //         res.status(400).json({ error: 'temporary update error eeeeeeee'})
    //     }
        
        // trial 
        



    // ESTELLE ROSE
    // try {
    //     // const userEmail = token.userEmail(req);
    //     // Find the user from database
    //     let user = await User.findOne({
    //         where: { id: req.params.id }
    //     })
    //     // trial 
    //     .then((user) => {
    //         if (req.file && user.photo) {
    //             const filename = user.photo.split('/images/')[1]
    //             fs.unlinkSync(`images/${filename}`)
    //             let newPhoto = `${req.protocol}://${req.get("host")}/api/images/${req.file.name}`;
    //         }
    //         else if (req.file) {
    //             let newPhoto = `${req.protocol}://${req.get("host")}/api/images/${req.file.name}`;
    //         }
    //         let updatedUser = {
    //             lastName: req.body.lastName,
    //             firstName: req.body.firstName,
    //             email: req.body.email,
    //             photo: newPhoto
    //         }
    //         user.update(updatedUser, { where: { id: req.params.id } })
    //             .then((updated) => {
    //                 if (updated) {
    //                     res.status(200).json({
    //                         user: updatedUser,
    //                         message: 'changes successfully updated'
    //                     })
    //                 }
    //                 else {
    //                     res.status(400).json({ error: 'temporary update error status code to be modified'})
    //                 }
    //             })
    //     })
    //     .catch((error) => {
    //         res.status(400).json({ error: 'temporary controller error status code to be modified'})
    //     })




        // Compare user email of token and the one of database
        // if (userEmail === user.email) {
        //     // Change photo
        //     if (req.file && user.photo) {
        //         const filename = user.photo.split('/images/')[1]
        //         fs.unlinkSync(`images/${filename}`)
        //         let newPhoto = `${req.protocol}://${req.get("host")}/api/images/${req.file.name}`;
        //     }
        //     // Add a photo for the first time
        //     else if (req.file) {
        //         let newPhoto = `${req.protocol}://${req.get("host")}/api/images/${req.file.name}`;
        //     }
        //     if (newPhoto) {
        //         user.photo = newPhoto;
        //     }
        //     if (req.body.lastName) {
        //         user.lastName = req.body.lastName;
        //     }
        //     if (req.body.firstName) {
        //         user.firstName = req.body.firstName;
        //     }
        //     if (req.body.email) {
        //         user.email = req.body.email;
        //     }
        //     const updatedUser = await user.save({ fields: ["lastName", "firstName", "email", "photo"] });
        //     res.status(200).json({
        //         user: updatedUser,
        //         message: 'changes successfully updated'
        //     });
        // }
        // // If user emails doe not correspond each other
        // else {
        //     res.status(400).json({ error: 'Vous n\'avez pas les droits requis'});
        //     console.log('error level controller');
        // }
    // }
    // catch (error) {
    //     return res.status(500).json({ error: 'Erreur du serveur - controller' });
    // }
    // // ESTELLE 

}

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where: { id: id }
        });
        // S'il y a une photo d'utilisateur, on la supprime 
        if (user.photo !== null) {
            //delete user photo
            const filename = user.photo.split('/images/')[1]
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
}