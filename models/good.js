var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var GoodSchema = new Schema({
    goodname: { type: String },
    picUrl: { type: String },
    addTime: {type: String},
    price: Number,
    status: Number,
    amount: Number,
    desc: {type: String},
});

module.exports = mongoose.model('Good',GoodSchema);