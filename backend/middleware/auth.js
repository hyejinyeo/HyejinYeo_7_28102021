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
            error: 'Request non authentifié' 
        })
    }
};
