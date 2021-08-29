const template = require('./00_template');
// http://localhost:3000/content/bid/1001/uid/admin
exports.updateContentPage = function (uname, result) {
    return `
    ${template.header()}
    ${template.headNavBar(uname)}
    <div class="container">
        <h3 style="text-align:center;" class="pt-5">글 수정</h3>
        <div class="row">   
            <div class="col-3"></div>
            <div class="col-6">
                <form action="/content/update/bid/${result.bbs_bid}" method="post">
                    
                    <input type="hidden" name="bid" id="bid" value="${result.bbs_bid}">
                
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="title">글 제목</label></td>
                            <td><input class="form-control" type="text" name="title" id="title" value="${result.bbs_title}"></td>
                        </tr>
                        <tr>
                            <td><label for="content">글 내용</label></td>
                            <td><textarea rows="10" cols="30" class="form-control" name="content" id="content">${result.bbs_content}</textarea>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-outline-dark btn-sm">수정</button>
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