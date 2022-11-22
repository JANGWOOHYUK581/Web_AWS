const express = require('express');
const router = express.Router();
const utilController = require('../controller/utilController');


//파일 업로드
router.get('/fileUpload',utilController.fileUpload);

// 파일 다운로드
router.get('/fileDown/:id',utilController.fileDownload);




module.exports = router;
