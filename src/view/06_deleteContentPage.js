const template = require('./00_template');

exports.deleteContentPage = function (uname, bid) {

    return `
    ${template.header()}
    ${template.headNavBar(uname)}
        <div class="container">
        <h3 style="text-align:center;" class="pt-5">글 삭제</h3>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form action="/content/delete/bid/:bid" method="post">
                    
                    <input type="hidden" name="bid" id="bid" value="${bid}">
                
                    <table class="table table-borderless">
                        <tr>
                            <td style="text-align:center">${bid}번 글을 삭제하시겠습니까?</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-outline-dark btn-sm">삭제</button>
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