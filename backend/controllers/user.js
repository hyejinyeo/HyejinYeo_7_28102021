const User = require('../models/User');

app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });


module.exports = {
    // async signup (req, res) {
    //     try {
    //     const user = await User.create(req.body)
    //     res.send(user.toJSON())
    //     }
    //     catch(err) {
    //         res.status(400).send({
    //             error: 'This email account is already in use.'
    //         })
    //     }
    // }
    signup (req, res) {
        res.send({
            message: `Hello ${req.body.firstName}, this is Groupomia's internal messenger`
        })
    }
}






/* ------------------------------------------------------------------------------------------------- */


// const bcrypt = require('bcrypt');



// // Importer le modèle User
// const User = require('../models/User');



// /* Controller pour USER */
// // S'inscrire
// exports.signup = (req, res, next) => {
    
//     console.log(`Hello ${req.body.firstName}, Welcome to Groupomania !`)
    
//     // bcrypt.hash(req.body.password, 10)
//     //     .then(hash => {
//     //         const user = new User ({
//     //             lastName: req.body.lastName,
//     //             firstName: req.body.firstName,
//     //         })
//     //     })
//     //     .catch(error => res.status(500).json({ error }));
// };


// // Se connecter
// exports.login = (req, res, next) => {

// };

// // Modifier le profil


