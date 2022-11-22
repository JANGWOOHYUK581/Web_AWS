const express = require('express');
const router = express.Router();
const boardController = require('../controller/boardController');
const boardUtil = require('../utils/boardUtil');
const utilController = require('../controller/utilController');

//게시글 전체 목록
router.get('/',boardController.boardList);
//게시글 목록
router.get('/:bbsGroup',boardController.boardList);
//게시글 입력폼
router.get('/:bbsGroup/new',boardController.boardNew);
//게시글 작성
router.post('/:bbsGroup',
    utilController.fileUpload,       // 첨부파일 파일업로드
    utilController.validate,         // 폼 데이터 유효성검증
    boardController.boardSave   // 폼 데이터 저장
);
//게시글 수정폼
router.get('/:bbsGroup/:bbsId/edit',boardController.boardEdit);
//게시글 상세
router.get('/:bbsGroup/:bbsId',boardController.boardDetail);
//게시글 수정
router.put('/:bbsGroup/:bbsId',utilController.fileUpload,utilController.validate,boardController.boardUpdate);
//게시글 삭제
router.delete('/:bbsGroup/:bbsId',boardController.boardDelete);

module.exports = router;