const template = require('./00_template');

exports.userRegister = function () {
    /* 바디 아래부터 */
    return `
    ${template.header()}
    ${template.headNavBar()} 
        <div class="container" style="padding-top:40px">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <form action="/user/register" method="post" enctype="multipart/form-data" class="needs-validation" novalidate>
                    <table class="table table-borderless">
                    <tr>
                        <div class="form-group">
                            <td><label for="uid">사용자 아이디</label></td>
                            <td><input class="form-control" type="text" name="uid" id="uid" placeholder="사용자 아이디를 입력하세요" required></td>
                            <div class="invalid-feedback">Please fill out this field.</div>
                        </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <td><label for="pwd">패스워드</label></td>
                            <td><input class="form-control" type="password" name="pwd" id="pwd"></td>
                        </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <td><label for="pwd2">패스워드 확인</label></td>
                            <td><input class="form-control" type="password" name="pwd2" id="pwd2"></td>
                        </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <td><label for="uname">닉네임</label></td>
                            <td><input class="form-control" type="text" name="uname" id="uname" placeholder="닉네임을 입력하세요"></td>
                        </div>
                        </tr>
                    <tr>
                        <div class="form-group">
                            <td><label for="tel">전화번호</label></td>
                            <td><input class="form-control" type="text" name="tel" id="tel" placeholder="전화번호를 입력하세요"></td>
                        </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <td><label for="email">이메일</label></td>
                            <td><input class="form-control" type="text" name="email" id="email" placeholder="이메일을 입력하세요" ></td>
                        </div>
                    </tr>
                    <tr>
                        <td><label for="photo">사진</label></td>
                        <td>
                            <div class="form-group custom-file mb-3">
                                <label class="custom-file-label">업로드할 사진 선택</label>
                                <input class="form-control custom-file-input" type="file" name="photo" id="photo">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <button type="submit" class="btn btn-outline-dark btn-sm">제출</button>
                            <button type="submit" class="btn btn-outline-danger btn-sm">취소</button>
                        </td>
                    </tr>

                    </table>
                </form>
                ${template.formValidation()}
            </div>
            <div class="col-1"></div>
        </div>
    </div>

   

    ${template.footNavBar()}
    ${template.photo()}
    
    ${template.footer()}
    `
}
