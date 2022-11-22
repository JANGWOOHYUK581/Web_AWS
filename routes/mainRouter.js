const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');


//메인화면
router.get('/',mainController.mainView);

router.get('/choicePage',mainController.choicePage);

module.exports = router;