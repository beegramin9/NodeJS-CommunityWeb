const express = require('express');
const dm = require('./db/dbModule');
const ut = require('./util/util')
const userDM = require('./db/dbUser')
const aM = require('./view/alertMsg');

let uRouter = express.Router();
module.exports = uRouter;

/* 멀터 사용 */
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        // set a localstorage destination
        destination: __dirname + '/../public/upload/',
        filename: (req, file, callback) => {
            callback(null, new Date().toISOString().replace(/[-:\.A-Z]/g, '') + '_' + file.originalname)
        }

    })
})

uRouter.get('/register', (req, res) => {
    const view = require('./view/10_userRegister')
    let html = view.userRegister();
    res.send(html);

})

uRouter.post('/register', upload.single('photo'), (req, res) => {
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let photo = req.file ? `upload/${req.file.filename}` : 'upload/blank.png'

    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email, photo]
        userDM.newUser(params)
            .then(res.redirect('/login'))
        /* 여기에서 uname을 받아서 화면에 뿌리려면.. */
        /* 로그인 페이지로 돌아가야지 */
        /* 그래서 그 아이디로 로그인하면 */
        /* 화면에 뿌려주게할수있지 */

        /* 붓스트랩에서 alert랑 비슷한거 있었지? */
        /* "회원가입이 완료되었습니다!"  이렇게 띄우면 되지*/
    } else {
        let html = aM.alertMsg(`패스워드가 일치하지 않습니다.`, `/login`); /* 로그인은 됐는데 권한이 없으니 루트로 */
        res.send(html);
    }
})

uRouter.get('/getUsers/:page', (req, res) => {
    let currentPage = parseInt(req.params.page);
    req.session.currentPage = currentPage;
    let offset = (currentPage - 1) * 10;

    Promise.all([userDM.getAllUsersForAdmin(offset), userDM.getTotalNumUsers()])
        .then(([rows, result]) => {
            let NumContent = result.users_count;
            let totalPage = Math.ceil(NumContent / 10);
            let startPage;
            let endPage;
            if (currentPage < 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage >= totalPage - 2) {
                startPage = totalPage - 2;
                endPage = totalPage + 2;
            } else {
                startPage = parseInt(currentPage - 2);
                endPage = parseInt(currentPage + 2);
            }
            endPage = (endPage > totalPage) ? totalPage : endPage;

            let view = require('./view/07_getAllUsersForAdmin');
            let html = view.getAllUsersForAdmin(req.session.uname, rows, currentPage, startPage, endPage, totalPage, false);
            res.send(html);
        })
})

uRouter.get('/myPage', (req, res) => {
    userDM.myPageInfo(req.session.uname)
        .then(result => {
            const view = require('./view/08_myPage')
            let html = view.myPage(req.session.uname, result);
            res.send(html);
        })
})

uRouter.post('/myPage', upload.single('photo'), (req, res) => {
    let uname = req.body.uname
    let tel = req.body.tel
    let email = req.body.email
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let photo = req.file ? '/upload/' + req.file.filename : null;
    let params = [uname, tel, email]

    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let pwdParams = [pwdHash, uname];

        Promise.all([userDM.updatePwdUser(pwdParams), userDM.updateMyInfo(params, photo, req.session.uid)])
            .then(() => {
                let html = aM.alertMsgHistory(`회원정보가 성공적으로 변경되었습니다.`);
                res.send(html);
            })
    } else {
        let html = aM.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/myPage`); /* 로그인은 됐는데 권한이 없으니 루트로 */
        res.send(html);
    }
})