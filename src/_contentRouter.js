const express = require('express');
const { get } = require('jquery');
const dm = require('./db/dbModule');
const replyDM = require('./db/dbReply')
const contentDM = require('./db/dbContent')
const aM = require('./view/alertMsg')
let cRouter = express.Router();
module.exports = cRouter;

/* 세션 사용해서 회원가입 했을 때 그거를 req.session.에다가 담아내야함 */
/* 이건 회원가입 할 때나 그런거야 */
/* bid를 정의해줘야 함. 세션으로 */

cRouter.get('/bid/:bid', (req, res) => {
    let bid = req.params.bid;
    req.session.currentBid = bid
    console.log('왜 바뀜', req.session.uname);
    contentDM.getContent(bid, result => {
        contentDM.increaseViewCount(bid, () => {

            req.session.contentUname = result.users_uname
            replyDM.getWholeComment(bid, wholeComments => {

                const view = require('./view/03_contentPage')
                let html = view.contentPage(req.session.uname, result, wholeComments);
                res.send(html);
            })
        })
    })
})

cRouter.get('/create', (req, res) => {
    const view = require('./view/04_createContentPage')
    let html = view.createContentPage(req.session.uname);
    res.send(html);
})

cRouter.post('/create', (req, res) => {
    let title = req.body.title
    let content = req.body.content
    let params = [req.session.uid, title, content]
    console.log('포스트할때도 마티나?', req.session.uname);
    console.log('크리에', params);
    contentDM.createContent(params, () => {
        res.redirect('/page/1')
    })
})

/* 좋아 여기까지 잘 들어왔어! */
cRouter.get('/update/bid/:bid', (req, res) => {
    let bid = parseInt(req.params.bid)
    console.log('수정할때', req.session.uname);

    contentDM.contentToUpdate(bid, result => {
        if (req.session.uname === req.session.contentUname) {
            const view = require('./view/05_updateContentPage')
            let html = view.updateContentPage(req.session.uname, result);
            res.send(html);
        } else {
            let html = aM.alertMsg(`수정 권한이 없습니다.`, `/content/bid/${bid}`); /* 로그인은 됐는데 권한이 없으니 루트로 */
            res.send(html);
        }
    })

})

cRouter.post('/update/bid/:bid', (req, res) => {
    let title = req.body.title
    let content = req.body.content
    let bid = parseInt(req.body.bid)
    let params = [title, content, bid]

    let uid = req.body.uid
    /* 여기서 result.users_name을 가져와야 한다. */

    contentDM.updateContent(params, () => {
        res.redirect(`/content/bid/${bid}`)
    })
})

cRouter.get('/delete/bid/:bid', (req, res) => {
    /* 삭제하기! */

    // console.log(req.session.uname);
    // console.log(req.session.contentUname)
    let bid = parseInt(req.params.bid)
    let uid = req.params.uid
    console.log('삭제할때 uid 넘어오나', uid);

    if (req.session.uname === req.session.contentUname) {
        const view = require('./view/06_deleteContentPage')
        let html = view.deleteContentPage(req.session.uname, bid);
        res.send(html);
    } else {
        let html = aM.alertMsg(`삭제 권한이 없습니다.`, `/content/bid/${bid}`); /* 로그인은 됐는데 권한이 없으니 루트로 */
        res.send(html);
    }
})

cRouter.post('/delete/bid/:bid', (req, res) => {
    /* 삭제하기! */
    let bid = parseInt(req.body.bid)
    contentDM.deleteContent(bid, () => {
        res.redirect(`/page/${req.session.currentPage}`)
    })
})
