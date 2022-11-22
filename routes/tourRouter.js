'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controller/tourController');

//주문 페이지
router.get('/order', controller.order);
//소개 페이지
router.get('/info', controller.info);
//주문 저장
router.post('/order', controller.orderSave);


module.exports = router;