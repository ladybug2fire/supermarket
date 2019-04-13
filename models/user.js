var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    email: {type: String },
});

module.exports = mongoose.model('User',UserSchema);