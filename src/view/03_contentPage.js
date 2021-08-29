const template = require('./00_template');

exports.contentPage = function (sessionUname, result, wholeComments) {
    let total = ``

    for (let comment of wholeComments)
        if (comment.reply_isMine === 0) {


            total += `
            <div class="col-8 ml-auto" style="padding-top:10px; padding-bottom:10px;">
                <div class="card text-dark">
                    <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                                <strong>${comment.reply_uname}</strong>
                                <span class="text-body">${comment.reply_regTime}</span> 

                        </div>
                        <div class="col-2 ml-auto">
                            <div>
                            <form action="/content/reply/delete" method="post">
                                <input type="hidden" name="uname" value="${comment.reply_uname}">
                                <input type="hidden" name="rid" id="rid" value="${comment.reply_rid}">
                                <input type="hidden" name="bid" id="bid" value="${result.bbs_bid}">
                                <button type="submit" class="btn btn-outline-danger btn-sm">
                                <i class="fas fa-trash-alt"></i>
                                </button>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div>${comment.reply_comments.indexOf('\n') > 0 ? comment.reply_comments.replace(/\n/g, '<br>') : comment.reply_comments}</div>
                </div>
            </div>
            </div>
            
            
            
                

                    `
        } else {
            total += `
            
            <div class="col-8 mr-auto" style="padding-top:10px; padding-bottom:10px;">
                <div class="card bg-light text-dark">
                    <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                            <div>
                            <strong>${comment.reply_uname}</strong>
                            <span class="text-body">${comment.reply_regTime}</span> 
                            </div>
                        </div>
                        <div class="col-2 ml-auto">
                            <div>
                            <form action="/content/reply/delete" method="post">
                                <input type="hidden" name="uname" value="${comment.reply_uname}">
                                <input type="hidden" name="rid" id="rid" value="${comment.reply_rid}">
                                <input type="hidden" name="bid" id="bid" value="${result.bbs_bid}">
                                <button type="submit" class="btn btn-outline-danger btn-sm">
                                <i class="fas fa-trash-alt"></i>
                                </button>
                            </form>
                            </div>
                        </div>
                    </div> 
                    <div>${comment.reply_comments.indexOf('\n') > 0 ? comment.reply_comments.replace(/\n/g, '<br>') : comment.reply_comments}</div>
                    </div>
                </div>
                </div>
               
                `
        }


    return `
    ${template.header()}
    ${template.contentNavBar(sessionUname)}
    <div class="container mt-5">
        <div class="row">
            <div class="col-10">
                <div>
                    <span class="text-body lead font-weight-bolder">${result.bbs_title}</span>
                </div>
                <div>
                    <p>
                    <span class="text-body font-weight-bold">글 번호</span>
                    <span class="text-secondary">${result.bbs_bid}</span>
                    <span class="text-body font-weight-bold">작성 시간:</span>
                    <span class="text-secondary">${result.bbs_modTime}</span>
                    </p>
                </div>
            </div>
            <div class="col-2 ml-auto">
                <div>
                    <span class="text-body font-weight-bold">${result.users_uname}</span>
                </div>
                <div>
                    <p>
                    <span class="text-body font-weight-bold">조회</span>
                    <span class="text-secondary">${result.bbs_viewCount}</span>
                    <span class="text-body font-weight-bold">리플</span>
                    <span class="text-secondary">${result.reply_NumComments}</span>
                    
                    </p>
                </div>
            </div>
        </div>
        <br>
        <hr>
        <div class="row">

            <div class="col-10 mr-auto">
                <div>
                    <span class="text-body lead">${result.bbs_content.indexOf('\n') > 0 ? result.bbs_content.replace(/\n/g, '<br>') : result.bbs_content}</span>
                </div>
            </div>
        <br>
        </div>
         <div class="row">
            <div class="col-2 ml-auto">
                <a class="btn btn-outline-dark btn-sm" href="/content/update/bid/${result.bbs_bid}">
                    <i class="fas fa-edit"></i>
                </a>
                <a class="btn btn-outline-danger btn-sm" href="/content/delete/bid/${result.bbs_bid}">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>
        </div>
        <br>
        <hr>
        <div class="row">
            ${total}
        </div>
        <br><br>
        <div class="row">
            <div class="col-11">
            <form action="/content/reply/create" method="post">
                <input type="hidden" name="bid" value="${result.bbs_bid}">
                <textarea class="form-control" name="comments" id="comments"></textarea>
        
            </div>


            <div class="col-1 mr-auto">
                <button type="submit" class="btn btn-outline-dark btn-sm">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            </form>
        </div>
        </div>
    ${template.footNavBar()}
    ${template.footer()}
    `
}