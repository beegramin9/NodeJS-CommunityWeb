const express = require('express');
const { get } = require('jquery');
const dm = require('./db/dbModule');
const replyDM = require('./db/dbReply')
const aM = require('./view/alertMsg')
const ut = require('./util/util')
let rRouter = express.Router();
module.exports = rRouter;


rRouter.post('/create', ut.isLoggedIn, (req, res) => {
    /* 화면은 띄우지 않고 데이터 받을 것만 받은 이후에 */
    /* res.resdirect('/bid/${bid}')로 가면 됨 */
    /* db reply에 집어 넣는거랑, 댓글 개수 올라갈 때? 두개?? */
    let bid = req.body.bid;

    // console.log(req.session.replyUname);
    /* 여기에서 폼으로 받아와야지 */
    let uid = req.session.uid

    let comments = req.body.comments;
    let isMine = '';
    if (req.session.uname === req.session.contentUname) {
        isMine = 0
    } else {
        isMine = 1
    }
    let params = [bid, req.session.uid, comments, isMine]
    replyDM.increaseReplyCount(bid, () => {
        replyDM.createMyComment(params, () => {

            res.redirect(`/content/bid/${bid}`)
        })
    })
})
//
rRouter.post('/delete', (req, res) => {
    // 여기서도 권한 줘야함
    console.log('접속자:', req.session.uname);
    // console.log('글주인:', req.session.contentUname);

    let replyUsername = req.body.uname
    console.log('리플주인:', replyUsername);


    /* 댓글의 사용자를 가져와야함 */

    /* replyname이 필요하다 */
    let rid = parseInt(req.body.rid);
    let bid = parseInt(req.body.bid);
    // console.log('안나오냐', rid, bid);
    let uid = req.session.uid
    if (req.session.uname === replyUsername) {
        replyDM.decreaseReplyCount(bid, () => {
            replyDM.deleteMyComment(rid, () => {
                res.redirect(`/content/bid/${bid}`)
            })
        })
    } else {
        let html = aM.alertMsgHistory(`삭제 권한이 없습니다.`); /* 로그인은 됐는데 권한이 없으니 루트로 */
        res.send(html);
    }
})


