const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const main = new mongoose.Schema({
    mainId : {type : Number , required : true},
    world : {type: String, required : true}
});


main.plugin(autoIncrement.plugin,{
    model : 'mains',
    field : 'mainId',
    world : 'world',
    startAt : 1,
    increment : 1
});

module.exports = mongoose.model("mains",main);