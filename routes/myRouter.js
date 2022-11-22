const express = require('express');
const router = express.Router();
const myController = require('../controller/myController');


//마이페이지
router.get('/',myController.myPageView);

//주문내역
router.get('/orderPage',myController.orderPage);


module.exports = router;