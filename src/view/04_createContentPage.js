const template = require('./00_template');

exports.createContentPage = function (uname) {
    console.log('왜 여기 마티나야?', uname);
    /* 여기에 새 게시물 아이디도 필요함. 이따가 post할 때 params로 넣어주려면 */
    /* 그러면 이제 어떻게 bbs_bid를 1 더하냐... */
    /* sql문에 쿼리를 두개, 어쩌면 3개까지도 써야할지도 */


    // let tableRow = '';
    // /* 한 줄만 받을 때는 반복문 쓰면 안 되나...? */
    // /* 상관없이 됐던 것 같은데... */
    // tableRow += `
    //                 <tr>
    //                     <td style="padding-right:20px;">${rows.bbs_title}</td>
    //                     <td style="padding-right:20px;">${rows.bbs_bid}</td>
    //                     <td style="padding-right:20px;">${rows.bbs_content}</td>
    //                     <td style="padding-right:20px;">${rows.bbs_modTime}</td>
    //                     <td style="padding-right:20px;">${rows.users_uid}</td>
    //                     <td style="padding-right:20px;">${rows.bbs_viewCount}</td>
    //                     <td style="padding-right:20px;">${rows.reply_comments}</td>
    //                     <td style="padding-right:20px;">${rows.reply_NumComments}</td>
    //                     <td style="padding-right:20px;">${rows.reply_isMine}</td>
    //                 </tr>

    //     `
    // console.log(row.bbs_bid);

    /* form을 hidder으로 해서 uname을 받아야겠네... */
    // <div class="container">
    // <h3 style="text-align:center;" class="pt-5">글 수정</h3>
    // <div class="row">   
    //     <div class="col-3"></div>
    //     <div class="col-6">
    return `
    ${template.header()}
    ${template.headNavBar(uname)}
     
        <div class="container">
        <h3 style="text-align:center;" class="pt-5">글 쓰기</h3>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form action="/content/create" method="post">
                    
                    <input type="hidden" name="uname" id="uname" value="${uname}">
                
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="title">글 제목</label></td>
                            <td><input class="form-control" type="text" name="title" id="title"></td>
                        </tr>
                        <tr>
                            <td><label for="content">글 내용</label></td>
                            <td><textarea rows="10" cols="30" class="form-control" type="text" name="content" id="content"></textarea></td>
                          
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-outline-dark btn-sm">제출</button>
                                <button type="dismiss" class="btn btn-outline-danger btn-sm">취소</button>
                            </td>
                        </tr>

                    </table>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>



    ${template.footNavBar()}
    ${template.footer()}
    `
}