const mainModel = require('../models/mainModel');
const moment = require('moment');

/* 메인화면 */
exports.mainView = (req,res)=>{
    mainModel.find({},(err,mains)=>{
        res.render('main/mainView',{
            mains : mains, 
            moment : moment,
            params : req.params
        });
    });
};

exports.choicePage = (req,res)=>{
    mainModel.findOne({world: req.params.world},(err,world)=>{
        res.render('main/choicePage',{
            world : world, 
            moment : moment,
            params : req.params
        });
    });
};