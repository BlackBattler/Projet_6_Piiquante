// Importatio de jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // On recupe le token
        const token = req.headers.authorization.split(' ')[1];

        // Decodage entre le token recuperer et la cle secrete
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        // Extraction de l'id utilisateur de notre token et le rajouter a l'objet Request 
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error })
    }
};