// Importation de password-validator
const passwordValidator = require("password-validator");

// Creation du schema
const passwordSchema = new passwordValidator;

// le schema que le mot de passe doit respecter
passwordSchema
.is().min(5)                                    // Minimum length 5
.is().max(100)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase(1)                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// Verification de la qualite du mot de passe par rapport au schema
module.exports = (req, res, next) =>{
    if(passwordSchema.validate(req.body.password)){
        next();
    } else{
        return res.status(400).json({message :"Mot de passe est trop faible : " + passwordSchema.validate('req.body.password', {list: true })})
    }
}