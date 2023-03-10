// Importation de la DB mongoose
const mongoose = require('mongoose');
const mongoDBErrorHandler = require('mongoose-mongodb-errors');

// Schema de nos sauces
const sauceSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    manufacturer: { type: String, require: true },
    description: { type: String, require: true },
    mainPepper: { type: String, require: true },
    imageUrl: { type: String, require: true },
    heat: { type: Number, require: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: Array },
    usersDisliked: { type: Array }
});

sauceSchema.plugin(mongoDBErrorHandler);


// Exportation du schema
module.exports = mongoose.model('Sauce', sauceSchema);
