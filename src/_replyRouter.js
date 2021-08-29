const express = require('express');
const { get } = require('jquery');
const dm = require('./db/dbModule');
const replyDM = require('./db/dbReply')
const aM = require('./view/alertMsg')
const ut = require('./util/util')
let rRouter = express.Router();
module.exports = rRouter;


rRouter.post('/create', ut.isLoggedIn, (req, res) => {
    let bid = req.body.bid;
    let comments = req.body.comments;
    let isMine = '';
    if (req.session.uname === req.session.contentUname) {
        isMine = 0
    } else {
        isMine = 1
    }
    let params = [bid, req.session.uid, comments, isMine]

    Promise.all([replyDM.increaseReplyCount(bid), replyDM.createMyComment(params)])
        .then(res.redirect(`/content/bid/${bid}`))
})

rRouter.post('/delete', (req, res) => {
    // 여기서도 권한 줘야함
    // console.log('접속자:', req.session.uname);
    // console.log('글주인:', req.session.contentUname);
    // console.log('리플주인:', replyUsername);
    let replyUsername = req.body.uname
    let rid = parseInt(req.body.rid);
    let bid = parseInt(req.body.bid);
    if (req.session.uname === replyUsername) {
        Promise.all([replyDM.decreaseReplyCount(bid), replyDM.deleteMyComment(rid)])
            .then(res.redirect(`/content/bid/${bid}`))
    } else {
        let html = aM.alertMsgHistory(`삭제 권한이 없습니다.`);
        res.send(html);
    }
})


