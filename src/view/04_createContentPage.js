const template = require('./00_template');

exports.createContentPage = function (uname) {

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