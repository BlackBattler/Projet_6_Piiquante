// Importation de la DB mongoose
const mongoose = require('mongoose');

// Plugin de mongoose pour les erreurs
const mongooseErrors = require('mongoose-errors');

// Schema de des erreurs
const errorSchema = mongoose.Schema({
    requireField: { type: String, required: true }
});

errorSchema.plugin(mongooseErrors);

module.exports = mongoose.model('AllErrors', errorSchema);
