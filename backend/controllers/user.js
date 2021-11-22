// const db = require("../models");
const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;


/* Controller pour USER */
// S'inscrire
exports.signup = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        });
        console.log(user)
        // If the user email already exists in the database
        if (user !== null) {
            return res.status(400).json({ error: 'This email has already been used.'});
        }
        else {
            const newUser = await User.create({
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false,
            });
            res.status(201).send({
                message: 'Your account has been successfully created!'
            });
        }

        
    }
    catch (error) {
        console.log(error)
        res.status(400).send({
            
        });
    }
};



// Se connecter


// Modifier le profil


