const template = require('./00_template');
const ut = require('../util/util')


exports.getAllUsersForAdmin = function (uname, rows, currentPage, startPage, endPage, totalPage) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `
                    <tr>
                        <td class="text-body" style="padding-right:20px;">${row.uid}</td>
                        <td class="text-body" style="padding-right:20px;">${row.uname}</td>
                        <td class="text-body" style="padding-right:20px;">${row.tel}</td>
                        <td class="text-body" style="padding-right:20px;">${row.email}</td>
                        <td class="text-body" style="padding-right:20px;">${row.regDate}</td>
                    </tr>
        
        `
    }

    // uid, uname, tel, email, regDate
    let pagination = ut.viewAdminUsersPage(currentPage, startPage, endPage, totalPage)





    return `
    ${template.header()}
    ${template.headNavBar(uname)}
    <div class="container mt-5">
            <hr>
            <div class="row">
                <div class="col-12">
                    <table class="table table-hover">
                        <thead class="thead-light">
                            <tr>
                                <th>아이디</th>
                                <th>닉네임</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                                <th>가입일/시간</th>
                            </tr>
                        </thead>
                        ${tableRow}
                    </table>
                </div>
            </div>

            <div class="row">
                <div class="col-10">
                    ${pagination}
                </div>
            </div>
        </div>

    ${template.footNavBar()}
    ${template.footer()}
    `
}