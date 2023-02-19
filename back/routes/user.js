// Importation d'express + routage
const express = require('express');
const router = express.Router();

// Importation du middleware password
const password = require("../middleware/password");

// Importation des controllers utilisateur
const userCtrl = require('../controllers/user')

// Declaration des routes
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du model
module.exports = router;