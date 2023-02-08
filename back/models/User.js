// Importation de mongoose
const mongoose = require('mongoose');

// Plugin pour utilisation unique d'un email
const uniqueValidator = require('mongoose-unique-validator');

// Schema de l'utilisateur
const userShema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

userShema.plugin(uniqueValidator);

// Exportation du schema
module.exports = mongoose.model('User', userShema);
