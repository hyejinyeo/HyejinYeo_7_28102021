const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

const passwordValidator = require('password-validator');
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
            return res.status(400).json({ error: 'Cet email est déjà utilisé'});
        }
        // If the user email does not exist yet, move on to the password validation
        else {
            // If the password is valid, create a new user account
            if (passwordSchema.validate(req.body.password)) {
                const hash = await bcrypt.hash(req.body.password, 10);
                const newUser = await User.create({
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    email: req.body.email,
                    password: hash,
                    isAdmin: false,
                });
                // Create a token
                res.status(201).json({
                    // user, token, expires to be added
                    // user: newUser,
                    // token: 'TOKEN', jwt.sign({ userEmail: newUser.email }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h'})
                    // expires: 
                    message: 'Votre inscription a bien été prise en compte !'
                });
         
                
            }
            // If the password is not valid, return an error message
            else {
                res.status(400).json({
                    message: 'Format de mot de passe incorrect !'
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

// Tester controller
exports.userlist = (req, res) => {
    return res.status(201).json({
        message: 'API works!'
    });
};

// Se connecter
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        });
        // works until here 
        return res.status(201).json({
            user
        })
    
        // // If the user email already exists in the database, return an error message
        // if (user === null) { 
        //     return res.status(401).json({ error: 'Cet email n\'est pas enregistré !'});
        // }
        // // // If the user email does not exist yet, move on to the password validation
        // else {
        //     const hash = await bcrypt.compare(req.body.password, user.passwword);
        //     if (!hash) {
        //         return res.status(401).json({ error: "Mot de passe incorrect !" });
        //     }
        //     else {
        //         return res.status(200).json({
        //             user: user,
        //             // token: jwt.sign(
        //             //     { userEmail: user.email }, 
        //             //     'RANDOM_TOKEN_SECRET', 
        //             //     { expiresIn: '24h'}
        //             // ),
        //             message: 'Bonjour ' + user.firstName + '!'
        //         });
        //     };
        // };
    }
    catch (error) {
        return res.status(500).json({ error: "Erreur serveur" });
    }
    
           
};

// Modifier le profil


