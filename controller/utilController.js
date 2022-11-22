const multer = require('multer');
const {UPLOAD_PATH} = process.env;

/******  유효성 체크 ******/
exports.validate = (req,res,next) =>{
    //form 데이터 유효성 체크
    req.check("bbsTitle","제목을 입력해주시기 바랍니다.").notEmpty();
    req.check("bbsContent","내용을 입력해주시기 바랍니다.").notEmpty();
    //req.check("bbsGroup","나라를 선택해주시기 바랍니다.").notEmpty();    
    
    req.getValidationResult()
    .then(errors => {
        if (!errors.isEmpty()) {
            req.flash("errors", errors.mapped());
            req.flash("body", req.body);
            return res.redirect('back');
        } else {
            next();
        }
    });
};

/******  파일 업로드 ******/
const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, UPLOAD_PATH);      //경로설정
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname); //파일명변경
    }
});
const upload = multer({ storage : storage});
exports.fileUpload = upload.single('atchFile');


/******  파일 다운로드 ******/
exports.fileDownload = (req,res,next) =>{
    console.log("query : ",req.params);
    console.log("query : ",__dirname+"/uploads/"+req.params.id);
    res.download("uploads/"+req.params.id);
};