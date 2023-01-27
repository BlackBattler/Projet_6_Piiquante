// Importation d'express + routage
const express = require('express');
const router = express.Router();

// Importation des controllers utilisateur
const userCtrl = require('../controllers/user')

// Declaration des routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du model
module.exports = router;