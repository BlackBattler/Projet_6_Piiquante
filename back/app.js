// Importation de package
const express = require('express');
const mongoose = require('mongoose');

// Importation des routes
const userRoutes = require('./routes/user')
const sauceroutes = require('./routes/sauce');

// Appel de l'application express
const app = express();

// Connexion a MongoDB
mongoose.connect('mongodb+srv://Battler:1234@cluster0.9rncfqu.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Met en disposition le body directement sur l'objet req (dans req.body)
app.use(express.json());

// Gestion des erreurs CORS ( Cross Origin Resource Sharing )
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Appel des routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceroutes);

// Exportation
module.exports = app;
