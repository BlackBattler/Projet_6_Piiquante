// Importation de la DB mongoose
const mongoose = require('mongoose');

// Plugin de mongoose pour les erreurs
const mongooseErrors = require('mongoose-errors');

// Schema de des erreurs
const errorSchema = mongoose.Schema({
    requireField: { type: String, required: true }
});

errorSchema.plugin(mongooseErrors);

Model = mongoose.model('AllErrors', errorSchema);

Model
    .create(test)
    .catch(error => {
        console.log(error.statusCode);
        // print 400 which is http bad request error code
        done();
    });