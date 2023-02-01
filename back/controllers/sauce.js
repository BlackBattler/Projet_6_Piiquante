// Importation du model Sauce
const Sauce = require('../models/Sauce');
const fs = require('fs');

// Renvoie un tableau de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Renvoie la sauce avec l'_id fourni
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Creation d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

    // Supprime l'ID car celui-ci va etre genere automatiquement par notre DB
    delete sauceObject._id;
    delete sauceObject._userId;

    const sauce = new Sauce({
        // Copie le body de la requete dans New Sauce
        ...sauceObject,

        // Ajoute l'user ID grace au middleware auth
        userId: req.auth.userId,

        // Genere l'URL de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

        // Initialise les 'likes' et les 'dislikes' a 0
        likes: 0,
        dislikes: 0
    });

    // Sauvegarde la sauce
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistree' }))
        .catch(error => res.status(400).json({ error }));
};

// Modification de la sauce
exports.modifySauce = (req, res, next) => {
    //
    const updateSauce = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    //
    delete updateSauce._userId;

    // 
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Verifie si l'utilisateur est le propriétaire de la sauce cree
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorise' })
            } else {
                Sauce.updateOne({ _id: req.params.id }, { ...updateSauce, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce modifie' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// Suppression de la sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Verifie si l'utilisateur est le propriétaire de la sauce cree
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorise' })
            } else {
                // Supprime le fichier du server
                const filename = sauce.imageUrl.split('/images/')[1];
                // Fonction unlink de fs nous permet de supprimer le fichier
                fs.unlink(`images/${filename}`, () => {
                    // Suppression de la sauce via son ID
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce supprimee' }))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// Gestion des 'likes'
exports.likeSauce = (req, res, next) => {

    Sauce.findOne({ _id: req.params.id })
        .then()
        .catch(error => res.status(500).json({ error }));
};
