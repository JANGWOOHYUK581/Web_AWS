const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    NAME: { type: String },
    Mail: { type: String },
    phonenumber: { type: String },
    tourday: { type: String },

    City: { type: String }
});
module.exports = mongoose.model('orders', orderSchema);