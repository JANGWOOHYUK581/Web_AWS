const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const board = new mongoose.Schema({
    bbsId : {type : Number , required : true},
    bbsGroup : {type : String, required : true},
    bbsTitle : {type : String, required : true},
    bbsContent : {type : String, required : true},
    bbsWriteSno : {type : String},
    bbsWriteId : {type : String},
    bbsRegDate : {type : Date, default : Date.now},
    bbsUpdDate : {type : Date, default : Date.now},
    filePath : {type : String},
    fileNm : {type : String},
    bbsViewCnt : {type : Number, default : 0}
});

board.plugin(autoIncrement.plugin,{
    model : 'boards',
    field : 'bbsId',
    startAt : 1,
    increment : 1
});

module.exports = mongoose.model("boards",board);