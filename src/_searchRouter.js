const express = require('express');
const { get } = require('jquery');
const dm = require('./db/dbSearch');
const replyDM = require('./db/dbReply')
const aM = require('./view/alertMsg')
let sRouter = express.Router();
module.exports = sRouter;

sRouter.post('/', (req, res) => {
    let searchKeyword = req.body.search
    /* 일회성으로 갈 수 있게... */
    /* 물음표가 2개가 있으니까 어레이로 묶어서 넣어주면 됨 */
    /* db에서 %?%로 하면 오류가 난다.*/
    dm.searchKeywordGetLists(`%${searchKeyword}%`)
        .then(rows => {
            /* 페이지를 두개로 나눠야 돼...? */
            /* 삼항연산자 아니면 함수 파라미터 줄 떄 파이썬처럼 디폴트값이 있나 */
            if (rows.length === 0) {
                let html = aM.alertMsgHistory(`해당 검색어로 나온 결과가 없습니다. 이전 페이지로 돌아가시겠습니까? `);
                res.send(html)
            } else if (!searchKeyword) {
                let html = aM.alertMsgHistory(`검색어를 입력하세요. `);
                res.send(html)
            } else {
                res.redirect(`/search/${searchKeyword}/1`)
                // const view = require('./view/02_mainPage');
                // let html = view.mainPage(req.session.uname, rows);
                // res.send(html);
                //  currentPage, startPage, endPage, totalPage
            }
        })
})

sRouter.get('/:keyword/:page', (req, res) => {
    let searchKeyword = req.params.keyword
    let currentPage = parseInt(req.params.page)
    let offset = (currentPage - 1) * 10;
    let searchParams = [`%${searchKeyword}%`, offset]

    Promise.all([dm.getTotalNumSearch(`%${searchKeyword}%`), dm.searchPaginationLists(searchParams)])
        .then(([result, rows]) => {
            let NumContent = result.search_count;
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

            let view = require('./view/09_searchResult');
            let html = view.searchResult(req.session.uname, searchKeyword, rows, currentPage, startPage, endPage, totalPage, false);
            res.send(html);
        })
})


