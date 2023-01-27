// Importation de multer pour la gestion des images
const multer = require('multer');

// Format d'images
const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    // Fonction qui indique a multer d'enregistrer les fichiers dans le dossier 'images'
    destination: (req, file, callback) => {
        callback(null, 'images');
    },

    // Fonction qui modifie les noms des fichiers images pour les rendres uniques
    filename: (req, file, callback) => {

        // Remplace les espaces par des underscores
        const name = file.originalname.split(' ').join('_');

        // Definir une extension pour les images
        const extension = MIME_TYPE[file.mimetype];

        // Renomme le fichier en ajoutant un 'timestamp pour le rendre unique
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exportation du module
module.exports = multer({ storage }).single('image');