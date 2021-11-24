const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
        const userEmail = decodedToken.userEmail;
        if (req.body.userEmail && req.body.userEmail !== userEmail) {
            throw 'User email non valable !';
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            error: error | 'Request non authentified' 
        })
    }
};


// function issueToken(user) {
//     const id = user.email;
//     const expiresIn = '24h';
//     const payload = {
//         sub: id,
//         iat: Date.now()
//     }
//     const newToken = jwt.sign(payload, 'SECRET_TOKEN', { expiresIn: expiresIn});
//     return {
//         token: "Bearer " + newToken,
//         expires: expiresIn
//     };
// }


// module.exports.issueToken = issueToken;