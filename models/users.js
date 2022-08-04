const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
    username: { type: String, lowercase: true},
    password: { type: String},
    
    google: [{
        googleId: { type: String},
        displayName: { type: String},
        firstName: { type: String},
        lastName: { type: String},
        image: { type: String},
    }]
});

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.compare = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);