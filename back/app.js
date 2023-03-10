// Importation de package
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config();

// Importation des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Appel de l'application express
const app = express();

// Connexion a MongoDB
mongoose.connect(process.env.mongoosePW,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Met en disposition le body directement sur l'objet req (dans req.body)
app.use(express.json());

// Gestion des erreurs CORS ( Cross Origin Resource Sharing )
// middleware permettant a l'application d'acceder a l'API 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Appel des routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exportation
module.exports = app;
