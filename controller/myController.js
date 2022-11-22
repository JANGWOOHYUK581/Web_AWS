const mainModel = require('../models/mainModel');
const moment = require('moment');

/* 마이페이지 */
exports.myPageView = (req,res)=>{
    mainModel.find({},(err,mains)=>{
        res.render('MyPage/myPageView',{
            mains : mains, 
            moment : moment,
            params : req.params
        });
    });
};

/* 주문내역 */
exports.orderPage = (req,res)=>{
    mainModel.find({},(err,mains)=>{
        res.render('MyPage/orderPage',{
            mains : mains, 
            moment : moment,
            params : req.params
        });
    });
};
