require("dotenv").config();

// Utilisation de bcrypt pour le cryptage de mot de passe
const bcrypt = require('bcrypt');

// Utilisation de jsonwebtoken pour la gestion de l'authentification securisee
const jwt = require('jsonwebtoken');

// Importation du model User
const User = require('../models/User');

// Creation d'un nouveau compte
exports.signup = (req, res, next) => {
    //  Crypter le mot de passe 10 fois
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Cree un nouvel utilisateur avec le mot de passe crypte
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Sauvegarde le nouvel utlisateur dans la DB
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur cree' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Connexion au compte
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            // Verifie si l'utilisateur existe dans la DB
            if (!user) {
                res.status(401).json({ message: 'Identifiant ou mot de passe incorrecte' });
            } else {
                // compare le mot de passe entré par l'utilisateur avec le hash enregistré dans la DB
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Identifiant ou mot de passe incorrecte' });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                // Fonction sign de jwt (payload, cle secrete de l'encodage, expiration)
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.token,
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};