const template = require('./00_template');
const ut = require('../util/util')
/* ${writeAlert.writeAlert('로그인이 필요합니다', '/')}
    이렇게 쓰면 메인페이지가 안뜨고 그냥 바로 경고창이 떠버림
    어케하지?
    
 */
exports.mainPage = function (uname, rows, currentPage, startPage, endPage, totalPage) {

    // let today = new Date();
    // let whatToday = today.getTime()
    // console.log(new Date(whatToday))
    // 시간 맞추는 건 나중에
    // row.bbs_modTime

    let tableRow = '';
    for (let row of rows) {
        tableRow += `
                    <tr>
                        <td class="text-secondary" style="padding-right:20px;">${row.bbs_bid}</td>
                        <td style="padding-right:20px;">
                            <a class="text-body"href="/content/bid/${row.bbs_bid}">
                            ${row.bbs_title}
                            <span class="text-danger">[${row.bbs_replyCount}]</span>
                        </td>
                        <td class="text-body" style="padding-right:20px;">${row.users_uid}</td>
                        <td class="text-secondary" style="padding-right:20px;">${row.bbs_modTime}</td>
                        <td class="text-secondary" style="padding-right:20px;">
                        <i class="fas fa-eye"></i>
                        ${row.bbs_viewCount}</td>
                    </tr>
        
        `
    }
    /* 로그인 안 된 상태에서 누르면 로그인페이지로 갈 수 있도록 */
    /* 경고창 띄우면서; */
    // ${template.afterLogin(uname)}

    // if (uname !=='일반 사용자')
    /* 로그인이 되면 ...로그인 안 나오게 해야 하는데... */

    /* 이거 밑에 어떻게 해야함 */
    /*  <p>${uname}님 환영합니다. &nbsp;&nbsp; <a href="/logout">로그아웃</a></p>
            ${uname === '일반 사용자' ? ' <p><a href="/login">로그인</a></p>' : ''} */

    /* 글 쓰기 버튼 누를 수 있도록... */

    // let NumContent = result.bbs_count;
    // console.log(NumContent);
    // let totalPage = Math.ceil(NumContent / 10);
    // let startPage = Math.floor((currentPage - 1) / 10) * 10 + 1; /* 이거 왜 이렇게 함? */
    // let endPage = Math.ceil(page / 10) * 10;
    // endPage = (endPage > totalPage) ? totalPage : endPage;


    {/* <li class="page-item active" aria-current="page">
<span class="page-link">
${page}<span class="sr-only">(current)</span>
</span>
</li> */}



    let pagination = ut.viewPage(currentPage, startPage, endPage, totalPage)


    if (!uname)
        return `
        ${template.header()}
        ${template.headNavBar(uname)}
        <div class="container mt-5">
            <hr>
            <table class="table table-hover">
                <thead class="thead-light">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                    ${tableRow}
                </table>
                </div>
            </div>
                
            
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                    ${pagination}
                </div>
                <div class="col-3">
                    <p><a href="/cantCreateWithoutLogin">
                    <button class="btn btn-outline-dark text-white disabled">
                        <span class="text-body">
                            <i class="fas fa-edit"></i>
                        </span>
                    </button>
                    </a></p>
                </div>
            </div>
        </div>

        ${template.footNavBar()}
        ${template.footer()}
    `
    else
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
                                <th>번호</th>
                                <th>제목</th>
                                <th>글쓴이</th>
                                <th>날짜</th>
                                <th>조회수</th>
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
                <div class="col-2">
                    <p><a href="/content/create">
                    <button class="btn btn-outline-dark text-white disabled">
                        <span class="text-body">
                            <i class="fas fa-edit"></i>
                        </span>
                    </button>
                    </a></p>
                </div>
            </div>
        </div>

        
        ${template.footNavBar()}
        ${template.footer()}
        `
}