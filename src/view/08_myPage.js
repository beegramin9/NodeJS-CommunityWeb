const template = require('./00_template');

exports.myPage = function (uname, result) {
    console.log(result.photo);
    return `
    ${template.header()}
    ${template.headNavBar(uname)} 
        <div class="container" style="padding-top:40px">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <form action="/user/myPage" method="post" enctype="multipart/form-data">
                    <table class="table table-borderless">
                        <tr>
                            <div class="form-group">
                                <td><label for="uid">사용자 아이디</label></td>
                                <td><input class="form-control" type="text" name="uid" id="uid" value="${result.uid}"></td>
                                
                            </div>
                        </tr>
                        <tr>
                            <div class="form-group">
                                <td><label for="pwd">패스워드 변경</label></td>
                                <td><input class="form-control" type="password" name="pwd" id="pwd"></td>
                                <td rowspan="5"><img src="${result.photo}" class="img-thumbnail" style="width:300px ; height:380px">
                            </div>
                        </tr>
                        <tr>
                            <div class="form-group">
                                <td><label for="pwd2">패스워드 변경 확인</label></td>
                                <td><input class="form-control" type="password" name="pwd2" id="pwd2"></td>
                                
                            </div>
                        </tr>
                        <tr>
                            <div class="form-group">
                                <td>닉네임</td>
                                <td><input class="form-control" type="text" name="uname" id="uname" value="${result.uname}"></td>
                            </div>
                            </tr>
                        <tr>
                            <div class="form-group">
                                <td>전화번호</td>
                                <td><input class="form-control" type="text" name="tel" id="tel" value="${result.tel}"></td>
                            </div>
                        </tr>
                        <tr>
                            <div class="form-group">
                                <td>이메일</td>
                                <td><input class="form-control" type="text" name="email" id="email" value="${result.email}"></td>
                            </div>
                        </tr>
                        <tr>
                            <td><label for="photo">사진</label></td>
                            <td>
                                <div class="form-group custom-file mb-3">
                                    <label class="custom-file-label" for="photo">새로운 사진 선택</label>
                                    <input class="form-control custom-file-input" type="file" name="photo" id="photo">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-outline-dark btn-sm">수정</button>
                                <button type="submit" class="btn btn-outline-danger btn-sm">취소</button>
                            </td>
                        </tr>

                    </table>
                </form>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
    ${template.footNavBar()}
    ${template.photo()}
    ${template.footer()}
    `
}