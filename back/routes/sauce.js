// Importation d'express + routage
const express = require('express');
const router = express.Router();

// Importation du middleware d'authentification token
const auth = require('../middleware/auth');

// Importation des controllers sauce
const sauceCtrl = require('../controllers/sauce');

// Declaration des routes
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);


// Exportation du module
module.exports = router;