const boardModel = require('../models/boardModel');
const moment = require('moment');

/*게시글 목록*/
exports.boardList = (req,res)=>{
    boardModel.find({},(err,boards)=>{
        res.render('boards/boardList',{
            boards : boards, 
            moment : moment,
            params : req.params
        });
    }).sort({'bbsRegDate' : -1});
};

/*게시글 생성*/
exports.boardNew = (req,res)=>{
    let body = req.flash('body')[0];
    let err = req.flash('errors')[0];

    if(!err){
        err = '';
    }
    
    if(!body){
        body = '';
    }
    //수정을 위한 해당 게시글 조회
    res.render('boards/boardNew',{
        params : req.params,
        board : body,
        errors : err
    });
};


/*게시글 저장*/
exports.boardSave = (req,res)=>{
    console.log('body11 : ', req.body);
    console.log('body22dd : ', req.file);
    const params = req.body;

    if(req.file){
        params.fileNm = req.file.originalname;
        params.filePath = req.file.destination;
    }
    
    const board = new boardModel(params);
    board.save()
    .then((result) =>{
        res.redirect('/boards/'+ req.body.bbsGroup);
    })
    .catch((err)=>{
        console.log(err);
    });
}

/*게시글 상세*/
exports.boardDetail = (req,res)=>{
    boardModel.findOne({bbsId : req.params.bbsId},(err,board)=>{
        console.log(board);
        res.render('boards/boardDetail',{
            board : board, 
            moment : moment,
            params : req.params
        });
    });
};

/*게시글 편집*/
exports.boardEdit = (req,res)=>{
    boardModel.findOne({bbsId : req.params.bbsId},(err,board)=>{
        console.log('board : ',board);
        res.render('boards/boardEdit',{
            board : board, 
            moment : moment,
            params : req.params
        });
    });
};

/*게시글 수정*/
exports.boardUpdate = (req,res)=>{
    const board = req.body;
    console.log('params : ',req.params);
    boardModel.findOneAndUpdate(
        { bbsId : req.params.bbsId },
        {$set : 
            { bbsGroup : board.bbsGroup,
              bbsTitle : board.bbsTitle,
              bbsContent : board.bbsContent 
            }
        }
    ).exec()
    .then((updBoard) =>{
        res.redirect('/boards/'+ req.body.bbsGroup);
    })
    .catch((err)=>{
        console.log(err);
    });
};

/*게시글 삭제*/
exports.boardDelete = (req,res)=>{
    console.log('삭제 params : ', req.params);
    console.log('삭제 body : ', req.body);
    boardModel.findOneAndDelete(
        {bbsId : req.params.bbsId}
    )
    .then((updBoard) =>{
        res.json({redirect : '/boards/'+ req.params.bbsGroup});
    })
    .catch((err)=>{
        console.log(err);
    });
};