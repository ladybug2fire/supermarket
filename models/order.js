var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

    var GoodSchema = new Schema({
        goodname: { type: String },
        goodid: String,
        picUrl: { type: String },
        price: { type: Number },
        count: {type: Number}, // 数量
        desc: {type: String},
    });
    
    var OrderSchema = new Schema({
        goods: [GoodSchema],
        price: { type: Number },
        addTime: {type: String}, // 添加时间
        userid: String,
        username: {type: String},
    });
module.exports = mongoose.model('Order',OrderSchema);