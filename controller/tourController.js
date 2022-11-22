'use strict'
const orderModel = require('../models/orderModel');

exports.order = (req, res) => {
    console.log('order');
    res.render('tour/tourOrder');
};

exports.info = (req, res) => {
    console.log('info');
    res.render('tour/tourInfo');
};

exports.orderSave = (req, res) => {
    console.log('oderSave');

    console.log('params : ', req.body);
    const reqBody = {
        NAME: req.body.NAME,
        Mail: req.body.Mail,
        Phonenumber: req.body.Phonenumber,
        tourday: req.body.tourday,
        City: req.body.City
    };

    const order = new orderModel(reqBody);
    order.save()
        .then((result) => {
            res.redirect('/tour/info');
        }).catch((err) => {
            console.log(err);
        });
}